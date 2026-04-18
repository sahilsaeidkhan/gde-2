import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { GitCommit, TrendingUp, Zap } from 'lucide-react';

const stats = [
  {
    label: 'Commits',
    value: '24',
    change: '+12%',
    icon: GitCommit,
    color: 'cyber-blue',
  },
  {
    label: 'PRs Merged',
    value: '8',
    change: '+3',
    icon: TrendingUp,
    color: 'green-400',
  },
  {
    label: 'Productivity',
    value: '94%',
    change: '↑ 5%',
    icon: Zap,
    color: 'yellow-400',
  },
];

export function QuickStats() {
  return (
    <Card className="h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">
          Weekly Stats
        </h3>
        <p className="text-sm text-cyber-grey-light mt-1">Your productivity metrics</p>
      </div>

      <div className="space-y-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-3 bg-cyber-charcoal/50 hover:bg-cyber-blue hover:bg-opacity-10 rounded-lg transition-colors border border-cyber-blue border-opacity-10 hover:border-opacity-30"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-cyber-blue" />
                <div>
                  <p className="text-sm text-cyber-grey-light">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              </div>
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 + 0.1 }}
                className="text-sm font-semibold text-cyber-blue"
              >
                {stat.change}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* View Details */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full py-2 px-4 bg-cyber-blue bg-opacity-10 hover:bg-opacity-20 rounded-lg text-cyber-blue font-medium transition-colors border border-cyber-blue border-opacity-20"
      >
        View Analytics →
      </motion.button>
    </Card>
  );
}
