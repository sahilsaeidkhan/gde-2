const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/meetings.space.readonly'
];

/**
 * Generate Google OAuth2 authorization URL
 */
function getAuthorizationUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent' // Force consent screen to get refresh token
  });
}

/**
 * Exchange authorization code for tokens
 */
async function exchangeCodeForTokens(code) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
}

/**
 * Get a new access token using refresh token
 */
async function refreshAccessToken(refreshToken) {
  try {
    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

/**
 * Set credentials for API calls
 */
function setCredentials(tokens) {
  oauth2Client.setCredentials(tokens);
}

module.exports = {
  oauth2Client,
  SCOPES,
  getAuthorizationUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
  setCredentials
};
