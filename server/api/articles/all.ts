export default defineEventHandler(async (event) => {
  const allArticles = await queryCollection(event, 'blog')
    .select('articleId', 'title', 'cover', 'date', 'pinned', 'draft')
    .order('date', 'DESC') // sort by date
    .all();

  const now = new Date();

  // Filter out drafts (draft === true) and future articles (date > now)
  const articles = allArticles.filter(
    (article) => article.draft !== true && new Date(article.date) <= now
  );

  return articles;
});
