export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = Number(query.limit ?? 4);

  const allArticles = await queryCollection(event, 'blog')
    .where('pinned', '=', false)
    .select('articleId', 'title', 'cover', 'date', 'pinned', 'draft')
    .order('date', 'DESC') // sort by date
    .all();

  const now = new Date();

  // Filter out drafts (draft === true) and future articles (date > now)
  const articles = allArticles
    .filter(article => article.draft !== true && new Date(article.date) <= now)
    .slice(0, limit);

  return articles;
});
