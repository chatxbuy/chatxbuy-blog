export default defineEventHandler(async (event) => {
  const articles = await queryCollection(event, 'blog')
    .where('pinned', '=', true)
    .select('articleId', 'path', 'title', 'cover', 'date', 'pinned')
    .order('date', 'DESC')
    .all();

  return articles;
});
