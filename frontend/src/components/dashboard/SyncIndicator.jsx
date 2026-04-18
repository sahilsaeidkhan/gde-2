export function SyncIndicator() {
  return (
    <div className="fixed bottom-8 right-8 z-40 group">
      {/* Pulse Animation Container */}
      <div className="relative w-12 h-12">
        {/* Outer Ring */}
        <div className="absolute inset-0 bg-synchub-blue rounded-full opacity-20 animate-pulse-blue" />

        {/* Main Dot */}
        <button
          className="absolute inset-0 flex items-center justify-center bg-synchub-blue rounded-full hover:shadow-glow-blue transition-shadow"
          title="Background sync active"
        >
          <div className="w-2 h-2 bg-synchub-black rounded-full" />
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-synchub-card border border-synchub-blue rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          <p className="text-synchub-blue-light">
            ✓ Background sync active
          </p>
          <p className="text-synchub-grey text-xs">Real-time updates</p>
        </div>
      </div>
    </div>
  );
}
