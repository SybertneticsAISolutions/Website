import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pagePath, content } = body;
    
    if (!pagePath || content === undefined) {
      return NextResponse.json({ error: 'Page path and content are required' }, { status: 400 });
    }

    // Upsert content to Supabase (insert or update)
    const { data, error } = await supabase
      .from('page_content')
      .upsert({
        page_path: pagePath,
        content: content,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'page_path'
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Content saved successfully'
    });
  } catch (error) {
    console.error('Error saving page content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 