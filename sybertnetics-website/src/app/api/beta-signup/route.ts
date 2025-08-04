import { NextRequest, NextResponse } from 'next/server';
import { betaOperations } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, discord, experience, interests } = body;

    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const result = await betaOperations.submitBetaSignup({
      email,
      name: name || '',
      company: '', // Not in our schema, but we can add it later if needed
      use_case: `${experience ? `Experience: ${experience}` : ''}${interests ? `\nInterests: ${interests.join(', ')}` : ''}${discord ? `\nDiscord: ${discord}` : ''}`
    });

    return NextResponse.json(
      { message: 'Successfully joined the beta waitlist!', id: result.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Beta signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 