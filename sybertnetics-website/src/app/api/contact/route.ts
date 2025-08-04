import { NextRequest, NextResponse } from 'next/server';
import { contactOperations } from '@/utils/supabase';

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

    const result = await contactOperations.submitContact({
      name,
      email,
      company: company || '',
      message: `Subject: ${subject}\n\n${message}` // Combine subject and message
    });

    return NextResponse.json(
      { message: 'Message sent successfully!', id: result.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 