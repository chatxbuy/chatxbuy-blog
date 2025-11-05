export default defineEventHandler(async (event) => {
  const allArticles = await queryCollection(event, 'blog')
    .select('articleId', 'path', 'title', 'cover', 'date', 'pinned', 'draft')
    .order('date', 'DESC') // sort by date
    .all();

  // Filter out drafts (draft === true)
  const articles = allArticles.filter(article => article.draft !== true);

  return articles;
});
