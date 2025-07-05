const fs = require('fs').promises;
const path = require('path');
const { verifyJwt } = require('./utils/auth');

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Check authentication
  const authHeader = event.headers.authorization;
  const cookieHeader = event.headers.cookie;
  
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (cookieHeader) {
    const tokenMatch = cookieHeader.match(/admin_jwt=([^;]+)/);
    if (tokenMatch) {
      token = tokenMatch[1];
    }
  }

  if (!token || !verifyJwt(token)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    // Read the JSON file containing newsletter subscriptions
    const dataDir = path.join(process.cwd(), 'data');
    const subscriptionsFile = path.join(dataDir, 'newsletter-subscriptions.json');

    let subscriptions = [];
    try {
      const fileContent = await fs.readFile(subscriptionsFile, 'utf-8');
      subscriptions = JSON.parse(fileContent);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      // File doesn't exist yet, return empty array
    }

    // Sort by timestamp, newest first
    subscriptions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptions),
    };

  } catch (error) {
    console.error('Get newsletter subscriptions error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}; 