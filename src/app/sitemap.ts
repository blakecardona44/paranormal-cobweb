import type { MetadataRoute } from 'next';
import { getBlogArticles } from '@/lib/articles';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://advisor.elizabethjudithmartinez.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getBlogArticles();
  return [
    ...['', '/about', '/faq', '/invest', '/stocks'].map((path) => ({
      url: `${SITE_URL}${path || '/'}`,
      changeFrequency: 'weekly' as const,
      priority: path ? 0.8 : 1,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
