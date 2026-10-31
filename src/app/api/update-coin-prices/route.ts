import { NextResponse } from 'next/server';
import axios from 'axios';
import { COIN_SYMBOLS, CoinPrices, saveCoinPrices } from '@/lib/coin-prices';

// POST - Fetch latest coin prices and upsert the shared MongoDB snapshot.
export async function POST() {
  try {
    if (!process.env.COINAPI_KEY) {
      throw new Error('COINAPI_KEY is not configured');
    }
    const { data } = await axios.get(
      `https://rest.coinapi.io/v1/assets?filter_asset_id=${COIN_SYMBOLS.join(',')}`,
      {
        timeout: 15000,
        headers: {
          'X-CoinAPI-Key': process.env.COINAPI_KEY,
        },
      }
    );

    if (!Array.isArray(data)) {
      throw new Error('Invalid CoinAPI response');
    }
    const coinPrices: CoinPrices = {};
    for (const coin of data) {
      if (coin && COIN_SYMBOLS.includes(coin.asset_id)) {
        coinPrices[coin.asset_id] = coin;
      }
    }
    await saveCoinPrices(coinPrices);

    return NextResponse.json({ message: 'success', data: coinPrices }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating coin prices:', error.message);
    return NextResponse.json({ message: 'failure', error: error.message }, { status: 500 });
  }
}
