"use client";

import { useQuery } from '@tanstack/react-query';
import { useWallet } from '@solana/wallet-adapter-react';


export function useTrades(customAddress?: string) {

    const context = useWallet();
  
  const activeAddress = customAddress || (context?.publicKey ? context.publicKey.toBase58() : null);

  return useQuery({
    queryKey: ['trades', activeAddress],
    queryFn: async () => {
      if (!activeAddress) return [];
      
      const res = await fetch(`/api/trades?address=${activeAddress}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch trades');
      }
      
      return res.json();
    },

    enabled: !!activeAddress,
    staleTime: 60000, // 1 minute cache
  });
}