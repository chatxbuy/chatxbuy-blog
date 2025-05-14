<script setup>
import '@/assets/css/blog.css';
import { useRoute, useRouter } from 'vue-router';
import { formatArticles } from '@/utils/format';

const CHATXBUY_HOST = import.meta.env.VITE_CHATXBUY_HOST;
const API_URL = import.meta.env.VITE_API_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const USER = import.meta.env.VITE_USER;

const route = useRoute();
const router = useRouter();

// GET single article
const [id, title] = route.params.id.split('-');

const { data: article, error: errorArticle } = await useAsyncData(
  `article-${id}`,
  async () => {
    const path = `/blog/articles/${id}`;
    const res = await $fetch(
      `${API_URL}${path}?client_id=${CLIENT_ID}&user=${USER}`
    );
    const article = res.article;

    // Redirect for google search
    if (title !== article?.title) {
      await router.replace(`/page/blogPage/${id}-${article?.title}`);
      return;
    }
    return article;
  }
);

// GET related articles
const { data: articlesRelated, error: errorRelated } = await useAsyncData(
  'GET related articles',
  async () => {
    const limit = 3;
    const path = '/blog/articles/hot';
    const res = await $fetch(
      `${API_URL}${path}?client_id=${CLIENT_ID}&user=${USER}&limit=${limit}`
    );
    return formatArticles(res.articles);
  }
);
</script>

<template>
  <div>
    <!-- banner -->
    <section>
      <div class="relative overflow-hidden">
        <img
          class="banner-container banner-picture1"
          src="@/assets/images/blog/banner.svg"
          alt="藍第一頻"
        />

        <div>
          <p class="title-e1-mo-blog blog-title-c1">Blog</p>
        </div>
      </div>
    </section>

    <section class="section-container-page">
      <div class="flex max-lg:flex-col max-lg:items-center">
        <div class="lg:w-[710px] grow">
          <!-- Article content -->
          <section :class="['text-primary px-4 pt-10 font-bold ', 'text-2xl ']">
            {{ article?.title }}
          </section>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <section class="html-content" v-html="article?.body" />

          <section style="padding-block: 64px">
            <a
              :href="`${CHATXBUY_HOST}/page/blogList`"
              class="reed-more-Button"
            >
              回首頁 >
            </a>
          </section>

          <!-- 相關文章 -->
          <div class="section-container-page-mo">
            <div class="blogTopic-title-mo Related-articles my-10">
              相關文章
            </div>

            <div class="flex max-lg:flex-col gap-4 lg:gap-8 pb-20">
              <div
                v-for="item in articlesRelated"
                :key="item.id"
                class="max-lg:flex gap-4 lg:w-1/3"
              >
                <div class="blog-img-wrap w-1/3 lg:w-full">
                  <img
                    :src="item?.cover"
                    alt=""
                    class="w-full h-full rounded-lg"
                  />
                </div>

                <RouterLink :to="`/page/blogPage/${item?.id}-${item?.title}`">
                  <p class="Related-articles-time text-sm text-secondary">
                    {{ item?.date }}
                  </p>
                  <p class="Related-articles-title">
                    {{ item?.title }}
                  </p>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="w-88 lg:mx-10">
          <!-- 訂閱代買幫Blog -->
          <div class="my-10">
            <BlogSubscribeDesktop />
          </div>

          <!-- 標籤 -->
          <div class="Tags mt-10">
            <p class="text-primary font-bold">標籤</p>

            <div class="flex flex-wrap gap-3 mt-4">
              <button
                v-for="data in article?.tags"
                :key="data"
                disabled
                :class="[
                  'text-gray-500 border border-gray-300 ',
                  'text-lg rounded-md px-2 py-1',
                ]"
              >
                {{ data?.tag }}
              </button>
            </div>
          </div>

          <!-- 關於代買幫 CHATxBUY -->
          <div class="about-block-gray-mo about-block-gray-page">
            <p class="text-primary font-bold text-lg mb-6">
              關於代買幫 CHATxBUY
            </p>
            <p class="about-CHAT-BUY-page">
              代買幫CHATxBUY
              提供您阿里巴巴專業代買服務。解決台灣人在1688上購物時，金流與物流的不便。<br />
              成立於2019年的台灣團隊，從下單、賣家溝通、國際集運到商品抵達，代買幫都一手包辦。讓您可以享受無憂的1688代買體驗。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
