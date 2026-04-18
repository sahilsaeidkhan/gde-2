import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Video, ChevronRight } from 'lucide-react';

const mockMeetingSummaries = [
  {
    id: 1,
    title: 'Q1 Planning',
    summary: 'Discussed quarterly objectives and resource allocation.',
    achievements: '3 new features',
    duration: '1h 30m',
    time: 'Today',
  },
  {
    id: 2,
    title: 'Architecture Review',
    summary: 'Reviewed microservices. Approved event-driven architecture.',
    achievements: 'Architecture approved',
    duration: '45m',
    time: 'Yesterday',
  },
  {
    id: 3,
    title: 'Client Presentation',
    summary: 'Presented dashboard features and Phase 2 roadmap.',
    achievements: 'Client approved',
    duration: '2h',
    time: '2 days ago',
  },
];

export function MeetingSummaries() {
  return (
    <Card className="h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Video className="w-5 h-5 text-cyber-blue" />
          Meet Summaries
        </h3>
        <p className="text-sm text-cyber-grey-light mt-1">AI-generated insights</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {mockMeetingSummaries.map((meeting, idx) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-3 bg-cyber-charcoal/50 hover:bg-cyber-blue hover:bg-opacity-10 rounded-lg transition-colors group cursor-pointer border border-cyber-blue border-opacity-10 hover:border-opacity-30"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-medium text-white group-hover:text-cyber-blue transition-colors text-sm">
                {meeting.title}
              </h4>
              <ChevronRight className="w-4 h-4 text-cyber-grey flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="serif text-xs text-cyber-grey-light leading-relaxed mb-2">
              {meeting.summary}
            </p>

            <div className="flex items-center justify-between text-xs text-cyber-grey">
              <span className="px-2 py-0.5 bg-cyber-blue bg-opacity-10 text-cyber-blue rounded">
                {meeting.achievements}
              </span>
              <span>{meeting.time}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full py-2 px-4 bg-cyber-blue bg-opacity-10 hover:bg-opacity-20 rounded-lg text-cyber-blue font-medium transition-colors border border-cyber-blue border-opacity-20"
      >
        Sync Meet →
      </motion.button>
    </Card>
  );
}
