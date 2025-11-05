export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;

  const targetArticle = await queryCollection(event, 'blog')
    .where('articleId', '=', id)
    .select('date')
    .first();

  const targetDate = targetArticle?.date;

  const articles = await queryCollection(event, 'blog')
    .where('date', '<', targetDate)
    .where('draft', '<>', true)
    .select('articleId', 'path', 'title', 'cover', 'date', 'pinned')
    .order('date', 'DESC') // sort by date
    .limit(3)
    .all();

  if (articles.length < 3) {
    const articlesMore = await queryCollection(event, 'blog')
      .where('date', '>', targetDate)
      .where('draft', '<>', true)
      .select('articleId', 'path', 'title', 'cover', 'date', 'pinned')
      .order('date', 'DESC') // sort by date
      .limit(3 - articles.length)
      .all();

    articles.push(...articlesMore);
  }

  return articles;
});
