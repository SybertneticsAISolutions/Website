import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the cookie by setting its maxAge to 0
  response.cookies.set('admin_jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    path: '/',
    maxAge: 0,
  });

  return response;
} 