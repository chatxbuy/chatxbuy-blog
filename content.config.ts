import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        articleId: z.string(),
        draft: z.boolean(),
        title: z.string(),
        cover: z.string(),
        date: z.string(),
        tags: z.array(z.string()),
        pinned: z.boolean(),
      }),
    }),
  },
});
