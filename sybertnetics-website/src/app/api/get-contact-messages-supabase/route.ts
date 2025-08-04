import { NextRequest, NextResponse } from 'next/server';
import { contactOperations } from '@/utils/supabase';

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // For now, we'll allow all requests, but you should add proper auth
    
    const contacts = await contactOperations.getContacts();

    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 