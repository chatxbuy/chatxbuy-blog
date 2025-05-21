export default defineEventHandler(async (event) => {
  const articles = await queryCollection(event, 'blog')
    .select('articleId', 'path', 'title', 'cover', 'date', 'pinned')
    .order('date', 'DESC') // sort by date
    .all();

  return articles;
});
