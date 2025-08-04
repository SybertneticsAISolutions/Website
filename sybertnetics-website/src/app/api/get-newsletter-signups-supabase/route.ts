import { NextRequest, NextResponse } from 'next/server';
import { newsletterOperations } from '@/utils/supabase';

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // For now, we'll allow all requests, but you should add proper auth
    
    const signups = await newsletterOperations.getNewsletterSignups();

    return NextResponse.json({
      success: true,
      data: signups,
      count: signups.length
    });

  } catch (error) {
    console.error('Get newsletter signups error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 