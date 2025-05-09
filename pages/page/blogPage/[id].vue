<script setup>
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
      <div>
        <img
          class="banner-picture1"
          src="@/public/images/desktop/blog/banner.svg"
          alt="藍第一頻"
        />
        <div>
          <p class="blog-title-c1">Blog</p>
        </div>
      </div>
    </section>

    <section class="section-container-page">
      <div style="display: flex">
        <div style="max-width: 710px">
          <!-- Article content -->
          <section
            class="my-10 font-bold"
            style="font-size: 24px; color: #060e57"
          >
            {{ article?.title }}
          </section>

          <section v-html="article?.body" class="html-content" />

          <section style="padding-block: 64px">
            <a to="/page/blogList" class="reed-more-Button"> 回首頁 > </a>
          </section>

          <!-- 相關文章 -->
          <div>
            <div class="Related-articles">相關文章</div>

            <div style="display: flex; gap: 32px; padding-bottom: 161px">
              <div
                v-for="article in articlesRelated"
                :key="article.id"
                class="w-1/3"
              >
                <div class="blog-img-wrap">
                  <img :src="article?.cover" alt="" class="blog-img" />
                </div>

                <a
                  :to="{
                    name: 'blogPage',
                    params: {
                      id: article?.id ?? 'no_id',
                      title: article?.title ?? 'no_title',
                    },
                  }"
                >
                  <p class="Related-articles-time">{{ article?.date }}</p>
                  <p class="Related-articles-title">
                    {{ article?.title }}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-left: 40px; margin-top: 40px">
          <!-- 訂閱代買幫Blog -->
          <!-- <BlogSubscribeDesktop /> -->

          <!-- 標籤 -->
          <div class="Tags">
            <p class="Subscribe-blogList">標籤</p>

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

          <div class="about-block-gray-page">
            <p class="Subscribe-blogList">關於代買幫 CHATxBUY</p>
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

<style scope>
.section-container-page {
  max-width: 1140px;
  margin: 0 auto;
}

.banner-picture1 {
  width: 100%;
  height: auto;
}

.blog-title-c1 {
  font-weight: 500;
  font-size: 40px;
  color: #ffffff;
  position: absolute;
  top: 14vw;
  transform: translateX(-50%);
  left: 50%;
  letter-spacing: 3px;
}

.blogTopic-line {
  border: 0.3px solid #dee2e6;
  width: 710px;
  margin-top: 63px;
}

.big-title-blog {
  font-weight: 900;
  font-size: 28px;
  color: #060e57;
  margin-bottom: 24px;
  margin-top: 60px;
}

.blog-date {
  font-size: 14px;
  color: #868e96;
  margin-left: 6px;
}

.article-Content {
  font-size: 18px;
  color: #495057;
}

.Table-Contents-gray {
  width: 370px;
  background-color: #f8f9fa;
  padding: 24px;
  border-radius: 15px;
  margin-top: 50px;
  margin-bottom: 44px;
}

.Table-Contents-title {
  font-size: 20px;
  color: #21328c;
  font-weight: 900;
  margin: 0;
}

.Table-Contents-title-number {
  font-size: 16px;
  color: #495057;
  text-decoration: underline;
}

.Table-Contents-title-number:hover {
  color: #0751a0;
  font-weight: 500;
  cursor: pointer;
}

.title-blog-phase {
  font-size: 28px;
  color: #212529;
  font-weight: 700;
  padding-bottom: 20px;
}

.article-Content-phase {
  font-size: 18px;
  color: #495057;
  padding-bottom: 40px;
}

.Related-articles {
  font-weight: 900;
  font-size: 38px;
  color: #060e57;
  margin-bottom: 40px;
  margin-top: 44px;
}

.Related-articles-time {
  font-weight: 500;
  font-size: 14px;
  color: #2aa5ff;
  margin-bottom: 12px;
  margin-top: 20px;
}

.Related-articles-title {
  font-weight: 500;
  font-size: 20px;
  color: #212529;
  margin-bottom: 16px;
}

.Related-articles-title:hover {
  color: #0751a0;
  font-weight: 700;
  cursor: pointer;
}

.blogTopic-title-hover-page {
  font-size: 24px;
  color: #060e57;
  font-weight: 700;
  margin-left: 24px;
  margin-right: 24px;
  padding-top: 24px;
}

.blogTopic-choose-hover-page {
  font-size: 16px;
  color: #2a40b3;
  margin-left: 24px;
  margin-right: 24px;
  padding-top: 18px;
}

.blogTopic-choose-hover-page:hover {
  color: #0751a0;
  font-weight: 700;
  cursor: pointer;
}

.blogTopic-line-hover-page {
  border: 0.3px dashed #dee2e6;
  margin-left: 24px;
  margin-right: 24px;
}

.Subscribe-block-gray-page {
  width: 370px;
  height: 270px;
  background-color: #f8f9fa;
  border-radius: 15px;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 50px;
}

.Find-Articles-page {
  font-size: 24px;
  color: #060e57;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 24px;
}

.Subscribe-blogList {
  font-size: 24px;
  color: #060e57;
  font-weight: 700;
}

.Subscribe-blog-Button1 {
  width: 311px;
  background-color: #5974ff;
  color: #fff;
  font-size: 16px;
  padding: 12px 0;
  text-align: center;
  border-radius: 10px;
  margin-top: 20px;
}

.Subscribe-blog-Button1:hover {
  font-weight: 700;
  cursor: pointer;
}

.Tags {
  margin-top: 50px;
  max-width: 367px;
}

.Tags > .btn-outline-primary {
  color: #495057 !important;
  border-color: #dee2e6 !important;
  border-radius: 10px;
}

.about-block-gray-page {
  width: 370px;
  background-color: #f8f9fa;
  padding: 24px;
  border-radius: 15px;
  margin-top: 50px;
}

.Subscribe-blogList {
  font-size: 24px;
  color: #060e57;
  font-weight: 700;
}

.about-CHAT-BUY-page {
  font-size: 16px;
  color: #495057;
}

.reed-more-Button {
  width: 275px;
  background-color: #5974ff;
  color: #fff;
  font-size: 16px;
  padding: 12px 0px;
  text-align: center;
  border-radius: 40px;
  display: block;
  margin: 0 auto;
}

.reed-more-Button:hover {
  cursor: pointer;
  font-weight: 700;
}
</style>
