// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
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
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()] as any,
  },
});
