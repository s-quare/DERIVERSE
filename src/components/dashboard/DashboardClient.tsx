"use client";

import { useEffect, useState } from "react";
import { useTrades } from "@/hooks/useTrades";
import { usePrice } from "@/hooks/usePrice"; // New Hook
import { useWallet } from "@solana/wallet-adapter-react";
import { calculateStats } from "@/lib/analytics";
import StatCard from "@/components/dashboard/StatCard";
import PnLChart from "./PnLChart";
import TradeTable from "./TradeTable";
import TopTokens from "./TopTokens";
import FadeIn from "./FadeMotion";

export default function DashboardClient() {
  const { publicKey, connected } = useWallet();
  const [isMockMode, setIsMockMode] = useState(false);

  const displayAddress = isMockMode
    ? "2EZsc3KXSRusWxWnzEd7efQFcaxYpoh5LkwtvWohNKZB"
    : publicKey?.toBase58();

  const { data: trades, isLoading: tradesLoading } = useTrades(displayAddress);
  const { data: priceData, isLoading: priceLoading } = usePrice();

  const solPrice = priceData?.price ?? 0;
  const priceChange = priceData?.change ?? 0;

  const stats = calculateStats(trades || []);
  const usdFees = (stats.totalFees * solPrice).toFixed(2);

  useEffect(() => {
    if (connected) {
      setIsMockMode(false);
    }
  }, [connected]);

  return (
    <div className="space-y-10">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <FadeIn activeKey={"real"}>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Pro <span className="text-blue-500">Analytics</span>
            </h1>
            <p className="text-slate-400 mt-1">
              On-chain insights for the Deriverse ecosystem.
            </p>
          </FadeIn>

          <div
            title={
              isMockMode
                ? "Showing with demo data. Click to toggle"
                : "Showing linked account data. Click to use demo"
            }
            className="flex gap-2 items-center px-2 py-1 text-xs font-bold w-fit mt-10"
          >
            <span>Demo mode</span>
            <div
              className="bg-slate-800 cursor-pointer w-10 h-5 px-0.75 border rounded-full grid items-center transition-all duration-400"
              onClick={() => setIsMockMode((prev) => !prev)}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full  ${isMockMode ? "bg-blue-400 ml-auto" : "bg-gray-500"} transition-all duration-400`}
              ></div>
            </div>
          </div>
        </div>
        {solPrice && solPrice !== 0 && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 self-start">
            <span className="text-blue-400 text-sm font-bold">
              <span> SOL: ${solPrice}</span>
              <i
                className={`ml-2 bi ${priceChange >= 0 ? "text-green-500 bi-arrow-up" : "text-red-500 bi-arrow-down"}`}
              ></i>
              <span
                className={`text-[10px] ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {priceChange.toFixed(1)}%
              </span>
            </span>
          </div>
        )}
      </section>

      <FadeIn activeKey={isMockMode ? "demo" : "real"}>
        {!connected && !isMockMode && (
          <div className="flex h-64 px-10 w-full max-w-150 mx-auto text-center items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 ">
            <p className="text-slate-500">
              Connect your wallet to view analysis, or switch to demo mode for a
              preview with sample data.
            </p>
          </div>
        )}
      </FadeIn>

      <FadeIn activeKey={isMockMode ? "demo" : "real"}>
        {(connected || isMockMode) && (
          <div className="space-y-10">
            <p className="text-base text-center font-mono font-bold">
              Showing {isMockMode ? "Mock" : "Real-time Account"} Analysis
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Total Trades"
                value={stats.totalTrades}
                loading={tradesLoading}
              />
              <StatCard
                label="Win Rate"
                value={`${stats.winRate}%`}
                trend={2.4}
                loading={tradesLoading}
              />
              <StatCard
                label="Total Fees"
                value={`$${usdFees}`}
                loading={tradesLoading || priceLoading}
              />
              <StatCard
                label="Avg Duration"
                value={stats.avgDuration}
                loading={tradesLoading}
              />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <PnLChart />
              </div>
              <div className="space-y-6">
                <TopTokens trades={trades || []} />

                <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-4">
                  <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">
                    Terminal Status
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-slate-400">
                      Live Mainnet Feed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <TradeTable trades={trades || []} isLoading={tradesLoading} />
          </div>
        )}
      </FadeIn>
    </div>
  );
}
