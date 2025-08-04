import { NextRequest, NextResponse } from 'next/server';
import { betaOperations } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, discord, experience, interests } = body;

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
    const result = await betaOperations.submitBetaSignup({
      email,
      name: name || '',
      company: '', // Not in our schema, but we can add it later if needed
      use_case: `${experience ? `Experience: ${experience}` : ''}${interests ? `\nInterests: ${interests.join(', ')}` : ''}${discord ? `\nDiscord: ${discord}` : ''}`
    });

    return NextResponse.json(
      { message: 'Beta signup successful!', id: result.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Beta signup error:', error);
    
    // Check if it's a duplicate email error
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        { error: 'This email is already registered for beta access' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 