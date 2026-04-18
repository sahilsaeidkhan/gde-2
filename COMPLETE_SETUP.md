# SyncHub - Complete Setup & Deployment Guide

## 🎯 Overview

SyncHub is a premium productivity dashboard combining GitHub activity tracking and Google Meet AI summarization. This guide covers complete setup, development, and deployment.

## 📋 Prerequisites

- **Node.js**: 16+ ([Download](https://nodejs.org/))
- **npm**: 7+ (comes with Node.js)
- **Git**: For version control
- **Google Cloud Account**: For OAuth credentials
- **OpenRouter Account**: For LLM access

## 🚀 Complete Setup (15 minutes)

### Step 1: Get Your Credentials

#### Google OAuth2
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "SyncHub"
3. Enable APIs:
   - Google Calendar API
   - Google Drive API  
   - Google Meet API
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized redirect URIs: `http://localhost:5000/auth/callback`
5. Copy **Client ID** and **Client Secret**

#### OpenRouter API Key
1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up free account
3. Navigate to API Keys
4. Copy your API key

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
nano .env
# OR
code .env  # Open in VS Code
```

**Edit `.env` with:**
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/callback
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=openai/gpt-4-turbo
JWT_SECRET=your_random_secret_key_123
MONGODB_URI=mongodb://localhost:27017/synchub
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Start backend:**
```bash
npm run dev
```

✅ Backend runs on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend runs on `http://localhost:3000`

### Step 4: Chrome Extension Setup

1. Open `chrome://extensions/`
2. Enable **Developer mode** (toggle top-right)
3. Click **Load unpacked**
4. Select the `extension/` folder
5. Verify "GDE - Google Meet Summarizer" appears

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:5000/health
# Should return: {"status":"ok",...}
```

### Test OAuth Flow
```bash
curl http://localhost:5000/auth/google
# Should return auth URL
```

### Test LLM Summarization
```bash
curl -X POST http://localhost:5000/api/meetings/summarize \
  -H "Content-Type: application/json" \
  -d '{"transcript":"We discussed project roadmap. Team committed to feature launch by Q2."}'
```

### Frontend Access
1. Open http://localhost:3000
2. Click "Get Started with Google"
3. Complete OAuth flow
4. Should redirect to dashboard

### Extension Testing
1. Open any Google Meet URL
2. Check extension popup - should show "Google Meet Detected"
3. Click "Send to Dashboard"
4. Should appear in dashboard

## 📊 Full Workflow Test

**Step 1: Authenticate**
- http://localhost:3000 → "Get Started with Google"
- Complete OAuth flow
- Land on dashboard

**Step 2: View Dashboard**
- See GitHub activity feed (monospace)
- See meeting summaries (serif)
- See quick stats (commits, meeting time)
- Pulsing sync indicator in bottom-right

**Step 3: Test Meeting Integration**
- Open Google Meet URL
- Extension detects meeting
- Captions captured
- Submit to dashboard
- Get AI summary

**Step 4: Explore Pages**
- Dashboard: Overview
- Meetings: Full meeting history
- Standups: Auto-generated daily summaries
- Analytics: Productivity metrics
- Settings: User preferences

## 🐛 Troubleshooting

### Port Already in Use

**Port 3000 (Frontend):**
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Port 5000 (Backend):**
```bash
lsof -i :5000
kill -9 <PID>
```

### OAuth Redirect Issues
- Verify redirect URI: `http://localhost:5000/auth/callback`
- Check Google Console for correct redirect URI
- Clear browser cookies and retry
- Check backend console for errors

### Extension Not Detecting Meetings
- Verify URL contains `meet.google.com`
- Check `chrome://extensions/` for extension status
- Inspect extension background script (Details → Inspect views)
- Look for `[GDE]` log messages

### Backend Can't Connect to OpenRouter
- Verify API key is correct
- Check API key has sufficient credits
- Try test request: `curl https://openrouter.io/api/v1/models -H "Authorization: Bearer YOUR_KEY"`
- Check backend console for specific error

### Frontend Won't Connect to Backend
- Verify backend is running: `curl http://localhost:5000/health`
- Check CORS is enabled in backend
- Clear browser cache: `Cmd+Shift+Delete`
- Hard refresh: `Cmd+Shift+R`

## 📦 Deployment

### Deploy Backend (Heroku)

```bash
# 1. Create Heroku app
heroku create synchub-api

# 2. Set environment variables
heroku config:set GOOGLE_CLIENT_ID=your_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
heroku config:set GOOGLE_REDIRECT_URI=https://synchub-api.herokuapp.com/auth/callback
heroku config:set OPENROUTER_API_KEY=your_key
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongo_uri

# 3. Deploy
git push heroku main

# 4. Check logs
heroku logs --tail
```

### Deploy Frontend (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Navigate to frontend
cd frontend

# 4. Deploy
vercel

# 5. Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Deploy Chrome Extension

1. Go to [Chrome Web Store Developer](https://chrome.google.com/webstore/devconsole)
2. Register developer account ($5)
3. Create new extension:
   - Upload `extension/` folder as ZIP
   - Add description and screenshots
   - Set privacy policy URL
4. Submit for review (1-3 days)
5. Once approved, it's live in Chrome Web Store

## 📈 Production Checklist

- [ ] All environment variables configured
- [ ] HTTPS enabled on backend and frontend
- [ ] Database configured (MongoDB/PostgreSQL)
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured (Google Analytics)
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Security headers added
- [ ] Secrets not in version control
- [ ] Database backups configured
- [ ] Monitoring and alerting setup
- [ ] SSL certificates valid
- [ ] CDN configured for frontend assets
- [ ] API documentation updated
- [ ] User onboarding flow tested

## 🎯 Next Steps

1. **Add Real GitHub Data**
   - Implement GitHub API integration
   - Real commit/PR fetching
   - Activity history storage

2. **Add Real Google Meet Data**
   - Implement Meeting Spaces API
   - Real meeting detection
   - Actual transcript capture

3. **Database Integration**
   - Replace in-memory storage
   - MongoDB/PostgreSQL setup
   - Migration scripts

4. **Advanced Features**
   - Team collaboration
   - Meeting recordings
   - Slack integration
   - Email notifications
   - Custom dashboards

5. **Analytics**
   - User engagement tracking
   - Performance monitoring
   - Error tracking

## 📞 Support

### Frontend Issues
See: `frontend/README.md`

### Backend Issues
See: `backend/README.md`

### Extension Issues
See: `extension/README.md`

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/)

## 🎉 You're Ready!

Your SyncHub dashboard is now set up and ready to use. Start at step 2 of the complete setup if you haven't already.

---

**Happy productivity! 🚀**
