import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import ClientWalletWrapper from "@/components/providers/ClientWalletWrapper"; 
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deriverse Analytics | Pro Trading Dashboard",
  description:
    "Advanced on-chain trading journal and portfolio analysis for Solana traders.",
  openGraph: {
    title: "Deriverse Analytics Pro",
    description: "Fully on-chain portfolio tracking",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-black text-slate-50 antialiased ${inter.className}`}
      >
        <ClientWalletWrapper>
          <div className="relative flex min-h-screen flex-col max-w-300 mx-auto">
            <Navbar />
            <main className="flex-1 mx-auto px-4 sm:px-10 md:px-14 py-8 w-full">
              {children}
            </main>
          </div>
        </ClientWalletWrapper>
      </body>
    </html>
  );
}
