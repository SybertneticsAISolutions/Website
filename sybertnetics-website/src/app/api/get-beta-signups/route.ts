import { NextRequest, NextResponse } from 'next/server';
import { betaOperations } from '@/utils/supabase';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated (you might want to add more robust auth checking)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const signups = await betaOperations.getBetaSignups();

    return NextResponse.json({
      success: true,
      data: { signups },
      count: signups.length
    });
  } catch (error) {
    console.error('Get beta signups error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 