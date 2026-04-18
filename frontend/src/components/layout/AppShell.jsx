import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell({ children, title = 'SyncHub', onLogout = () => {} }) {
  return (
    <div className="min-h-screen bg-synchub-black">
      <Sidebar />
      <Header title={title} onLogout={onLogout} />

      {/* Main Content */}
      <main className="pt-16 lg:ml-64 pb-8">
        <div className="px-4 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
