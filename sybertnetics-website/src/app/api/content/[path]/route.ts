import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { verifyToken } from '@/app/admin/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    const pagePath = params.path;
    const filePath = path.join(process.cwd(), 'src', 'content', 'pages', `${pagePath}.md`);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return NextResponse.json({ content });
    } catch (error) {
      // If file doesn't exist, return empty content
      return NextResponse.json({ content: '' });
    }
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    // Verify admin authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pagePath = params.path;
    const { content } = await request.json();
    
    const filePath = path.join(process.cwd(), 'src', 'content', 'pages', `${pagePath}.md`);
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write content to file
    await fs.writeFile(filePath, content, 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
} 