import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'

export async function GET() {
  try {
    // Test the connection by trying to query the contact_messages table
    const { data, error } = await supabase
      .from('contact_messages')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return NextResponse.json(
        { error: 'Supabase connection failed', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      data: data
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 }
    )
  }
} 