// netlify/functions/api.js
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Debug route to check environment variables
app.get('/api/debug', (req, res) => {
    // Don't expose actual password
    const hasEnvVars = !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS;
    res.status(200).json({ 
        hasEnvVars,
        emailUser: process.env.EMAIL_USER ? 'Set' : 'Not set',
        emailPass: process.env.EMAIL_PASS ? 'Set' : 'Not set',
        recipient: process.env.RECIPIENT_EMAIL || 'Using default',
        status: 'OK' 
    });
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
    console.log('Received email request', {
        fields: Object.keys(req.body)
    });
    
    try {
        const { name, email, company, message, subject } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required fields.' 
            });
        }
        
        // Ensure email environment variables are set
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email credentials missing in environment variables');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error. Email credentials not properly configured.'
            });
        }
        
        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Define recipient
        const recipient = process.env.RECIPIENT_EMAIL || 'KaynenBPellegrino@sybertnetics.com';
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipient,
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
        
        console.log('Attempting to send email to:', recipient);
        
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        
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
        console.log('Auto-responder email sent to:', email);
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email: ' + error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Handle health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Handle all remaining routes
app.use('/*', (req, res) => {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Export handler function for serverless deployment
module.exports.handler = serverless(app);
