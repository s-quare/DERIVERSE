"use client";

interface Trade {
  description: string;
}

export default function TopTokens({ trades }: { trades: Trade[] }) {
  // Logic: Extract the first word (token name) from descriptions and count them
  const tokenCounts = (trades || []).reduce((acc: Record<string, number>, tx) => {
    const symbol = tx.description.split(' ')[0] || "Unknown";
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {});

  const sortedTokens = Object.entries(tokenCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4); // Top 4

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
      <h3 className="font-semibold mb-4 text-slate-200">Most Traded Assets</h3>
      <div className="space-y-4">
        {sortedTokens.length > 0 ? (
          sortedTokens.map(([symbol, count]) => (
            <div key={symbol} className="grid grid-cols-[1fr_auto] gap-2 items-center justify-between">
              <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-sm font-medium text-slate-300 truncate">{symbol}</span>
              </div>
              <span className="text-xs font-bold text-slate-500">{count} Trade{count > 1 ? 's' : ''}</span>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-600 italic">No data available</p>
        )}
      </div>
    </div>
  );
}