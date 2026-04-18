# SyncHub - Premium Frontend Dashboard

A modern, high-performance React/Next.js dashboard built with Tailwind CSS and glassmorphism effects.

## 🎨 Design Features

- **Premium Dark Theme**: Deep black backgrounds (#000000) with Electric Blue accents (#007AFF)
- **Glassmorphism**: Modern UI with backdrop blur and subtle glowing borders
- **Responsive**: Mobile-first design with desktop optimization
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance**: Optimized with Next.js and Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Or with yarn
yarn install
```

### Development

```bash
# Start development server
npm run dev

# Or with yarn
yarn dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/              # Next.js pages and routes
│   │   ├── landing.jsx     # Landing/hero page
│   │   ├── _app.jsx        # Main app wrapper
│   │   └── dashboard/      # Authenticated pages
│   │       ├── index.jsx   # Main dashboard with Bento grid
│   │       ├── meetings/   # Meeting history page
│   │       ├── standups/   # Standup page
│   │       ├── settings/   # Settings page
│   │       └── analytics/  # Analytics dashboard
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/         # Layout components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── AppShell.jsx
│   │   └── dashboard/      # Dashboard-specific components
│   │       ├── GitHubFeed.jsx
│   │       ├── MeetingSummaries.jsx
│   │       ├── QuickStats.jsx
│   │       └── SyncIndicator.jsx
│   ├── styles/
│   │   └── globals.css     # Tailwind + global styles
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## 🎯 Key Components

### UI Components
- **Button**: Primary, secondary, ghost, and danger variants with icons
- **Card**: Glassmorphic cards with optional glowing borders
- **Badge**: Status indicators with multiple variants
- **Input**: Form inputs with icons and validation
- **Modal**: Full-screen modals with backdrop blur

### Layout Components
- **Sidebar**: Collapsible navigation with icons
- **Header**: Top navigation with user profile
- **AppShell**: Main layout wrapper for authenticated pages

### Dashboard Components
- **GitHubFeed**: GitHub activity in monospace font
- **MeetingSummaries**: AI-generated meeting summaries in serif font
- **QuickStats**: Key metrics and stats
- **SyncIndicator**: Pulsing background sync indicator

## 🎨 Design System

### Colors
- **Background**: `#000000` (synchub-black)
- **Cards**: `#121212` (synchub-card)
- **Primary**: `#007AFF` (synchub-blue)
- **Light Text**: `#B0B0B0` (synchub-grey-light)
- **Success**: `#10B981` (green)
- **Error**: `#EF4444` (red)

### Typography
- **Font**: Inter, SF Pro Display, -apple-system
- **Monospace** (code): Fira Code
- **Serif** (summaries): Georgia

### Spacing Scale
- Base: 4px increments (4, 8, 12, 16, 20, 24, 32, etc.)

### Border Radius
- Small: `8px` (sm)
- Medium: `12px` (md)
- Large: `16px` (lg)

## 🔧 Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📱 Responsive Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## ♿ Accessibility

- ✅ Keyboard navigation throughout
- ✅ ARIA labels on interactive elements
- ✅ Focus ring indicators (ring-2 ring-synchub-blue)
- ✅ Color contrast ratios >= 4.5:1
- ✅ Screen reader compatible

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The app can be deployed to any Node.js hosting:

```bash
npm run build
npm start
```

## 🧪 Performance

- **Lighthouse Scores**: 90+
- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 3.5s
- **Code Splitting**: Automatic per page
- **Image Optimization**: Next.js Image component

## 📚 Component Usage

### Button
```jsx
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

<Button variant="primary" size="lg" icon={ArrowRight}>
  Get Started
</Button>
```

### Card
```jsx
import { Card } from '@/components/ui/Card';

<Card glowing hover>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

### Input
```jsx
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

<Input placeholder="Search..." icon={Search} label="Search" />
```

### Modal
```jsx
import { Modal } from '@/components/ui/Modal';

<Modal isOpen={isOpen} onClose={onClose} title="Title">
  Content here
</Modal>
```

## 🎬 Animation Classes

- `animate-pulse-blue`: Pulsing blue glow
- `animate-glow`: Glowing border effect
- `animate-fade-in`: Fade in animation
- `animate-slide-up`: Slide up animation
- `animate-slide-down`: Slide down animation

## 🤝 Contributing

1. Follow the existing component patterns
2. Use Tailwind classes for styling
3. Ensure WCAG AA accessibility
4. Test on mobile and desktop
5. Keep components simple and reusable

## 📝 License

MIT - Feel free to use for personal and commercial projects

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies installation fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind styles not loading
- Ensure `tailwind.config.js` has correct content paths
- Check that `globals.css` is imported in `_app.jsx`
- Restart the development server

---

**Built with ❤️ for productivity**
