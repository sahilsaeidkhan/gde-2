import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { BookOpen, CheckCircle2, Copy } from 'lucide-react';

export function NotionIntegration() {
  const handleSyncToNotion = () => {
    alert('Notion sync feature coming soon!');
  };

  return (
    <Card className="h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <BookOpen className="w-5 h-5 text-cyber-blue" />
          Notion Integration
        </h3>
        <p className="text-sm text-cyber-grey-light mt-1">Auto-sync standups & summaries</p>
      </div>

      <div className="space-y-4">
        {/* Feature List */}
        <div className="space-y-3">
          {[
            'Auto-generate weekly reports',
            'Sync GitHub activity',
            'Meeting summaries',
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 p-2"
            >
              <CheckCircle2 className="w-4 h-4 text-cyber-blue flex-shrink-0" />
              <span className="text-sm text-cyber-grey-light">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <div className="p-3 bg-cyber-charcoal/50 border border-cyber-blue border-opacity-10 rounded-lg mt-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" />
            <p className="text-xs text-cyber-blue">Connected</p>
          </div>
          <p className="text-xs text-cyber-grey-light">
            Last synced 2 hours ago
          </p>
        </div>
      </div>

      {/* Sync Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSyncToNotion}
        className="mt-6 w-full py-2 px-4 bg-cyber-blue bg-opacity-10 hover:bg-opacity-20 rounded-lg text-cyber-blue font-medium transition-colors border border-cyber-blue border-opacity-20 flex items-center justify-center gap-2"
      >
        <Copy className="w-4 h-4" />
        Sync to Notion →
      </motion.button>
    </Card>
  );
}
