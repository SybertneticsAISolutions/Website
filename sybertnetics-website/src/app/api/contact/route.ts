import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message || !subject) {
      return NextResponse.json(
        { success: false, message: 'Name, email, subject, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Check for environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.RECIPIENT_EMAIL) {
      console.error('Missing email configuration environment variables');
      return NextResponse.json(
        { success: false, message: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email to you (the recipient)
    const mailOptions = {
      from: `"Sybertnetics Website" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form: ${subject}`,
      text: `
New contact form submission from Sybertnetics website:

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Sybertnetics website contact form.
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
    New Contact Form Submission
  </h2>
  
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
    <p><strong>Subject:</strong> ${subject}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h3 style="color: #374151;">Message:</h3>
    <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
      ${message.replace(/\n/g, '<br>')}
    </div>
  </div>
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
  <p style="color: #6b7280; font-size: 14px;">
    This message was sent from the Sybertnetics website contact form.
  </p>
</div>
      `
    };

    // Auto-responder to the sender
    const autoResponderOptions = {
      from: `"Sybertnetics AI Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Sybertnetics',
      text: `
Dear ${name},

Thank you for contacting Sybertnetics AI Solutions. We have received your message regarding "${subject}" and will get back to you as soon as possible.

We typically respond to inquiries within 24 hours during business days.

Best regards,
The Sybertnetics Team

---
This is an automated response. Please do not reply to this email.
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #059669, #2563eb); border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0;">Sybertnetics AI Solutions</h1>
  </div>
  
  <div style="padding: 30px; background-color: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #374151; margin-top: 0;">Thank you for contacting us!</h2>
    
    <p>Dear ${name},</p>
    
    <p>Thank you for contacting Sybertnetics AI Solutions. We have received your message regarding <strong>"${subject}"</strong> and will get back to you as soon as possible.</p>
    
    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #166534;">
        <strong>⏱️ Response Time:</strong> We typically respond to inquiries within 24 hours during business days.
      </p>
    </div>
    
    <p>In the meantime, feel free to explore our website to learn more about our AI solutions and capabilities.</p>
    
    <p>Best regards,<br>
    <strong>The Sybertnetics Team</strong></p>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
    <p style="color: #6b7280; font-size: 12px; text-align: center;">
      This is an automated response. Please do not reply to this email.<br>
      For urgent matters, please contact us directly at support@sybertnetics.com
    </p>
  </div>
</div>
      `
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    console.log('Contact form email sent successfully to:', process.env.RECIPIENT_EMAIL);

    try {
      await transporter.sendMail(autoResponderOptions);
      console.log('Auto-responder sent successfully to:', email);
    } catch (autoResponderError) {
      console.error('Error sending auto-responder:', autoResponderError);
      // Don't fail the whole request if auto-responder fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Error in contact form API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
} 