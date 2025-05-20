export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = Number(query.limit ?? 4);

  const articles = await queryCollection(event, 'blog')
    .select('articleId', 'title', 'cover', 'date', 'pinned')
    .order('date', 'DESC') // sort by date
    .limit(limit)
    .all();

  return articles;
});
