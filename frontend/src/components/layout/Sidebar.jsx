import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, LayoutDashboard, Calendar, FileText, Settings, BarChart3 } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Meetings', href: '/meetings', icon: Calendar },
  { label: 'Standups', href: '/standups', icon: FileText },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const isActive = (href) => router.pathname === href;

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-synchub-card rounded-md transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={clsx(
          'fixed left-0 top-0 h-screen bg-synchub-card border-r border-synchub-grey-lighter border-opacity-20',
          'transition-all duration-300 z-30',
          isCollapsed ? 'w-20' : 'w-64',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={clsx(
          'flex items-center justify-between p-6 border-b border-synchub-grey-lighter border-opacity-20',
          isCollapsed && 'justify-center'
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-synchub-blue rounded-lg flex items-center justify-center font-bold">
                S
              </div>
              <span className="font-bold text-lg">SyncHub</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-2 hover:bg-synchub-grey-lighter hover:bg-opacity-20 rounded-md transition-colors"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="mt-8 space-y-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                  active
                    ? 'bg-synchub-blue text-white shadow-glow-blue'
                    : 'text-synchub-grey-light hover:bg-synchub-black hover:bg-opacity-50'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Spacer */}
      <div className={clsx('transition-all duration-300', isCollapsed ? 'lg:ml-20' : 'lg:ml-64')} />
    </>
  );
}
