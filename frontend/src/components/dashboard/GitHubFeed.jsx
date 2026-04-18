import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';
import { useState, useEffect } from 'react';

async function fetchGitHubActivity(token) {
  // This would normally use the GitHub API with the user's token
  // For now, return mock data
  return [
    {
      id: 1,
      type: 'commit',
      message: 'feat: Add glassmorphism effects to dashboard',
      repo: 'synchub/frontend',
      time: '30 min ago',
    },
    {
      id: 2,
      type: 'pr',
      message: 'pr: Merge feature/tailwind-migration (1,245 additions, 523 deletions)',
      repo: 'synchub/frontend',
      time: '2 hours ago',
    },
    {
      id: 3,
      type: 'commit',
      message: 'refactor: Optimize component rendering performance',
      repo: 'synchub/backend',
      time: '4 hours ago',
    },
    {
      id: 4,
      type: 'commit',
      message: 'docs: Update API documentation for new endpoints',
      repo: 'synchub/docs',
      time: '6 hours ago',
    },
    {
      id: 5,
      type: 'pr',
      message: 'pr: Update dependencies and security patches',
      repo: 'synchub/infrastructure',
      time: '1 day ago',
    },
  ];
}

function getIcon(type) {
  switch (type) {
    case 'commit':
      return <GitCommit className="w-4 h-4 text-cyber-blue" />;
    case 'pr':
      return <GitPullRequest className="w-4 h-4 text-green-400" />;
    case 'branch':
      return <GitBranch className="w-4 h-4 text-purple-400" />;
    default:
      return <GitCommit className="w-4 h-4 text-cyber-blue" />;
  }
}

export function GitHubFeed() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('token');
      const data = await fetchGitHubActivity(token);
      setActivities(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <Card className="h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <GitBranch className="w-5 h-5 text-cyber-blue" />
          GitHub Activity
        </h3>
        <p className="text-sm text-cyber-grey-light mt-1">Last 7 days commits & PRs</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex gap-3 p-3 hover:bg-cyber-blue hover:bg-opacity-10 rounded-lg transition-colors group"
          >
            <div className="flex-shrink-0 mt-1">
              {getIcon(activity.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <code className="monospace text-sm text-cyber-blue font-medium break-words group-hover:text-cyan-300 transition-colors">
                  {activity.message}
                </code>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="px-2 py-1 bg-cyber-blue bg-opacity-10 text-cyber-blue rounded">
                  {activity.repo}
                </span>
                <span className="text-cyber-grey">{activity.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full py-2 px-4 bg-cyber-blue bg-opacity-10 hover:bg-opacity-20 rounded-lg text-cyber-blue font-medium transition-colors border border-cyber-blue border-opacity-20"
      >
        Generate Summary →
      </motion.button>
    </Card>
  );
}
