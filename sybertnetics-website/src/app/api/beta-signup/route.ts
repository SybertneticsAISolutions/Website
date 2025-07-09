import { NextRequest, NextResponse } from 'next/server';
import { addBetaSignupAdmin } from '@/utils/firebase-admin';

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

    const result = await addBetaSignupAdmin({
      email,
      name: name || '',
      discord: discord || '',
      experience: experience || '',
      interests: interests || []
    });

    if (result.success) {
      return NextResponse.json(
        { message: 'Successfully joined the beta waitlist!' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to join waitlist' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Beta signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 