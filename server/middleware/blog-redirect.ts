export default defineEventHandler((event) => {
  const url = event.node.req.url || '';
  const path = url.split('?')[0]; // 移除 query string

  // 情況 1: 舊版 /blog/{articleId}-{title} 格式
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');

    if (slug) {
      const articleId = slug.split('-')[0];

      if (articleId) {
        event.node.res.statusCode = 301;
        event.node.res.setHeader('Location', `/page/blogPage/${articleId}`);
        event.node.res.end();
        return;
      }
    }
  }

  // 情況 2: 舊版 /page/blogPage/{articleId}-{title} 格式（帶標題）
  if (path.startsWith('/page/blogPage/')) {
    const slug = path.replace('/page/blogPage/', '');

    // 如果 slug 包含 '-'，表示是舊版帶標題的 URL
    if (slug && slug.includes('-')) {
      const articleId = slug.split('-')[0];

      if (articleId) {
        event.node.res.statusCode = 301;
        event.node.res.setHeader('Location', `/page/blogPage/${articleId}`);
        event.node.res.end();
        return;
      }
    }
  }
});
