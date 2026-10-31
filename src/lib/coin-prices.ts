import 'server-only';

import mongoose from 'mongoose';
import dbConnect from '@/utils/dbConnect';
import bundledPrices from '../../public/coinData.json';

export const COIN_SYMBOLS = ['BTC', 'USDT', 'ETH', 'XRP', 'DOGE'] as const;
export interface CoinPrice {
  asset_id: string;
  price_usd: number;
  [key: string]: unknown;
}
export type CoinPrices = Record<string, CoinPrice>;

interface Snapshot {
  _id: string;
  prices: CoinPrices;
  updatedAt: Date;
}

async function getCollection() {
  await dbConnect();
  const database = mongoose.connection.db;
  if (!database) throw new Error('MongoDB connection is unavailable');
  return database.collection<Snapshot>('coinpricesnapshots');
}
const SNAPSHOT_ID = 'coinapi-usd';

export function validateCoinPrices(value: unknown): asserts value is CoinPrices {
  const prices = value as CoinPrices | null;
  if (
    !prices ||
    !COIN_SYMBOLS.every((symbol) => {
      const coin = prices[symbol];
      return (
        coin?.asset_id === symbol &&
        typeof coin.price_usd === 'number' &&
        Number.isFinite(coin.price_usd) &&
        coin.price_usd > 0
      );
    })
  ) {
    throw new Error('Coin prices must include valid USD prices for all supported coins');
  }
}

export async function saveCoinPrices(prices: CoinPrices) {
  validateCoinPrices(prices);
  const collection = await getCollection();
  // A fixed string _id makes repeated and concurrent updates target one document.
  await collection.updateOne(
    { _id: SNAPSHOT_ID },
    { $set: { prices, updatedAt: new Date() } },
    { upsert: true }
  );
}

export async function getCoinPrices(): Promise<CoinPrices | null> {
  try {
    const collection = await getCollection();
    const snapshot = await collection.findOne({ _id: SNAPSHOT_ID });
    if (snapshot) {
      validateCoinPrices(snapshot.prices);
      return snapshot.prices;
    }
  } catch (error) {
    console.error(
      'Unable to read shared coin prices:',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }

  if (process.env.ALLOW_BUNDLED_COIN_PRICES === 'true') {
    validateCoinPrices(bundledPrices);
    console.warn('Using explicitly enabled bundled coin prices; these prices may be stale.');
    return bundledPrices;
  }
  return null;
}
