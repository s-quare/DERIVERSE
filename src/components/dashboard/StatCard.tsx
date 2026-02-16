interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  loading?: boolean;
}

export default function StatCard({ label, value, trend, loading }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700">
      <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-bold">
          {loading ? <span className="animate-pulse">...</span> : value}
        </p>
        {trend !== undefined && !loading && (
          <span className={`text-xs font-bold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}