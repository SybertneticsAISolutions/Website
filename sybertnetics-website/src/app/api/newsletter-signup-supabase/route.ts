import { NextRequest, NextResponse } from 'next/server';
import { newsletterOperations } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Store in Supabase
    const result = await newsletterOperations.submitNewsletterSignup(email);

    return NextResponse.json(
      { message: 'Newsletter signup successful!', id: result.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    // Check if it's a duplicate email error
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 