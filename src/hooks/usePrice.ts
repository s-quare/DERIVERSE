import { useQuery } from '@tanstack/react-query';

interface PriceData {
  price: number;
  change: number;
}

export function usePrice() {
  return useQuery<PriceData>({
    queryKey: ['sol-price'],
    queryFn: async () => {
      const res = await fetch('/api/price');
      if (!res.ok) throw new Error("Price fetch failed");
      return res.json(); 
    },
    refetchInterval: 60000, //60mins refresh
  });
}