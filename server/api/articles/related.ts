export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;

  const targetArticle = await queryCollection(event, 'blog')
    .where('articleId', '=', id)
    .select('date')
    .first();

  const targetDate = targetArticle?.date;
  const now = new Date();

  const allArticlesBefore = await queryCollection(event, 'blog')
    .where('date', '<', targetDate)
    .select('articleId', 'title', 'cover', 'date', 'pinned', 'draft')
    .order('date', 'DESC') // sort by date
    .all();

  // Filter out drafts (draft === true) and future articles (date > now)
  const articles = allArticlesBefore
    .filter(article => article.draft !== true && new Date(article.date) <= now)
    .slice(0, 3);

  if (articles.length < 3) {
    const allArticlesAfter = await queryCollection(event, 'blog')
      .where('date', '>', targetDate)
      .select('articleId', 'title', 'cover', 'date', 'pinned', 'draft')
      .order('date', 'DESC') // sort by date
      .all();

    // Filter out drafts (draft === true) and future articles (date > now)
    const articlesMore = allArticlesAfter
      .filter(article => article.draft !== true && new Date(article.date) <= now)
      .slice(0, 3 - articles.length);

    articles.push(...articlesMore);
  }

  return articles;
});
