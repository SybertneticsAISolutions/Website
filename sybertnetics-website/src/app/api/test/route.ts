import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Test API route accessed successfully');
  
  return NextResponse.json({
    message: 'Test API route working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    headers: Object.fromEntries(
      Object.entries(process.env).filter(([key]) => 
        key.startsWith('NEXT_') || 
        key.startsWith('DISCORD_') ||
        key === 'NODE_ENV'
      )
    )
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 