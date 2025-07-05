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
    const { email, name, interests, source } = JSON.parse(event.body);

    // Basic validation
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid email address is required' }),
      };
    }

    // Create subscription entry
    const timestamp = new Date().toISOString();
    const subscriptionData = {
      email,
      name: name || '',
      interests: interests || [], // Array of interests like ['ai', 'tech', 'runedrive']
      source: source || 'website', // Where they signed up from
      timestamp,
      status: 'active',
      ip: event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown',
    };

    // File paths for storing subscriptions
    const dataDir = path.join(process.cwd(), 'data');
    const subscriptionsFile = path.join(dataDir, 'newsletter-subscriptions.json');

    // Ensure data directory exists
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Read existing subscriptions
    let existingSubscriptions = [];
    try {
      const existingFile = await fs.readFile(subscriptionsFile, 'utf-8');
      existingSubscriptions = JSON.parse(existingFile);
    } catch (err) {
      // File doesn't exist yet, start with empty array
    }

    // Check if email already exists
    const existingIndex = existingSubscriptions.findIndex(sub => sub.email === email);
    if (existingIndex !== -1) {
      // Update existing subscription
      existingSubscriptions[existingIndex] = {
        ...existingSubscriptions[existingIndex],
        ...subscriptionData,
        updatedAt: timestamp
      };
    } else {
      // Add new subscription
      existingSubscriptions.push(subscriptionData);
    }

    // Save updated subscriptions
    await fs.writeFile(subscriptionsFile, JSON.stringify(existingSubscriptions, null, 2));

    // Also maintain category-specific files for easier management
    if (interests && interests.length > 0) {
      for (const interest of interests) {
        const categoryFile = path.join(dataDir, `newsletter-${interest}.json`);
        let categorySubscriptions = [];
        
        try {
          const categoryContent = await fs.readFile(categoryFile, 'utf-8');
          categorySubscriptions = JSON.parse(categoryContent);
        } catch (err) {
          // File doesn't exist yet
        }

        // Add to category if not already present
        if (!categorySubscriptions.find(sub => sub.email === email)) {
          categorySubscriptions.push(subscriptionData);
          await fs.writeFile(categoryFile, JSON.stringify(categorySubscriptions, null, 2));
        }
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter!' 
      }),
    };

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}; 