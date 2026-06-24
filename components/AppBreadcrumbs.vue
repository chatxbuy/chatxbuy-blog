<script setup>
// items: [{ label, href }]
//   href = 絕對網址（跨網域回主站 / 本頁 canonical）。
//   最後一項視為當前頁，畫面上不可點，但仍用於 JSON-LD。
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// schema.org BreadcrumbList：每一層都用絕對網址（含當前頁）
useHead(() => ({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: item.href,
        })),
      }),
    },
  ],
}));
</script>

<template>
  <nav aria-label="breadcrumb" class="mt-6 px-4 lg:mt-8">
    <ol class="flex flex-wrap items-center text-[13px] lg:text-sm">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <span v-if="index > 0" aria-hidden="true" class="mx-2 text-gray-400"
          >›</span
        >
        <a
          v-if="index < items.length - 1"
          :href="item.href"
          class="text-gray-500 hover:text-primary hover:underline"
          >{{ item.label }}</a
        >
        <span v-else aria-current="page" class="text-primary font-medium">{{
          item.label
        }}</span>
      </li>
    </ol>
  </nav>
</template>
