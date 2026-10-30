import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Sign In',
  description: 'Sign in to your Elizabeth Judith Martinez investment account.',
  alternates: {
    canonical: `${SITE_URL}/login`,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
