import { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import clsx from 'clsx';

export function Header({ title = 'SyncHub', onLogout = () => {} }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-synchub-card border-b border-synchub-grey-lighter border-opacity-20 glass z-20">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Title/Breadcrumb */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Sync Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-synchub-blue rounded-full animate-pulse-blue" />
            <span className="text-xs text-synchub-grey-light hidden sm:inline">
              Syncing...
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 hover:bg-synchub-grey hover:bg-opacity-20 rounded-md transition-colors"
              aria-label="User menu"
            >
              <User size={20} className="text-synchub-blue" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-synchub-card border border-synchub-grey-lighter border-opacity-30 rounded-lg shadow-xl animate-slide-down">
                <div className="p-4 border-b border-synchub-grey-lighter border-opacity-20">
                  <p className="text-sm text-synchub-grey-light">Signed in as</p>
                  <p className="font-medium text-white">Your Account</p>
                </div>
                <div className="p-2 space-y-1">
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-synchub-grey hover:bg-opacity-20 rounded transition-colors text-left text-sm"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-500 hover:bg-opacity-20 rounded transition-colors text-left text-sm text-red-400"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
