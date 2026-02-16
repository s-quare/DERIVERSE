import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true'
    );
    const data = await res.json();
    return NextResponse.json({ price: data.solana.usd, change: data.solana.usd_24h_change });
  } catch (error) {
    return NextResponse.json({ price: 0, change: 0 }, { status: 500 });
  }
}