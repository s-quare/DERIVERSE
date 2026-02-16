"use client";

import dynamic from "next/dynamic";
import InfoModal from "./InfoModal";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-linear-to-b from-white/10 to-transparent backdrop-blur-xl">
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-4"
        aria-label="Main Navigation"
      >
        <h2 className="text-base sm:text-xl font-sans font-bold tracking-tight text-white">
          DERIVERSE<span className="text-blue-500">Analytics</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="scale-70 md:scale-90 transition-all">
            <WalletMultiButton />
          </div>
          <InfoModal />
        </div>
      </nav>
    </header>
  );
}
