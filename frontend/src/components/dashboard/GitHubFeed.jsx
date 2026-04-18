import { Card } from '../ui/Card';
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';

const mockGitHubActivity = [
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

function getIcon(type) {
  switch (type) {
    case 'commit':
      return <GitCommit className="w-4 h-4 text-synchub-blue" />;
    case 'pr':
      return <GitPullRequest className="w-4 h-4 text-green-400" />;
    case 'branch':
      return <GitBranch className="w-4 h-4 text-purple-400" />;
    default:
      return <GitCommit className="w-4 h-4 text-synchub-blue" />;
  }
}

export function GitHubFeed() {
  return (
    <Card className="col-span-1 md:col-span-2 row-span-2">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-synchub-blue" />
          Recent Activity
        </h3>
        <p className="text-sm text-synchub-grey-light mt-1">Your GitHub contribution stream</p>
      </div>

      <div className="space-y-4">
        {mockGitHubActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3 p-3 hover:bg-synchub-black hover:bg-opacity-50 rounded-lg transition-colors group"
          >
            <div className="flex-shrink-0 mt-1">
              {getIcon(activity.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <code className="monospace text-sm text-synchub-blue-light font-medium break-words group-hover:text-synchub-blue transition-colors">
                  {activity.message}
                </code>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="px-2 py-1 bg-synchub-blue bg-opacity-20 text-synchub-blue rounded">
                  {activity.repo}
                </span>
                <span className="text-synchub-grey">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="mt-6 w-full py-2 px-4 bg-synchub-card hover:bg-synchub-grey hover:bg-opacity-10 rounded-lg text-synchub-blue font-medium transition-colors">
        View All Activity →
      </button>
    </Card>
  );
}
