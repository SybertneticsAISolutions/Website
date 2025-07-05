const fs = require('fs/promises');
const path = require('path');
const jwt = require('jsonwebtoken');

// Correctly locate the content directory from the function's execution context
const jobsDirectory = path.join(process.cwd(), 'sybertnetics-website/src/content/careers');

// Helper to verify JWT from Authorization header
const verifyAdminToken = (event) => {
  const authHeader = event.headers.authorization;
  if (!authHeader || !process.env.ADMIN_JWT_SECRET) return null;
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    return decoded.admin ? decoded : null;
  } catch (error) {
    return null;
  }
};

exports.handler = async function(event) {
  if (!verifyAdminToken(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  // Ensure the directory exists before proceeding
  await fs.mkdir(jobsDirectory, { recursive: true });

  switch (event.httpMethod) {
    case 'GET': // List all jobs
      try {
        const files = await fs.readdir(jobsDirectory);
        const jobs = await Promise.all(
          files
            .filter(file => file.endsWith('.json'))
            .map(async file => {
              const content = await fs.readFile(path.join(jobsDirectory, file), 'utf-8');
              return JSON.parse(content);
            })
        );
        return { statusCode: 200, body: JSON.stringify(jobs) };
      } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to read job postings.' }) };
      }

    case 'POST': // Create or update a job
      try {
        const jobData = JSON.parse(event.body);
        if (!jobData.slug) {
          return { statusCode: 400, body: JSON.stringify({ error: 'Job slug is required.' }) };
        }
        const filePath = path.join(jobsDirectory, `${jobData.slug}.json`);
        await fs.writeFile(filePath, JSON.stringify(jobData, null, 2));
        return { statusCode: 200, body: JSON.stringify({ success: true, slug: jobData.slug }) };
      } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to save job posting.' }) };
      }

    case 'DELETE': // Delete a job
      try {
        const { slug } = event.queryStringParameters;
        if (!slug) {
          return { statusCode: 400, body: JSON.stringify({ error: 'Job slug is required for deletion.' }) };
        }
        const filePath = path.join(jobsDirectory, `${slug}.json`);
        await fs.unlink(filePath);
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
      } catch (error) {
        if (error.code === 'ENOENT') {
          return { statusCode: 404, body: JSON.stringify({ error: 'Job posting not found.' }) };
        }
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete job posting.' }) };
      }

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
  }
}; 