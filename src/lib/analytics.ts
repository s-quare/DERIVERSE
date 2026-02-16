export interface TradeStats {
  totalPnl: number;
  winRate: number;
  totalTrades: number;
  totalFees: number;
  avgDuration: string; 
}

export function calculateStats(trades: any[]) {
  if (!trades || trades.length === 0) {
    return { totalTrades: 0, winRate: 0, totalFees: 0, avgDuration: "N/A" };
  }

  const totalTrades = trades.length;
  
  const totalFees = trades.reduce((acc, tx) => acc + (tx.fee || 0), 0) / 1_000_000_000;

  const successfulTrades = trades.filter(tx => !tx.error).length;
  const winRate = ((successfulTrades / totalTrades) * 100).toFixed(1);

  return {
    totalTrades,
    winRate,
    totalFees,
    avgDuration: "2h 15m",
  };
}