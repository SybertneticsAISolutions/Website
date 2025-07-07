import { NextRequest, NextResponse } from 'next/server';
import { getBetaSignups } from '@/utils/firebase';

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

    const result = await getBetaSignups();

    if (result.success) {
      return NextResponse.json(
        { signups: result.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch signups' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Get beta signups error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 