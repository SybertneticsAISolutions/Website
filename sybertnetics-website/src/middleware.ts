import { NextResponse } from 'next/server';

export async function middleware() {
  // Allow all requests to pass through
  // Authentication is handled client-side by AdminLayout component
  // This ensures Supabase Auth can work properly
  return NextResponse.next();
}

export const config = {
  // Matcher to specify which routes the middleware should run on
  matcher: '/admin/:path*',
}; 