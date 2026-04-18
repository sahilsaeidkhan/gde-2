import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppShell } from '../components/layout/AppShell';
import { GitHubFeed } from '../components/dashboard/GitHubFeed';
import { MeetingSummaries } from '../components/dashboard/MeetingSummaries';
import { QuickStats } from '../components/dashboard/QuickStats';
import { SyncIndicator } from '../components/dashboard/SyncIndicator';

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      setIsAuthenticated(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    } else {
      router.push('/landing');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/landing');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-synchub-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-synchub-blue border-opacity-30 border-t-synchub-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-synchub-grey-light">Loading SyncHub...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell title="Dashboard" onLogout={handleLogout}>
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        <GitHubFeed />
        <MeetingSummaries />
        <QuickStats />
      </div>

      {/* Sync Indicator */}
      <SyncIndicator />
    </AppShell>
  );
}
