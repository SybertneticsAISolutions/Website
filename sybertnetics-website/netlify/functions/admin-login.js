const jwt = require('jsonwebtoken');

exports.handler = async function(event) {
  console.log('Admin login function called');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Environment variables check:');
  console.log('- ADMIN_USER:', process.env.ADMIN_USER ? 'SET' : 'NOT SET');
  console.log('- ADMIN_PASS:', process.env.ADMIN_PASS ? 'SET' : 'NOT SET');
  console.log('- ADMIN_JWT_SECRET:', process.env.ADMIN_JWT_SECRET ? 'SET' : 'NOT SET');

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body || '{}');
    console.log('Login attempt for username:', username);
    
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    const JWT_SECRET = process.env.ADMIN_JWT_SECRET;

    if (!ADMIN_USER || !ADMIN_PASS || !JWT_SECRET) {
      console.error('Missing environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server misconfiguration - missing environment variables' })
      };
    }

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      console.log('Login successful for user:', username);
      const token = jwt.sign({ admin: true, username }, JWT_SECRET, { expiresIn: '2h' });
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      };
    } else {
      console.log('Login failed - invalid credentials');
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 