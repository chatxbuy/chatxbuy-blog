export default defineEventHandler((event) => {
  const url = event.node.req.url || '';

  // 匹配舊版 /blog/{articleId}-{title} 格式的 URL
  if (url.startsWith('/blog/')) {
    const slug = url.replace('/blog/', '').split('?')[0]; // 移除 query string

    if (slug) {
      // 提取 articleId（取第一個 `-` 之前的部分）
      const articleId = slug.split('-')[0];

      if (articleId) {
        const newUrl = `/page/blogPage/${articleId}`;

        // 發送 301 永久重定向
        event.node.res.statusCode = 301;
        event.node.res.setHeader('Location', newUrl);
        event.node.res.end();
        return;
      }
    }
  }
});
