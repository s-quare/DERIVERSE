import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const apiKey = process.env.HELIUS_API_KEY;

  if (!address) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${apiKey}`,
      { method: 'GET' }
    );

    if (!response.ok) throw new Error('Failed to fetch from Helius');

    const data = await response.json();

    // filter success
    const successfulTrades = data.filter((tx: any) => tx.description && !tx.error);

    return NextResponse.json(successfulTrades);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}