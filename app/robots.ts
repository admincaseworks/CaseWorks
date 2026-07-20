import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://caseworks-gestao-de-obras.vercel.app/sitemap.xml',
  };
}
