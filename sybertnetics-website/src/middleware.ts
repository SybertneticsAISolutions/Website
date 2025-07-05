import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || '');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only apply to /admin routes, but exclude the /admin/login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_jwt')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the token using 'jose' library for edge-runtime compatibility
      await jwtVerify(token, ADMIN_JWT_SECRET);
      // If verification is successful, proceed
      return NextResponse.next();
    } catch {
      // If token is invalid, redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Matcher to specify which routes the middleware should run on
  matcher: '/admin/:path*',
}; 