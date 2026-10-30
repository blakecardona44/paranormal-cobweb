import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://advisor.elizabethjudithmartinez.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard', '/api', '/login', '/register', '/reset-password'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
