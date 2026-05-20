import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zenvoora.vercel.app';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/convert`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/ebooks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/design`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/prompts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/scripts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // All blog post slugs from the database (29 published articles)
  const blogSlugs = [
    'ai-revolutionizing-file-management-smart-upload-analyze-share-2026',
    'image-optimization-web-complete-guide-2026',
    'organize-cloud-storage-step-by-step-system',
    'encrypt-files-before-cloud-upload-tutorial',
    'data-privacy-laws-every-internet-user-guide',
    'complete-cloud-backup-guide-never-lose-files',
    'cloud-storage-vs-local-storage-comparison',
    'share-files-professionally-with-clients-guide',
    'smart-file-sharing-remote-workers-tools-strategies',
    'public-file-pages-future-content-sharing-seo',
    'upload-to-share-digital-workflow-teams',
    'ai-powered-file-analysis-smart-platforms',
    'complete-guide-file-preview-technology',
    'ai-transforming-cloud-storage-file-management-2025',
    'free-file-sharing-essential-remote-work-2026',
    'future-of-cloud-storage-predictions-2026',
    'best-free-cloud-storage-2026-comparison',
    'cloud-storage-security-trends-2026',
    'how-to-share-large-files-online-2026',
    'compress-files-without-losing-quality-2026',
    'essential-file-conversion-tools-professionals-2026',
    'cloud-storage-security-complete-guide-protecting-files-online',
    'ultimate-guide-free-file-sharing-upload-convert-share',
    'cloud-vs-local-storage-complete-2026-guide-choosing-right-storage',
    'data-privacy-laws-your-files-what-every-internet-user-must-know-2026',
    'remote-work-file-sharing-best-tools-practices-distributed-teams-2026',
    'how-encrypt-files-cloud-step-by-step-security-guide-2026',
    'best-free-cloud-storage-services-2026-compare-features-limits-security',
    'understanding-file-formats-complete-guide-image-document-video-audio-2026',
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
