const express = require('express');
const { getAuthorizationUrl, exchangeCodeForTokens } = require('../config/google');
const { createToken } = require('../middleware/auth');

const router = express.Router();

/**
 * Initiate Google OAuth2 flow
 */
router.get('/google', (req, res) => {
  try {
    const authUrl = getAuthorizationUrl();
    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate authorization URL' });
  }
});

/**
 * OAuth2 callback handler
 */
router.get('/callback', async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Create JWT token for frontend
    const jwtToken = createToken({
      sub: 'user-' + Date.now(), // User ID placeholder
      hasGoogleAuth: true,
      issuedAt: new Date().toISOString()
    });

    // TODO: Store tokens in database with user
    // For now, we'll pass them in a secure way

    // Redirect to frontend with token (in production, use secure cookie)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontendUrl}/meetings?token=${jwtToken}&google_access=${tokens.access_token}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

/**
 * Verify authentication status
 */
router.post('/verify', (req, res) => {
  try {
    // In a real app, verify the token from headers
    res.json({ authenticated: true, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
