// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Investment Plans',
//   description:
//     'Explore investment plans with Elizabeth Judith Martinez. Choose from fixed-return plans, crypto, real estate, and stock market opportunities designed to grow your wealth.',
//   keywords: [
//     'investment plans',
//     'fixed returns',
//     'wealth management',
//     'portfolio diversification',
//     'passive income',
//     'Elizabeth Judith Martinez',
//   ],
//   openGraph: {
//     title: 'Investment Plans | Elizabeth Judith Martinez',
//     description:
//       'Explore fixed-return plans, crypto, real estate, and stock market opportunities designed to grow your wealth.',
//     url: 'https://advisor.elizabethjudithmartinez.com/invest',
//   },
//   alternates: { canonical: 'https://advisor.elizabethjudithmartinez.com/invest' },
// };

export default function InvestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
