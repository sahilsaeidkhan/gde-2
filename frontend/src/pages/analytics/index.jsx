import { useRouter } from 'next/router';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BarChart3, TrendingUp, Clock, GitCommit } from 'lucide-react';

const mockAnalytics = [
  {
    icon: GitCommit,
    label: 'Total Commits',
    value: '156',
    trend: '+12% this week',
    color: 'text-synchub-blue',
  },
  {
    icon: Clock,
    label: 'Meeting Hours',
    value: '28.5h',
    trend: '+2 hours this week',
    color: 'text-green-400',
  },
  {
    icon: TrendingUp,
    label: 'Productivity Score',
    value: '92%',
    trend: 'Excellent performance',
    color: 'text-amber-400',
  },
  {
    icon: BarChart3,
    label: 'Lines of Code',
    value: '12,482',
    trend: '+3,245 this week',
    color: 'text-purple-400',
  },
];

const weeklyData = [
  { day: 'Mon', commits: 12, meetings: 4.5 },
  { day: 'Tue', commits: 18, meetings: 3.0 },
  { day: 'Wed', commits: 14, meetings: 6.5 },
  { day: 'Thu', commits: 22, meetings: 2.0 },
  { day: 'Fri', commits: 16, meetings: 5.0 },
  { day: 'Sat', commits: 5, meetings: 0 },
  { day: 'Sun', commits: 3, meetings: 0 },
];

export default function Analytics() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/landing');
  };

  return (
    <AppShell title="Analytics" onLogout={handleLogout}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Productivity Analytics</h1>
        <p className="text-synchub-grey-light">Your performance metrics and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockAnalytics.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="flex flex-col items-start">
              <Icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <p className="text-sm text-synchub-grey-light mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-xs text-synchub-grey">{stat.trend}</p>
            </Card>
          );
        })}
      </div>

      {/* Weekly Activity Chart */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-synchub-blue" />
          Weekly Activity
        </h3>

        <div className="space-y-6">
          {/* Commits Chart */}
          <div>
            <p className="text-sm font-medium mb-3">Commits by Day</p>
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyData.map((data, index) => {
                const maxCommits = Math.max(...weeklyData.map(d => d.commits));
                const height = (data.commits / maxCommits) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-synchub-blue to-synchub-blue-light rounded-t"
                      style={{ height: `${height}%`, minHeight: '8px' }}
                    />
                    <p className="text-xs text-synchub-grey-light mt-2">{data.day}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meeting Hours Chart */}
          <div>
            <p className="text-sm font-medium mb-3">Meeting Hours by Day</p>
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyData.map((data, index) => {
                const maxMeetings = Math.max(...weeklyData.map(d => d.meetings));
                const height = (data.meetings / maxMeetings) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                      style={{ height: `${height || 2}%`, minHeight: '2px' }}
                    />
                    <p className="text-xs text-synchub-grey-light mt-2">{data.day}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Insights */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-synchub-blue" />
          Key Insights
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="success">+12%</Badge>
            <p className="text-sm text-synchub-grey-light">
              Your commit activity increased this week. Thursday was your most productive day.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Badge variant="blue">⏱️</Badge>
            <p className="text-sm text-synchub-grey-light">
              You spent 28.5 hours in meetings this week. Consider blocking focus time.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Badge variant="success">✓</Badge>
            <p className="text-sm text-synchub-grey-light">
              Your productivity score of 92% is excellent. Keep up the great work!
            </p>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
