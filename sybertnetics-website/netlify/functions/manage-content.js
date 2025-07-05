const fs = require('fs/promises');
const path = require('path');
const { verifyJwt } = require('./utils/auth');

// Base directory for all content, making it easy to manage paths
const contentBaseDir = path.resolve(__dirname, '../../sybertnetics-website/src/content');

const getContentTypeDir = (contentType) => {
  if (!['blog', 'news'].includes(contentType)) {
    throw new Error('Invalid content type specified.');
  }
  return path.join(contentBaseDir, contentType);
};

exports.handler = async (event, context) => {
  const unauthorizedResponse = {
    statusCode: 401,
    body: JSON.stringify({ error: 'Unauthorized' }),
  };

  const token = event.headers.authorization?.split(' ')[1];
  if (!verifyJwt(token)) {
    return unauthorizedResponse;
  }

  const { contentType, slug } = event.queryStringParameters;
  let contentTypeDir;
  try {
    contentTypeDir = getContentTypeDir(contentType);
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
  }

  try {
    switch (event.httpMethod) {
      case 'GET': {
        // List all posts for a given content type
        const files = await fs.readdir(contentTypeDir);
        const posts = await Promise.all(
          files
            .filter((file) => file.endsWith('.json'))
            .map(async (file) => {
              const content = await fs.readFile(path.join(contentTypeDir, file), 'utf-8');
              return JSON.parse(content);
            })
        );
        return { statusCode: 200, body: JSON.stringify(posts) };
      }

      case 'POST': {
        // Create or update a post
        const data = JSON.parse(event.body);
        if (!data.title || !data.slug) {
          return { statusCode: 400, body: JSON.stringify({ error: 'Title and slug are required.' }) };
        }
        const filePath = path.join(contentTypeDir, `${data.slug}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return { statusCode: 200, body: JSON.stringify({ success: true, path: filePath }) };
      }

      case 'DELETE': {
        // Delete a post
        if (!slug) {
          return { statusCode: 400, body: JSON.stringify({ error: 'Slug is required for deletion.' }) };
        }
        const filePath = path.join(contentTypeDir, `${slug}.json`);
        // Add a check to ensure the file exists before attempting to delete
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
          return { statusCode: 200, body: JSON.stringify({ success: true }) };
        } catch {
          return { statusCode: 404, body: JSON.stringify({ error: 'Post not found.' }) };
        }
      }

      default:
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An internal server error occurred.' }),
    };
  }
}; 