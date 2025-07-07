import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Allow all requests to pass through
  // Authentication is handled client-side by AdminLayout component
  // This ensures Firebase Auth can work properly
  return NextResponse.next();
}

export const config = {
  // Matcher to specify which routes the middleware should run on
  matcher: '/admin/:path*',
}; 