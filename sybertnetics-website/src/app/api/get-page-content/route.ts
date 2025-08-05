import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pagePath = searchParams.get('pagePath');
    
    if (!pagePath) {
      return NextResponse.json({ error: 'Page path is required' }, { status: 400 });
    }

    // Get content from Supabase
    const { data, error } = await supabase
      .from('page_content')
      .select('content')
      .eq('page_path', pagePath)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: data?.content || ''
    });
  } catch (error) {
    console.error('Error getting page content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 