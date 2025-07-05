import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || '');

export async function GET(request: Request) {
  try {
    const cookies = request.headers.get('cookie');
    if (!cookies) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Extract the admin_jwt cookie
    const tokenMatch = cookies.match(/admin_jwt=([^;]+)/);
    if (!tokenMatch) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const token = tokenMatch[1];

    try {
      // Verify the token
      await jwtVerify(token, ADMIN_JWT_SECRET);
      return NextResponse.json({ authenticated: true });
    } catch {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
} 