const jwt = require('jsonwebtoken');

function verifyJwt(token) {
  if (!token || !process.env.ADMIN_JWT_SECRET) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    // Ensure the token has the expected admin claim
    return decoded.admin === true;
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return false;
  }
}

module.exports = { verifyJwt }; 