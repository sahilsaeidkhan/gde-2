# GDE - Google Meet Integration with AI Summarization

A complete solution for auto-summarizing Google Meet sessions using AI, extracting action items, and integrating with your productivity dashboard.

## 🎯 Overview

**GDE** combines three components:

1. **Chrome Extension** — Detects Google Meet sessions and captures captions
2. **Node.js Backend** — Handles Google OAuth, LLM summarization via OpenRouter
3. **React/Next.js Frontend** — Dashboard to view meeting summaries and history

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Google OAuth2 credentials (set up below)
- OpenRouter API key for LLM access
- Chrome browser (for extension)

### 1. Set Up Google OAuth2

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Google Calendar API
   - Google Drive API
   - Google Meet API
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized redirect URIs: `http://localhost:5000/auth/callback`
5. Copy `Client ID` and `Client Secret`

### 2. Get OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up and go to keys page
3. Create a new API key
4. Copy the key

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

**Edit `.env` with your credentials:**
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/callback
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=openai/gpt-4-turbo
MONGODB_URI=mongodb://localhost:27017/gde
JWT_SECRET=your_random_secret_key
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Start backend:**
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### 5. Chrome Extension Setup

1. Open `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `extension/` folder
5. Extension appears in toolbar

## 📋 How It Works

### Workflow

```
1. User opens Google Meet
   ↓
2. Chrome Extension detects meet.google.com
   ↓
3. Extension captures live captions
   ↓
4. User clicks "Send to Dashboard" in extension popup
   ↓
5. Transcript sent to backend
   ↓
6. Backend calls OpenRouter LLM for summarization
   ↓
7. Summary appears in dashboard with:
   - Meeting summary
   - Key achievements
   - Blockers
   - Next steps
   ↓
8. Meeting saved to history
```

### Architecture

```
Chrome Extension (meet.google.com)
    ↓
    ├─→ background.js (service worker)
    ├─→ content.js (caption extraction)
    └─→ popup.js (UI)
        ↓
    Sends transcript via postMessage
        ↓
React Frontend (http://localhost:3000)
    ↓
    ├─→ useMeetingIntegration hook
    ├─→ MeetingPopup component
    └─→ Dashboard page
        ↓
    Calls /api/meetings/summarize
        ↓
Node.js Backend (http://localhost:5000)
    ↓
    ├─→ /routes/auth.js (Google OAuth)
    ├─→ /routes/meetings.js (Meeting endpoints)
    ├─→ /services/summarizationService.js
    └─→ /config/openrouter.js
        ↓
    Calls OpenRouter API
        ↓
LLM Response (JSON)
    ↓
    Returns to frontend and stores in memory
```

## 🛠️ API Endpoints

### Authentication

- `GET /auth/google` — Redirect to Google consent screen
- `GET /auth/callback` — OAuth callback handler
- `POST /auth/verify` — Verify authentication status

### Meetings

- `GET /api/meetings` — Get all meetings (requires auth)
- `GET /api/meetings/:id` — Get specific meeting
- `POST /api/meetings` — Save new meeting with transcript
- `POST /api/meetings/summarize` — Summarize transcript
- `PUT /api/meetings/:id/summary` — Update meeting summary
- `DELETE /api/meetings/:id` — Delete meeting

### Example Request

```bash
# Summarize a transcript
curl -X POST http://localhost:5000/api/meetings/summarize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token" \
  -d '{
    "transcript": "We discussed the new feature. John will handle the backend. Mary will do the frontend. Deadline is Friday."
  }'
```

### Example Response

```json
{
  "success": true,
  "summary": {
    "summary": "Team discussed a new feature with clear task assignments and a Friday deadline.",
    "achievements": [],
    "blockers": [],
    "nextSteps": [
      "John will handle the backend",
      "Mary will do the frontend",
      "Deadline: Friday"
    ],
    "hrUpdates": [],
    "actionItems": [...]
  },
  "transcriptLength": 125,
  "processedAt": "2026-04-18T13:35:00.000Z"
}
```

## 📱 UI Features

### Dashboard

- **Meeting History** — View all summarized meetings
- **Google OAuth** — Link your Google account
- **Live Updates** — Real-time caption capture
- **Export** — Copy transcripts and summaries

### Extension Popup

- **Status Indicator** — Shows if meeting is detected
- **Transcript Area** — Displays captured captions
- **Actions** — Send to dashboard, copy, clear
- **Status Messages** — Success/error feedback

## 🔐 Security Notes

- **Tokens** — Stored in `localStorage` (use `httpOnly` cookies in production)
- **OAuth** — Only requests necessary scopes
- **API Keys** — Never commit `.env` files
- **Data** — Transcripts stored in memory (replace with database)

## 📦 Dependencies

### Backend

- `express` — Web framework
- `googleapis` — Google API client
- `axios` — HTTP client
- `jsonwebtoken` — JWT auth
- `mongoose` — Optional: MongoDB ORM
- `dotenv` — Environment variables

### Frontend

- `react` — UI library
- `next` — React framework
- `axios` — HTTP client

### Extension

- No dependencies (vanilla JavaScript)

## 🧪 Testing

### Test Backend Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Get OAuth URL
curl http://localhost:5000/auth/google

# Test summarization
curl -X POST http://localhost:5000/api/meetings/summarize \
  -H "Content-Type: application/json" \
  -d '{"transcript":"Test meeting content"}'
```

### Test Extension

1. Open `chrome://extensions/`
2. Go to GDE extension details
3. Click "Inspect views" → background.js
4. DevTools opens showing service worker logs
5. Open Google Meet
6. Check console for `[GDE]` logs

### Test Full Flow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Load extension in Chrome
4. Visit `http://localhost:3000`
5. Click "Link Google Meet Account"
6. Complete Google OAuth flow
7. Open any Google Meet URL
8. Extension popup shows "Google Meet Detected"
9. Captions appear in transcript area
10. Click "Send to Dashboard"
11. Return to dashboard
12. Meeting appears in history with summary

## 🐛 Troubleshooting

### Extension not capturing captions

- Check extension is loaded at `chrome://extensions/`
- Verify permissions in manifest.json
- Check content.js console logs (go to `chrome://extensions/` → Details → Inspect views)
- Ensure you're on meet.google.com (not meet.go ogle.com, etc.)

### Backend errors

- Verify `.env` file has all required variables
- Check Node.js version: `node --version`
- Ensure port 5000 is available: `lsof -i :5000`
- Check OpenRouter API key is valid

### Frontend won't connect

- Verify backend is running: `curl http://localhost:5000/health`
- Check CORS is enabled in backend
- Clear browser cache and localStorage
- Check browser console for specific errors

### OAuth fails

- Verify Google OAuth credentials are correct
- Check redirect URI matches in Google Console: `http://localhost:5000/auth/callback`
- Ensure Google Calendar API is enabled

## 📝 Environment Variables

Create `.env` in `backend/`:

```env
# Required
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/callback
OPENROUTER_API_KEY=
JWT_SECRET=

# Optional
OPENROUTER_MODEL=openai/gpt-4-turbo
MONGODB_URI=mongodb://localhost:27017/gde
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## 🚢 Deployment

### Backend (Heroku)

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set GOOGLE_CLIENT_ID=your_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
# ... etc

# Deploy
git push heroku main
```

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Extension (Chrome Web Store)

1. Zip the `extension/` folder
2. Register as Chrome Web Store Developer ($5)
3. Upload and publish

## 📚 Additional Resources

- [Google Meet API](https://developers.google.com/meet)
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/)
- [OpenRouter API](https://openrouter.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)

## 📄 License

MIT - Feel free to use for personal and commercial projects

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open Pull Request

## 📧 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include relevant logs and error messages

---

**Happy summarizing! 🎉**
