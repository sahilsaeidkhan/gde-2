import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowRight, Zap, BarChart3, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Landing() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleGoogleAuth = () => {
    setIsLoading(true);
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time sync of your GitHub activity and meeting summaries',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Deep insights into your productivity and meeting patterns',
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Automatic tracking of commits, PRs, and meeting time',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-synchub-black via-synchub-black to-synchub-card flex flex-col">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-synchub-grey-lighter border-opacity-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-synchub-blue rounded-lg flex items-center justify-center font-bold">
            S
          </div>
          <span className="font-bold text-xl text-white">SyncHub</span>
        </div>
        <div className="text-sm text-synchub-grey-light">Your productivity command center</div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl animate-fade-in">
          {/* Floating Badge */}
          <div className="inline-block mb-6 px-4 py-2 bg-synchub-blue-glow border border-synchub-blue border-opacity-30 rounded-full">
            <span className="text-sm text-synchub-blue font-medium">✨ AI-Powered Productivity</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Daily Standup,
            <br />
            <span className="text-gradient">Automatically Generated</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-synchub-grey-light mb-12 leading-relaxed">
            Combine your GitHub commits, pull requests, and Google Meet summaries into one beautiful dashboard.
            Get actionable insights without lifting a finger.
          </p>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="mb-12 group"
            icon={isLoading ? undefined : ArrowRight}
          >
            {isLoading ? 'Connecting...' : 'Get Started with Google'}
          </Button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 text-xs text-synchub-grey-light">
            <div>🔒 OAuth 2.0</div>
            <div>⚡ Zero Setup</div>
            <div>📊 Real-time Sync</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-synchub-grey-lighter border-opacity-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-card p-8 hover:scale-105 transition-transform duration-300"
                >
                  <Icon className="w-12 h-12 text-synchub-blue mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-synchub-grey-light">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-synchub-grey-lighter border-opacity-10 py-8 px-4 text-center text-sm text-synchub-grey-light">
        <p>SyncHub © 2024. Built for productivity.</p>
      </div>
    </div>
  );
}
