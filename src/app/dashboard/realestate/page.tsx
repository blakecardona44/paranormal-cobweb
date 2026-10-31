import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'All Plans',
};

// ----------------------------------------------------------------------

// Force dynamic rendering since this page uses cookies/session
export const dynamic = 'force-dynamic';
import { getCoinPrices } from '@/lib/coin-prices';
// Client component
import RealestateClient from './RealestateClient';

// ----------------------------------------------------------------------

export default async function RealEstatePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const coinList = await getCoinPrices();

  // Serialize to plain objects before passing to Client Component
  const plainUser = JSON.parse(JSON.stringify(user));
  const plainCoinList = coinList ? JSON.parse(JSON.stringify(coinList)) : null;

  return <RealestateClient user={plainUser} coinList={plainCoinList} />;
}
