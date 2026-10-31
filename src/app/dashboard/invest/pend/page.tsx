import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Pending investment',
};

// ----------------------------------------------------------------------

// Force dynamic rendering since this page uses cookies/session
export const dynamic = 'force-dynamic';
import dbConnect from '@/utils/dbConnect';
import Investment from '@/models/investment.model';
import plans from '@/helpers/plans';
import { getCoinPrices } from '@/lib/coin-prices';
// Client component
import InvestPendClient from './InvestPendClient';

// ----------------------------------------------------------------------

export default async function PendingInvestmentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  await dbConnect();

  const rawInvestments = await Investment.find({
    userId: user._id,
    status: 'pending',
    transactionId: { $exists: false },
  }).lean();

  const pendingInvestments = rawInvestments.map((x) => ({
    ...x,
    plan: plans[(x as any).planId],
  }));

  const coinList = await getCoinPrices();

  const plainUser = JSON.parse(JSON.stringify(user));
  const plainPendingInvestments = JSON.parse(JSON.stringify(pendingInvestments));
  const plainCoinList = JSON.parse(JSON.stringify(coinList));

  return (
    <InvestPendClient
      user={plainUser}
      pendingInvestments={plainPendingInvestments}
      coinList={plainCoinList}
    />
  );
}
