<script setup lang="ts">
const { data: article } = await useAsyncData(async () => {
  const article = await queryCollection('blog')
    .path('/blog/2025-05-14-test-title')
    .first();

  console.log({ article });
  return article;
});

useSeoMeta({
  title: article.value?.title,
});
</script>

<template>
  <div>
    <div>{{ article?.title }}</div>
    <div>{{ article?.tags }}</div>
    <div>{{ article?.date }}</div>
    <img :src="article?.cover" alt="cover" width="300" />
    <ContentRenderer v-if="article" :value="article" class="w-1/2" />
    <div v-else>article not found</div>
  </div>
</template>
