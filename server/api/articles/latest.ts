export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = Number(query.limit ?? 4);

  const allArticles = await queryCollection(event, 'blog')
    .where('pinned', '=', false)
    .select('articleId', 'path', 'title', 'cover', 'date', 'pinned', 'draft')
    .order('date', 'DESC') // sort by date
    .all();

  // Filter out drafts (draft === true)
  const articles = allArticles.filter(article => article.draft !== true).slice(0, limit);

  return articles;
});
