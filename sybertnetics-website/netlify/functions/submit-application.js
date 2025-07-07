const nodemailer = require('nodemailer');
const busboy = require('busboy');

// Helper to parse multipart form data
const parseMultipartForm = (event) => {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: event.headers });
    const fields = {};
    const files = {};

    bb.on('file', (name, file, info) => {
      const { filename, mimeType } = info;
      const chunks = [];
      file.on('data', (chunk) => chunks.push(chunk));
      file.on('end', () => {
        files[name] = {
          filename,
          content: Buffer.concat(chunks),
          mimeType,
        };
      });
    });

    bb.on('field', (name, val) => {
      fields[name] = val;
    });

    bb.on('close', () => resolve({ fields, files }));
    bb.on('error', err => reject(err));
    bb.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    bb.end();
  });
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // Check for required environment variables for email
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CAREERS_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CAREERS_EMAIL) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Mail server not configured.' }) };
  }
  
  try {
    const { fields, files } = await parseMultipartForm(event);
    const { jobTitle, posterEmail, fullName, email } = fields;

    // Basic validation
    if (!jobTitle || !posterEmail || !fullName || !email || !files.resume) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields.' }) };
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    
    // Prepare attachments
    const attachments = [
        { filename: files.resume.filename, content: files.resume.content, contentType: files.resume.mimeType }
    ];
    if (files.coverLetter) {
        attachments.push({ filename: 'cover-letter.txt', content: fields.coverLetter });
    }

    // Build email content
    let emailBody = `New application for: ${jobTitle}\n\n`;
    for(const [key, value] of Object.entries(fields)) {
        emailBody += `${key}: ${value}\n`;
    }

    const mailOptions = {
      from: `"Sybertnetics Careers" <${SMTP_USER}>`,
      to: [posterEmail, CAREERS_EMAIL],
      subject: `New Application: ${jobTitle} from ${fullName}`,
      text: emailBody,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Application submitted successfully.' }),
    };
  } catch (error) {
    console.error('Submission Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while submitting the application.' }),
    };
  }
}; 