import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stock Market Investments',
  description:
    'Access 3,500+ US and global stocks in real time with Elizabeth Judith Martinez. Build wealth through stock ownership, dividends, and price appreciation.',
  keywords: [
    'stock market',
    'stocks investment',
    'US stocks',
    'global stocks',
    'stock portfolio',
    'Elizabeth Judith Martinez',
  ],
  openGraph: {
    title: 'Stock Market Investments | Elizabeth Judith Martinez',
    description:
      'Access 3,500+ US and global stocks in real time. Build wealth through stock ownership and dividends.',
    url: 'https://advisor.elizabethjudithmartinez.com/stocks',
  },
  alternates: { canonical: 'https://advisor.elizabethjudithmartinez.com/stocks' },
};

export default function StocksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
