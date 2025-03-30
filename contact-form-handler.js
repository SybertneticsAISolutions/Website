// Required packages
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Environment variables (store these in a .env file)
const PORT = process.env.PORT || 3000;
const EMAIL_USER = process.env.EMAIL_USER; // Your email
const EMAIL_PASS = process.env.EMAIL_PASS; // Your email password or app password
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'KaynenBPellegrino@Sybertnetics.com';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to another service
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, company, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide name, email, and message'
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

// Optional: Auto-responder endpoint
app.post('/auto-respond', async (req, res) => {
  const { name, email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required for auto-response'
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});