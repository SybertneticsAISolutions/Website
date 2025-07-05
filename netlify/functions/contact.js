const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Use the same standardized environment variables as the careers form
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RECIPIENT_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !RECIPIENT_EMAIL) {
    console.error('Mail server not configured. Check SMTP and RECIPIENT_EMAIL environment variables.');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server is not configured to send emails.' }) };
  }

  try {
    const { name, email, company, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name, email, and message are required fields.' }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: SMTP_PORT === '465', // Common practice: port 465 is SSL, others are STARTTLS
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
    
    // Email to the company
    const supportEmailOptions = {
      from: `"Website Contact Form" <${SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Email to the user for confirmation
    const userEmailOptions = {
      from: `"Sybertnetics AI Solutions" <${SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <h2>Thank you for your message, ${name}!</h2>
        <p>We've received it and will get back to you as soon as possible.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
      `,
    };
    
    // Send both emails
    await Promise.all([
      transporter.sendMail(supportEmailOptions),
      transporter.sendMail(userEmailOptions)
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An internal error occurred. Could not send email.' }),
    };
  }
}; 