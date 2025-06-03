// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

const dynamicRoutes = async () => {
  const articles = await queryCollection('blog').select('path').all();
  return articles?.map((article) => article.path) ?? [];
};

const HOST = 'https://blog.chatxbuy.com';

export default defineNuxtConfig({
  site: {
    url: HOST,
    name: 'ChatXBuy Blog CMS',
  },

  app: {
    head: {
      title: 'ChatXBuy Blog CMS',
      meta: [
        {
          name: 'description',
          content: 'ChatXBuy Blog Content Management System',
        },
      ],
    },
  },

  compatibilityDate: '2025-05-22',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content', '@nuxtjs/sitemap'],

  vite: {
    plugins: [tailwindcss()],
  },

  content: {
    renderer: {
      anchorLinks: false,
    },
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/', '/admin'],
  },
});
