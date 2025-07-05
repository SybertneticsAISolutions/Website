const jwt = require('jsonwebtoken');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const { username, password } = JSON.parse(event.body || '{}');
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  const JWT_SECRET = process.env.ADMIN_JWT_SECRET;

  if (!ADMIN_USER || !ADMIN_PASS || !JWT_SECRET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server misconfiguration' })
    };
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ admin: true, username }, JWT_SECRET, { expiresIn: '2h' });
    return {
      statusCode: 200,
      body: JSON.stringify({ token })
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid credentials' })
    };
  }
}; 