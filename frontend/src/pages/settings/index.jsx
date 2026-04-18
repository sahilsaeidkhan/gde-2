import { useRouter } from 'next/router';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Settings, Bell, Lock, Zap, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState('user@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/landing');
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  return (
    <AppShell title="Settings" onLogout={handleLogout}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-cyber-grey-light">Manage your SyncHub preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 max-w-2xl">
        {/* Account Settings */}
        <Card>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyber-blue" />
            Account
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Google Account</p>
                <p className="text-sm text-cyber-grey-light">Connected via OAuth</p>
              </div>
              <Badge variant="success">✓ Connected</Badge>
            </div>

            <Button variant="secondary" className="w-full">
              Change Password
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyber-blue" />
            Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-cyber-grey-light">Get daily standup reminders</p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Meeting Summaries</p>
                <p className="text-sm text-cyber-grey-light">Notify when new summaries are ready</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-cyber-grey-light">Send weekly productivity reports</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </Card>

        {/* Integrations */}
        <Card>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyber-blue" />
            Integrations
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-sm text-cyber-grey-light">Auto-sync your activity</p>
              </div>
              <Badge variant="success">✓ Enabled</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Google Meet</p>
                <p className="text-sm text-cyber-grey-light">Capture meeting summaries</p>
              </div>
              <Badge variant="success">✓ Enabled</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Slack</p>
                <p className="text-sm text-cyber-grey-light">Send daily standups to Slack</p>
              </div>
              <Button variant="ghost" size="sm">Connect</Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-500 border-opacity-30">
          <h3 className="text-xl font-bold mb-6 text-red-400">Danger Zone</h3>

          <div className="space-y-3">
            <div>
              <p className="font-medium mb-2">Delete Account</p>
              <p className="text-sm text-cyber-grey-light mb-4">
                Permanently delete your account and all associated data
              </p>
              <Button variant="danger" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex gap-3">
          <Button variant="primary" onClick={handleSaveSettings}>
            Save Changes
          </Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </div>
    </AppShell>
  );
}
