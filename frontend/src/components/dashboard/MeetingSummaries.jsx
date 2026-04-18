import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Video, ChevronRight } from 'lucide-react';

const mockMeetingSummaries = [
  {
    id: 1,
    title: 'Q1 Planning Session',
    summary: 'Discussed quarterly objectives and resource allocation. Team committed to launching 3 new features.',
    achievements: 'Finalized roadmap, assigned team leads',
    duration: '1h 30m',
    time: 'Today at 10:00 AM',
  },
  {
    id: 2,
    title: 'Backend Architecture Review',
    summary: 'Reviewed microservices implementation. Decided to migrate to event-driven architecture.',
    achievements: 'Architecture approved, timeline set',
    duration: '45m',
    time: 'Yesterday at 2:00 PM',
  },
  {
    id: 3,
    title: 'Client Presentation',
    summary: 'Presented new dashboard features. Client approved Phase 2 features and signed off on budget.',
    achievements: 'Client approval, Budget approved',
    duration: '2h',
    time: '2 days ago',
  },
];

export function MeetingSummaries() {
  return (
    <Card className="col-span-1 md:col-span-1 row-span-2">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Video className="w-5 h-5 text-synchub-blue" />
          Recent Summaries
        </h3>
        <p className="text-sm text-synchub-grey-light mt-1">AI-generated meeting insights</p>
      </div>

      <div className="space-y-4">
        {mockMeetingSummaries.map((meeting) => (
          <div
            key={meeting.id}
            className="p-4 bg-synchub-black bg-opacity-50 hover:bg-opacity-70 rounded-lg transition-colors group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-medium text-white group-hover:text-synchub-blue transition-colors">
                {meeting.title}
              </h4>
              <ChevronRight className="w-4 h-4 text-synchub-grey flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="serif text-sm text-synchub-grey-light leading-relaxed mb-3">
              {meeting.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="success" size="sm">
                ✓ {meeting.achievements}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-synchub-grey">
              <span>{meeting.duration}</span>
              <span>{meeting.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <button className="mt-6 w-full py-2 px-4 bg-synchub-card hover:bg-synchub-grey hover:bg-opacity-10 rounded-lg text-synchub-blue font-medium transition-colors">
        See All Meetings →
      </button>
    </Card>
  );
}
