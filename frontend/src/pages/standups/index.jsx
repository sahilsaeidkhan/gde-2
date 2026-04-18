import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Copy, Share2, Download } from 'lucide-react';

const mockStandups = [
  {
    date: '2024-01-15',
    dayOfWeek: 'Monday',
    content: `# Daily Standup - Monday, January 15

## Completed Yesterday
- Implemented glassmorphism effects on dashboard
- Merged Tailwind CSS migration (1,245 additions)
- Fixed authentication flow issues
- Completed 12 GitHub commits

## Meeting Summaries
- Q1 Planning Session: Finalized roadmap and assigned team leads
- Budget approved for Q1 initiatives

## Today's Focus
- Build remaining dashboard components
- Complete API integration tests
- Review code submissions from team

## Blockers
- Budget approval pending for new tooling
- Waiting on design system finalization`,
  },
  {
    date: '2024-01-14',
    dayOfWeek: 'Sunday',
    content: `# Daily Standup - Sunday, January 14

## Completed Yesterday
- Architecture review completed
- 8 commits pushed to backend
- Meeting with stakeholders

## Today's Focus
- Backend implementation
- Performance optimization

## Blockers
- None`,
  },
];

export default function Standups() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/landing');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <AppShell title="Standups" onLogout={handleLogout}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Daily Standups</h1>
        <p className="text-cyber-grey-light">Auto-generated from your GitHub activity and meetings</p>
      </div>

      {/* Standups */}
      <div className="space-y-6">
        {mockStandups.map((standup, index) => (
          <Card key={index} className="overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-cyber-grey-lighter border-opacity-20">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyber-blue" />
                  {standup.dayOfWeek}
                </h3>
                <p className="text-sm text-cyber-grey-light mt-1">
                  {new Date(standup.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Copy}
                  onClick={() => handleCopy(standup.content)}
                  title="Copy to clipboard"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Download}
                  title="Download as PDF"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Share2}
                  title="Share"
                />
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <pre className="monospace text-sm text-cyber-grey-light leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
                {standup.content}
              </pre>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
