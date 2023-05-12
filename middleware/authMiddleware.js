const jwt = require('jsonwebtoken');

function authMiddleware(request, h) {
  // Retrieve token from the request headers
  const token = request.headers.authorization;

  if (!token) {
    return h.response({ message: 'Token not found' }).code(401);
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    return h.continue;
  } catch (error) {
    return h.response({ message: 'Token is not valid' }).code(401);
  }
}

module.exports = authMiddleware;
