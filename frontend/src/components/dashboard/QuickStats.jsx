import { Card } from '../ui/Card';
import { TrendingUp, Clock, GitCommit } from 'lucide-react';

const stats = [
  {
    label: 'Commits Today',
    value: '12',
    icon: GitCommit,
    trend: '+3 from yesterday',
    color: 'text-synchub-blue',
  },
  {
    label: 'Meeting Time',
    value: '4h 30m',
    icon: Clock,
    trend: 'On track',
    color: 'text-green-400',
  },
  {
    label: 'Productivity',
    value: '94%',
    icon: TrendingUp,
    trend: 'Excellent',
    color: 'text-amber-400',
  },
];

export function QuickStats() {
  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="col-span-1 row-span-1 flex flex-col items-center justify-center text-center"
          >
            <Icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <p className="text-sm text-synchub-grey-light mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-xs text-synchub-grey">{stat.trend}</p>
          </Card>
        );
      })}
    </>
  );
}
