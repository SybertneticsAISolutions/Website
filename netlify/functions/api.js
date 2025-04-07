const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, company, message, subject } = req.body;
        
        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
            subject: subject || `New message from ${name}`,
            text: `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}
            `,
            html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        // Auto-responder to the sender
        const autoResponderOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting Sybertnetics',
            text: `
Dear ${name},

Thank you for contacting Sybertnetics. We have received your message and will get back to you shortly.

Best regards,
The Sybertnetics Team
            `,
            html: `
<h2>Thank you for contacting Sybertnetics</h2>
<p>Dear ${name},</p>
<p>Thank you for contacting Sybertnetics. We have received your message and will get back to you shortly.</p>
<p>Best regards,<br>The Sybertnetics Team</p>
            `
        };
        
        await transporter.sendMail(autoResponderOptions);
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Handle other API routes here if needed

// Handle all remaining routes
app.use('/*', (req, res) => {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Export handler function for serverless deployment
module.exports.handler = serverless(app);
