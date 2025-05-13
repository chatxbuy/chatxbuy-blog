<script setup>
import '@/assets/css/blog.css';
import { useRoute, useRouter } from 'vue-router';
import { getSingleArticle, getHotArticles } from '@/apis/blog';
import { formatArticles } from '@/utils/format';

const route = useRoute();
const router = useRouter();

let article = reactive({});
let articlesRelated = reactive([]);

const fetchData = async () => {
  const [id, title] = route.params.id.split('-');
  const _article = await getSingleArticle(id);

  // Wrong title in URL, redirect
  if (title !== _article?.title) {
    router.replace({ path: `/page/blogPage/${id}-${_article?.title}` });
    return;
  }

  Object.assign(article, _article);
  Object.assign(articlesRelated, formatArticles(await getHotArticles(3)));
};

onMounted(async () => {
  await fetchData();
});
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
      <div class="lg:flex">
        <div class="lg:max-w-[710px]">
          <!-- Article content -->
          <section :class="['text-primary px-4 pt-10 font-bold ', 'text-2xl ']">
            {{ article?.title }}
          </section>

          <section v-html="article?.body" class="html-content" />

          <section style="padding-block: 64px">
            <a to="/page/blogList" class="reed-more-Button"> 回首頁 > </a>
          </section>

          <!-- 相關文章 -->
          <div class="section-container-page-mo">
            <div class="blogTopic-title-mo Related-articles my-10">
              相關文章
            </div>

            <div class="flex max-lg:flex-col gap-4 lg:gap-8 pb-20">
              <div
                v-for="article in articlesRelated"
                :key="article.id"
                class="max-lg:flex gap-4 lg:w-1/3"
              >
                <div class="blog-img-wrap w-1/3 lg:w-full">
                  <img
                    :src="article?.cover"
                    alt=""
                    class="w-full h-full rounded-lg"
                  />
                </div>

                <RouterLink
                  :to="{
                    path: `/page/blogPage/${article?.id}-${article?.title}`,
                  }"
                >
                  <p class="Related-articles-time text-sm text-secondary">
                    {{ article?.date }}
                  </p>
                  <p class="Related-articles-title">
                    {{ article?.title }}
                  </p>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="max-lg: max-w-[343px] mx-auto">
          <!-- 訂閱代買幫Blog -->
          <!-- <BlogSubscribeDesktop /> -->

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
