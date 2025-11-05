export default defineEventHandler(async (event) => {
  const allArticles = await queryCollection(event, 'blog')
    .where('pinned', '=', true)
    .select('articleId', 'path', 'title', 'cover', 'date', 'pinned', 'draft')
    .order('date', 'DESC')
    .all();

  // Filter out drafts (draft === true)
  const articles = allArticles.filter(article => article.draft !== true).slice(0, 3);

  return articles;
});
