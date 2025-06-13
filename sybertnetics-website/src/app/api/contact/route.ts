import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured (using your existing variable names)
    const smtpConfigured = process.env.SMTP_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;

    if (smtpConfigured) {
      // Create transporter using your existing environment variables
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email to the user (thank you email)
      const userEmailOptions = {
        from: `"Sybertnetics AI Solutions" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting Sybertnetics AI Solutions',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">Thank you for reaching out, ${name}!</h2>
            <p>We've received your message and appreciate your interest in Sybertnetics AI Solutions.</p>
            <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Your Message:</h3>
              <p style="color: #6b7280; margin: 0;">${message}</p>
            </div>
            <p>If you have any urgent questions, feel free to reach out directly at <a href="mailto:${process.env.RECIPIENT_EMAIL}">${process.env.RECIPIENT_EMAIL}</a>.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #9ca3af; font-size: 14px;">
              Best regards,<br>
              The Sybertnetics AI Solutions Team
            </p>
          </div>
        `,
      };

      // Email to support team (copy of the message)
      const supportEmailOptions = {
        from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Contact Form Submission</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              Submitted at: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(userEmailOptions),
        transporter.sendMail(supportEmailOptions),
      ]);

      return NextResponse.json(
        { message: 'Emails sent successfully' },
        { status: 200 }
      );
    } else {
      // SMTP not configured - log the message for development/testing
      console.log('=== CONTACT FORM SUBMISSION ===');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Company:', company || 'Not provided');
      console.log('Message:', message);
      console.log('Submitted at:', new Date().toLocaleString());
      console.log('===============================');

      // Return success even without email sending for development
      return NextResponse.json(
        { message: 'Form submitted successfully (SMTP not configured - check console logs)' },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 }
    );
  }
} 