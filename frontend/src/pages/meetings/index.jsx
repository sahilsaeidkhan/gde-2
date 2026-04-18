import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Video, Search, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

const mockMeetings = [
  {
    id: 1,
    title: 'Q1 Planning Session',
    date: '2024-01-15',
    duration: '1h 30m',
    summary: 'Discussed quarterly objectives and resource allocation.',
    achievements: ['Finalized roadmap', 'Assigned team leads'],
    blockers: ['Budget approval pending'],
    nextSteps: ['Submit budget proposal', 'Schedule resource meetings'],
  },
  {
    id: 2,
    title: 'Backend Architecture Review',
    date: '2024-01-14',
    duration: '45m',
    summary: 'Reviewed microservices implementation.',
    achievements: ['Architecture approved', 'Timeline set'],
    blockers: [],
    nextSteps: ['Begin implementation', 'Setup monitoring'],
  },
];

export default function Meetings() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/landing');
  };

  const filteredMeetings = mockMeetings.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell title="Meetings" onLogout={handleLogout}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Meeting History</h1>
        <p className="text-cyber-grey-light">All your meeting summaries and transcripts</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search meetings..."
          icon={Search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Meetings Grid */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => (
          <Card
            key={meeting.id}
            className="cursor-pointer"
            onClick={() => setExpandedId(expandedId === meeting.id ? null : meeting.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Video className="w-5 h-5 text-cyber-blue" />
                  <h3 className="text-lg font-bold text-white">{meeting.title}</h3>
                </div>
                <p className="text-sm text-cyber-grey-light">
                  {new Date(meeting.date).toLocaleDateString()} • {meeting.duration}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" icon={Download} />
                <Button variant="ghost" size="sm" icon={Trash2} />
              </div>
            </div>

            {/* Summary */}
            <p className="serif text-cyber-grey-light mb-4 leading-relaxed">
              {meeting.summary}
            </p>

            {/* Expandable Content */}
            {expandedId === meeting.id && (
              <div className="border-t border-cyber-grey-lighter border-opacity-20 pt-4 mt-4 space-y-4 animate-slide-down">
                {meeting.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">✓ Achievements</h4>
                    <ul className="space-y-1">
                      {meeting.achievements.map((item, i) => (
                        <li key={i} className="text-sm text-cyber-grey-light">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {meeting.blockers.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-400 mb-2">⚠️ Blockers</h4>
                    <ul className="space-y-1">
                      {meeting.blockers.map((item, i) => (
                        <li key={i} className="text-sm text-cyber-grey-light">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {meeting.nextSteps.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-cyber-blue mb-2">📋 Next Steps</h4>
                    <ul className="space-y-1">
                      {meeting.nextSteps.map((item, i) => (
                        <li key={i} className="text-sm text-cyber-grey-light">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-cyber-grey-light mb-4">No meetings found</p>
          <p className="text-sm text-cyber-grey">Try adjusting your search</p>
        </Card>
      )}
    </AppShell>
  );
}
