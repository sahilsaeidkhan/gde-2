import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { AppShell } from '../../components/layout/AppShell';
import { GitHubFeed } from '../../components/dashboard/GitHubFeed';
import { MeetingSummaries } from '../../components/dashboard/MeetingSummaries';
import { NotionIntegration } from '../../components/dashboard/NotionIntegration';
import { SyncIndicator } from '../../components/dashboard/SyncIndicator';

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
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-cyber-blue border-opacity-30 border-t-cyber-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cyber-grey-light">Loading SyncHub...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell title="Dashboard" onLogout={handleLogout}>
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-blue opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyber-blue opacity-3 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Bento Grid Layout */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {/* GitHub Feed - Large Card (Col 1-2, Row 1-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 row-span-2"
          >
            <GitHubFeed />
          </motion.div>

          {/* Quick Stats - Tall Card (Col 3, Row 1-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="row-span-2"
          >
            <QuickStats />
          </motion.div>

          {/* Google Meet - Medium Card (Col 1, Row 3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MeetingSummaries />
          </motion.div>

          {/* Notion Integration - Medium Card (Col 2-3, Row 3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <NotionIntegration />
          </motion.div>
        </div>

        {/* Sync Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
        >
          <SyncIndicator />
        </motion.div>
      </div>
    </AppShell>
  );
}
