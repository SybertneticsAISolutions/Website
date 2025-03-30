const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Initialize express app
const app = express();
const router = express.Router();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Environment variables (set these in Netlify dashboard)
const EMAIL_USER = process.env.EMAIL_USER; 
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'KaynenBPellegrino@Sybertnetics.com';

// Configure email transporter
let transporter = null;
if (EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to another service
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
}

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'API is working!'
  });
});

// Contact form endpoint
router.post('/send-email', async (req, res) => {
  const { name, email, company, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide name, email, and message'
    });
  }
  
  // Check if email is configured
  if (!transporter) {
    console.log('Email not configured. Would have sent:', { name, email, company, message });
    return res.status(200).json({
      success: true,
      message: 'Test mode: Email configured. Message received but not sent.'
    });
  }
  
  // Create email
  const mailOptions = {
    from: EMAIL_USER,
    to: RECIPIENT_EMAIL,
    subject: `Sybertnetics Contact Form: ${name} from ${company || 'Not specified'}`,
    text: `
      Name: ${name}
      Email: ${email}
      Company: ${company || 'Not specified'}
      
      Message:
      ${message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not specified'}</p>
      <h4>Message:</h4>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  };
  
  try {
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Success response
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Error response
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again later.'
    });
  }
});

// Auto-responder endpoint
router.post('/auto-respond', async (req, res) => {
  const { name, email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required for auto-response'
    });
  }
  
  if (!transporter) {
    return res.status(200).json({
      success: true,
      message: 'Test mode: Auto-response would be sent.'
    });
  }
  
  const autoReplyOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting Sybertnetics',
    text: `
      Hello ${name},
      
      Thank you for contacting Sybertnetics. We have received your message and will get back to you as soon as possible.
      
      Best regards,
      Sybertnetics Team
    `,
    html: `
      <h3>Hello ${name},</h3>
      <p>Thank you for contacting Sybertnetics. We have received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br>Sybertnetics Team</p>
    `
  };
  
  try {
    await transporter.sendMail(autoReplyOptions);
    res.status(200).json({
      success: true,
      message: 'Auto-response sent successfully'
    });
  } catch (error) {
    console.error('Error sending auto-response:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending auto-response'
    });
  }
});

// Use the router with a base URL prefix
app.use('/api', router);

// Export the serverless function
module.exports.handler = serverless(app);