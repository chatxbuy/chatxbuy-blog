<script setup>
import '@/assets/css/blog.css';
import { useRoute } from 'vue-router';
import { formatArticles } from '@/utils/format';

const CHATXBUY_HOST = import.meta.env.VITE_CHATXBUY_HOST;
const route = useRoute();

// GET single article
const part = route.params.slug.split('-');
const id = part[0];
const title = part.slice(1).join('-');

useHead({
  title: title,
  meta: [
    {
      name: 'title',
      content: title,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://blog.chatxbuy.com/page/blogPage/${id}-${title}`,
    },
  ],
});

const { data: article, error: errorArticle } = await useAsyncData(
  `article-${id}`,
  async () => {
    // CMS blog
    const path = `/blog/${id}-${title}`;
    const article = await queryCollection('blog').path(path).first();
    return article;
  }
);

// GET related articles
const { data: articlesRelated, error: errorRelated } = await useAsyncData(
  `article-related-${id}`,
  async () => {
    const res = await $fetch('/api/articles/related', {
      query: { id },
    });
    return formatArticles(res);
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

          <section v-if="article" class="html-content">
            <ContentRenderer
              v-if="article"
              :value="article"
              class="prose prose-neutral"
            />
          </section>

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

                <RouterLink :to="item?.path">
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
                v-for="tag in article?.tags"
                :key="tag"
                disabled
                :class="[
                  'text-gray-500 border border-gray-300 ',
                  'text-lg rounded-md px-2 py-1',
                ]"
              >
                {{ tag }}
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
