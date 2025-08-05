import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyAuthToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split('Bearer ')[1];
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return null;
    }
    
    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    return adminUser ? user : null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const user = await verifyAuthToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { path: pagePath } = await params;
    const filePath = path.join(process.cwd(), 'src', 'content', 'pages', `${pagePath}.md`);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return NextResponse.json({ content });
    } catch {
      // If file doesn't exist, return empty content
      return NextResponse.json({ content: '' });
    }
  } catch (error) {
    console.error('Error getting content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const user = await verifyAuthToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const { path: pagePath } = await params;
    const filePath = path.join(process.cwd(), 'src', 'content', 'pages', `${pagePath}.md`);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write content to file
    await fs.writeFile(filePath, content, 'utf-8');
    
    return NextResponse.json({ message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 