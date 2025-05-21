export const formatDate = (dateString) => {
  const date = new Date(dateString).toLocaleString('zh-TW', {
    dateStyle: 'short',
  });
  return date;
};

export const formatArticles = (articles) => {
  if (articles) {
    return articles.map((article) => {
      return {
        ...article,
        path: article?.path.replace('/blog', '/page/blogPage'),
        date: formatDate(article?.date),
      };
    });
  }
  return [];
};

export const getPageItems = (items, perPage, currentPage) => {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return items?.slice(start, end) ?? [];
};
