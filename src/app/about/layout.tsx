import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Elizabeth Judith Martinez — a trusted financial advisor specializing in smart investing, fixed returns, stock ownership, and automated portfolio management.',
  openGraph: {
    title: 'About Elizabeth Judith Martinez | Financial Advisor',
    description:
      'Learn about Elizabeth Judith Martinez — a trusted financial advisor specializing in smart investing, fixed returns, and automated portfolio management.',
    url: 'https://advisor.elizabethjudithmartinez.com/about',
  },
  alternates: { canonical: 'https://advisor.elizabethjudithmartinez.com/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
