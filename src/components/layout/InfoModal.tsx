"use client";
import { useState, useEffect } from "react";

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-1 text-slate-400 hover:text-white transition-colors mr-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    );

  return (
    <div className="fixed top-0 right-0 left-0 bg-black min-h-svh overflow-y-auto no-scrollbar inset-0 z-100 flex items-center justify-center p-4 transition-all">
      {/* Content */}
      <div className="relative w-full max-w-lg bg-slate-900/50 border border-slate-800 rounded-3xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-8">
          Connect to Deriverse
        </h2>

        <div className="space-y-6 text-left">
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              1
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong className="text-white block">Install a Wallet</strong>
              Download <span className="text-blue-400">Phantom</span> or{" "}
              <span className="text-blue-400">Solflare</span> browser extension.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              2
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong className="text-white block">Authorize Connection</strong>
              Click the "Select Wallet" button in the top right and approve the
              request.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              3
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong className="text-white block">Mainnet Only</strong>
              Ensure your wallet is set to{" "}
              <span className="text-purple-400 italic">Solana Mainnet</span> to
              see your real trade history.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              4
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong className="text-white block">Demo Mode</strong>
              You can switch to demo mode using the toggle on the dashboard if you want to see how it works without connecting a wallet.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-12 w-fit px-15 mx-auto block py-2 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
