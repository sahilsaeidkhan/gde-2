import { motion } from 'framer-motion';

export function SyncIndicator() {
  return (
    <div className="fixed bottom-8 right-8 z-40 group">
      {/* Pulse Animation Container */}
      <div className="relative w-12 h-12">
        {/* Outer Ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-cyber-blue rounded-full opacity-20"
        />

        {/* Main Dot */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="absolute inset-0 flex items-center justify-center bg-cyber-blue rounded-full hover:shadow-glow-blue transition-shadow"
          title="Background sync active"
        >
          <div className="w-2 h-2 bg-cyber-black rounded-full" />
        </motion.button>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-cyber-charcoal border border-cyber-blue rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg shadow-cyber-blue-glow"
        >
          <p className="text-cyber-blue">
            ✓ Real-time Sync
          </p>
          <p className="text-cyber-grey text-xs">Active</p>
        </motion.div>
      </div>
    </div>
  );
}
