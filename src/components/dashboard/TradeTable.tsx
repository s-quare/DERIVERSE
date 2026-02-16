"use client";

import { useState } from "react";

const exportToCSV = (trades: any[]) => {
  if (!trades.length) return;

  // Define headers
  const headers = ["Type,Description,Timestamp,Status\n"];

  // Format rows
  const rows = trades.map((tx) => {
    const date = new Date(tx.timestamp * 1000)
      .toLocaleString()
      .replace(/,/g, ""); // Remove commas to not break CSV
    return `${tx.type},${tx.description},${date},Success`;
  });

  const csvContent = headers.concat(rows.map((r) => r + "\n")).join("");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `deriverse_trades_${Date.now()}.csv`);
  link.click();
};

interface TradeTableProps {
  trades: any[];
  isLoading: boolean;
}

export default function TradeTable({ trades, isLoading }: TradeTableProps) {
  const [displayLimit, setDisplayLimit] = useState(10);
  const hasMore = trades.length > displayLimit;
  const visibleTrades = trades.slice(0, displayLimit);


  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 10);
  };

  return (
    <section className="relative rounded-xl border border-slate-800 bg-slate-900/30 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
        <div>
          <h3 className="text-lg font-semibold text-slate-200">
            Recent Transactions
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Showing {visibleTrades.length} of {trades.length} activities
          </p>
        </div>
        <button
          onClick={() => exportToCSV(trades)}
          className="text-[10px] uppercase font-bold tracking-widest bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded border border-slate-700 transition-all text-slate-400 hover:text-white"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800/50 text-slate-400 uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Timestamp</th>
              <th className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {isLoading ? (
              // Loading 
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td
                    colSpan={4}
                    className="px-6 py-4 bg-slate-800/5 h-12"
                  ></td>
                </tr>
              ))
            ) : visibleTrades.length === 0 ? (
              // Empty State
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-slate-500 italic"
                >
                  No trade history found for this address.
                </td>
              </tr>
            ) : (
              visibleTrades.map((tx) => (
                <tr
                  key={tx.signature}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="rounded bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-400 border border-blue-500/20">
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="grid grid-cols-[1fr_auto] w-30 sm:w-50 l gap-1">
                      <a
                        href={`https://solscan.io/tx/${tx.signature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 hover:underline flex items-center gap-2 overflow-x-auto no-scrollbar truncate"
                      >
                        {tx.description}
                      </a>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(tx.signature)
                        }
                        className="text-slate-500 p-0.5 hover:text-white transition-colors"
                        title="Copy Signature"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs font-mono">
                    {new Date(tx.timestamp * 1000).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right min-w-30">
                    <span className="text-green-500/80 text-[10px] font-bold">
                      ● SUCCESS
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*for load more */}
      {hasMore && (
        <div className="sticky bottom-0 left-0 right-0 p-6 bg-linear-to-t from-slate-950 via-slate-900/90 to-transparent flex justify-center border-t border-slate-800/30 backdrop-blur-sm">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-8 py-2.5 rounded-full shadow-xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95"
          >
            Load More Activity
          </button>
        </div>
      )}
    </section>
  );
}
