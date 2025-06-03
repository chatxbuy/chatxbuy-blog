<script setup>
import { onMounted } from 'vue';
import { getSingleArticle } from '@/apis/blog';
import dataProcessed from '../dataProcessed.json';

const allIds = [
  '37759546',
  '173749882',
  '167552425',
  '166206388',
  '164045008',
  '152852254',
  '86106958',
  '81263644',
  '77465626',
  '74174866',
  '72199219',
  '69436093',
  '68118106',
  '66253645',
  '65674783',
  '64423372',
  '63090145',
  '61479400',
  '61479190',
  '61478974',
  '61478623',
  '61478356',
  '61477984',
  '61250446',
  '61249603',
  '61248004',
  '61247377',
  '61246594',
  '42219838',
  '41667376',
  '40926559',
  '40077706',
  '39320224',
  '38104021',
  '37762087',
  '37761925',
  '37761019',
  '37760893',
  '37760101',
  '2010946',
  '320971',
];

const articles = ref([]);

// onMounted(async () => {
//   const result = await Promise.all(
//     allIds.map(async (id) => await getSingleArticle(id))
//   );
//   console.dir(
//     (articles.value = result.map((article) => {
//       return {
//         id: article.id,
//         body: article.body,
//       };
//     }))
//   );
// });
</script>

<template>
  <main>
    <!-- <div v-for="item in dataProcessed" :key="item.id">
      <div v-html="item.body"></div>
    </div> -->
  </main>
</template>
