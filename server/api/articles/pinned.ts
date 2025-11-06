export default defineEventHandler(async (event) => {
  const allArticles = await queryCollection(event, 'blog')
    .where('pinned', '=', true)
    .select('articleId', 'path', 'title', 'cover', 'date', 'pinned', 'draft')
    .order('date', 'DESC')
    .all();

  const now = new Date();

  // Filter out drafts (draft === true) and future articles (date > now)
  const articles = allArticles
    .filter(article => article.draft !== true && new Date(article.date) <= now)
    .slice(0, 3);

  return articles;
});
