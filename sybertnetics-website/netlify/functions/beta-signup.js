const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, name, experience } = JSON.parse(event.body);

    // Basic validation
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid email address is required' }),
      };
    }

    // Create signup entry
    const timestamp = new Date().toISOString();
    const signupData = {
      email,
      name: name || '',
      experience: experience || '',
      timestamp,
      ip: event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown',
    };

    // File path for storing signups (in a data directory)
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'beta-signups.txt');

    // Ensure data directory exists
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Append signup data to file
    const signupLine = `${timestamp}\t${email}\t${name}\t${experience}\t${signupData.ip}\n`;
    await fs.appendFile(filePath, signupLine);

    // Also create a JSON log for easier parsing if needed
    const jsonFilePath = path.join(dataDir, 'beta-signups.json');
    let existingData = [];
    
    try {
      const existingFile = await fs.readFile(jsonFilePath, 'utf-8');
      existingData = JSON.parse(existingFile);
    } catch (err) {
      // File doesn't exist yet, start with empty array
    }

    existingData.push(signupData);
    await fs.writeFile(jsonFilePath, JSON.stringify(existingData, null, 2));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully signed up for beta access!' 
      }),
    };

  } catch (error) {
    console.error('Beta signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}; 