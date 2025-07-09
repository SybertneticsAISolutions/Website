import { NextRequest, NextResponse } from 'next/server';
import { addContactMessageAdmin } from '@/utils/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const result = await addContactMessageAdmin({
      name,
      email,
      company: company || '',
      subject,
      message
    });

    if (result.success) {
      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to send message' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 