import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Simple layout for admin section - no auth protection
// Auth is handled in (dashboard)/layout.tsx for protected routes

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
