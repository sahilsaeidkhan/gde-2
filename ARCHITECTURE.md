# SyncHub Architecture & Technical Design

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Chrome Extension                      │
│          (Meeting Detection & Caption Capture)          │
│  - background.js: Detects meet.google.com               │
│  - content.js: Extracts captions                        │
│  - popup.js: User interface                             │
└────────────────────┬────────────────────────────────────┘
                     │ window.postMessage()
                     ▼
┌─────────────────────────────────────────────────────────┐
│              React/Next.js Frontend                      │
│          (Responsive SyncHub Dashboard)                 │
│  - Landing Page: OAuth entry point                      │
│  - Dashboard: Bento grid layout                         │
│  - Pages: Meetings, Standups, Analytics, Settings       │
│  - Components: 20+ reusable UI components               │
└────────────────────┬────────────────────────────────────┘
                     │ REST API (Axios)
                     ▼
┌─────────────────────────────────────────────────────────┐
│            Node.js/Express Backend                      │
│         (OAuth, LLM, Meeting Management)                │
│  - routes/auth.js: Google OAuth2                        │
│  - routes/meetings.js: Meeting CRUD                     │
│  - services/summarizationService.js: LLM calls          │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP API
                     ├─────────────────┬──────────────────┐
                     ▼                 ▼                  ▼
            ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
            │ Google OAuth │   │ OpenRouter   │   │  Database    │
            │  (Accounts)  │   │  (LLM API)   │   │ (Meetings)   │
            └──────────────┘   └──────────────┘   └──────────────┘
```

## Component Hierarchy

### Frontend Components

```
App (_app.jsx)
├── Landing (landing.jsx)
│   ├── Hero Section
│   ├── Features
│   └── CTA Button
│
└── AppShell (layout wrapper)
    ├── Sidebar (navigation)
    │   ├── Logo
    │   ├── Nav Items
    │   └── Collapse Toggle
    │
    ├── Header (top bar)
    │   ├── Page Title
    │   ├── Sync Indicator
    │   └── User Profile Dropdown
    │
    └── Main Content
        ├── Dashboard (Bento Grid)
        │   ├── GitHubFeed (2x2 tile)
        │   ├── MeetingSummaries (1x2 tile)
        │   ├── QuickStats (1x1 tiles)
        │   └── SyncIndicator (floating)
        │
        ├── Meetings (list page)
        │   ├── Search/Filter
        │   └── Meeting Cards
        │
        ├── Standups (list page)
        │   ├── Date Headers
        │   └── Standup Content
        │
        ├── Analytics (dashboard)
        │   ├── Stats Grid
        │   ├── Charts
        │   └── Insights
        │
        └── Settings (form page)
            ├── Account Section
            ├── Notifications
            ├── Integrations
            └── Danger Zone
```

## Data Flow

### Authentication Flow
```
User lands on app
    ↓
Check localStorage for token
    ├─ Found: Redirect to /dashboard
    └─ Not found: Show /landing
    ↓
User clicks "Get Started"
    ↓
Redirects to backend OAuth endpoint
    ↓
Google consent screen
    ↓
OAuth callback with auth code
    ↓
Backend exchanges code for tokens
    ↓
JWT created and returned to frontend
    ↓
Token stored in localStorage
    ↓
Redirect to /dashboard
    ↓
Dashboard loaded with auth token
```

### Meeting Summarization Flow
```
Google Meet starts
    ↓
Extension detects meet.google.com
    ↓
Content script extracts captions every 5s
    ↓
User clicks "Send to Dashboard"
    ↓
Transcript sent via window.postMessage
    ↓
Frontend receives in useMeetingIntegration hook
    ↓
MeetingPopup appears with transcript
    ↓
User clicks "Summarize"
    ↓
POST /api/meetings/summarize
    ↓
Backend sends to OpenRouter LLM
    ↓
LLM processes with system prompt
    ↓
Returns structured JSON (summary, achievements, etc.)
    ↓
Frontend displays formatted summary
    ↓
User clicks "Save"
    ↓
Meeting stored in database
    ↓
Appears in meetings history
```

## State Management

### React State (Local Component State)
- Form inputs
- Modal open/close states
- Sidebar collapsed/expanded
- Search queries
- Pagination

### Browser Storage
- JWT token: `localStorage.getItem('token')`
- User preferences: `localStorage`

### Server State (Database)
- User profiles
- Meeting data
- Meeting summaries
- User settings

## Styling Architecture

### Tailwind CSS Configuration

```javascript
// Design tokens
colors: {
  'synchub-black': '#000000',      // Background
  'synchub-card': '#121212',       // Card bg
  'synchub-blue': '#007AFF',       // Primary
  'synchub-blue-light': '#E3F2FD', // Accent
}

spacing: 4px increments (4, 8, 12, 16, 20...)
borderRadius: sm(8px), md(12px), lg(16px)
animations: pulse-blue, glow, fade-in, slide-up/down
shadows: Multi-layer for depth and glow effects
```

### Component Styling Pattern
- Base Tailwind classes in JSX
- Utility classes with `clsx()`
- CSS custom properties for animations
- No CSS files needed (utility-first)

## API Endpoints

### Authentication
- `GET /auth/google` - Redirect to Google consent
- `GET /auth/callback` - OAuth callback handler
- `POST /auth/verify` - Verify JWT token

### Meetings
- `GET /api/meetings` - List user's meetings
- `GET /api/meetings/:id` - Get specific meeting
- `POST /api/meetings` - Save new meeting
- `POST /api/meetings/summarize` - Summarize transcript
- `PUT /api/meetings/:id/summary` - Update summary
- `DELETE /api/meetings/:id` - Delete meeting

### Response Format
```javascript
// Success
{
  success: true,
  data: {...},
  message: "..."
}

// Error
{
  success: false,
  error: "Error message",
  status: 400
}
```

## Database Schema (MongoDB)

```javascript
// Users Collection
{
  _id: ObjectId,
  email: "user@example.com",
  googleId: "google_oauth_id",
  accessToken: "google_access_token",
  refreshToken: "google_refresh_token",
  createdAt: Date,
  updatedAt: Date
}

// Meetings Collection
{
  _id: ObjectId,
  userId: ObjectId,
  title: "Meeting Title",
  transcript: "Full transcript text",
  summary: {
    summary: "2-3 sentence summary",
    achievements: ["item1", "item2"],
    blockers: ["blocker1"],
    nextSteps: ["step1", "step2"],
    hrUpdates: []
  },
  meetingUrl: "https://meet.google.com/...",
  duration: "1h 30m",
  createdAt: Date,
  summarizedAt: Date,
  updatedAt: Date
}
```

## Performance Optimizations

### Frontend
- Code splitting per page (Next.js automatic)
- Dynamic imports for heavy components
- Image optimization with next/image
- CSS-in-JS with Tailwind (no extra CSS files)
- Memoization with React.memo for list items

### Backend
- Request caching with Redis (future)
- Database query optimization
- Connection pooling
- Rate limiting on LLM calls
- JWT caching to avoid repeated verification

### General
- Gzip compression
- CDN for static assets
- Database indexing on frequently queried fields
- Pagination for large result sets

## Security Considerations

### Authentication
- Google OAuth2 for SSO
- JWT tokens with short expiration (24h)
- Refresh token rotation (future)
- HTTPS enforced in production

### Data Protection
- Environment variables for secrets
- No sensitive data in localStorage (use httpOnly cookies in prod)
- CORS whitelist for API endpoints
- Input validation on all forms
- SQL injection prevention with ORM

### API Security
- Rate limiting per IP/user
- CSRF protection with tokens (future)
- CORS headers properly set
- Content Security Policy headers

## Deployment Architecture

### Development
- Local: Backend on :5000, Frontend on :3000
- Extension: Loaded unpacked from local folder
- Hot reload for both frontend and backend

### Production
- Frontend: Vercel (serverless)
- Backend: Heroku/AWS (containerized)
- Database: MongoDB Atlas/AWS RDS
- Extension: Chrome Web Store

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=https://api.synchub.io
```

**Backend (.env)**
```
NODE_ENV=production
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
OPENROUTER_API_KEY=...
JWT_SECRET=...
MONGODB_URI=...
```

## Monitoring & Logging

### Frontend
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring (Lighthouse CI)

### Backend
- Application logs (Winston/Morgan)
- Error tracking (Sentry)
- APM (Application Performance Monitoring)
- Database query logging

### Infrastructure
- Uptime monitoring
- CPU/Memory alerts
- Database backup verification
- API response time monitoring

## Future Enhancements

1. **Real-time Collaboration**
   - WebSockets for live sync
   - Team workspaces
   - Shared meeting notes

2. **Advanced AI**
   - Custom LLM fine-tuning
   - Meeting transcription
   - Predictive analytics

3. **Integrations**
   - Slack bot for standups
   - Email notifications
   - Calendar integration
   - Jira/Linear sync

4. **Mobile**
   - React Native app
   - Push notifications
   - Offline support

5. **Enterprise**
   - SSO/SAML
   - Role-based access
   - Audit logs
   - Data residency options

---

**SyncHub: Built for Scale**
