import 'server-only';

import axios from 'axios';
import { unstable_cache } from 'next/cache';

// Shared market data only: never include session or account information here.
const getCachedStockQuotes = unstable_cache(
  async (baseURL: string): Promise<Record<string, any>[]> => {
    const response = await axios.get('/yahooapi/quotes', { baseURL });
    const quotes = response.data?.data;

    // Throw instead of caching an invalid upstream response for 30 minutes.
    if (!Array.isArray(quotes)) {
      throw new Error('Invalid stock quotes response');
    }

    return quotes;
  },
  ['shared-stock-quotes-v1'],
  { revalidate: 1800, tags: ['shared-stock-quotes'] }
);

export function getStockQuotes() {
  const baseURL = process.env.NEXT_PUBLIC_IMAGE_SERVER;
  if (!baseURL) {
    throw new Error('NEXT_PUBLIC_IMAGE_SERVER is not configured');
  }

  // Include the server URL in the cache key through the function argument.
  return getCachedStockQuotes(baseURL);
}
