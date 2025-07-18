import { defineSitemapEventHandler } from '#imports';
import type { SitemapUrlInput } from '#sitemap/types';

export default defineSitemapEventHandler(async (event) => {
  const articles = await queryCollection(event, 'blog')
    .select('path', 'title', 'cover', 'date')
    .all();

  return articles.map((article) => ({
    loc: decodeURIComponent(article.path).replace('/blog', '/page/blogPage'),
    lastmod: article.date,
    images: [
      {
        loc: article.cover,
        title: article.title,
      },
    ],
    // Specify which sitemap this URL belongs to
    _sitemap: 'pages',
  })) satisfies SitemapUrlInput[];
});
