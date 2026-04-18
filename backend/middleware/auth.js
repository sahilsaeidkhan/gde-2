const jwt = require('jsonwebtoken');

/**
 * Verify JWT token from Authorization header
 */
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token has expired' });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.status(500).json({ error: 'Token verification failed' });
  }
}

/**
 * Create JWT token
 */
function createToken(payload, expiresIn = '24h') {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

module.exports = {
  verifyToken,
  createToken
};
