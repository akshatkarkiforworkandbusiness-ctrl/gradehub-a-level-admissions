import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://afteralevel.com';

  const routes = [
    '',
    '/ucas-calculator',
    '/grade-predictor',
    '/gpa-converter',
    '/subject-matcher',
    '/requirements-checker',
    '/tariff-search',
    '/about-us',
    '/contact',
    '/privacy-policy',
    '/terms-conditions',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
