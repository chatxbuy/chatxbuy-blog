<script setup>
import '@/assets/css/header.css';
import { ref, onMounted } from 'vue';
import { getExchangeRate } from '@/apis/exchangeRate';

const CHATXBUY_HOST = import.meta.env.VITE_CHATXBUY_HOST;
const rate = ref(null);

const goChatbot = () => {
  if (localStorage.utm_ref != null) {
    window.open('https://m.me/chatXbuy?ref=' + localStorage.utm_ref);
  } else {
    window.open('https://m.me/chatXbuy');
  }
};

onMounted(async () => {
  const { exchange_rate } = await getExchangeRate();
  rate.value = exchange_rate;
});
</script>

<template>
  <div class="header flex justify-between items-center lg:table lg:px-20">
    <div class="left-content lg:gap-4">
      <div class="max-lg:px-4 max-lg:py-2">
        <a :href="`${CHATXBUY_HOST}`">
          <img
            class="max-lg:my-[5px] w-[104px]"
            src="@/assets/images/header/basic_logo_cn_l 1.png"
            alt="chatxbuy"
          />
        </a>
      </div>

      <p class="text-center max-lg:hidden">
        今日匯率：新台幣
        <span class="lg:px-1 font-bold text-[#3c5bff]">{{ rate }}</span>
      </p>
    </div>

    <div class="mid-content max-lg:hidden">
      <div class="flex justify-end">
        <div class="headr_link header_text">
          <a
            class="text-decoration-none text-inherit"
            :href="`${CHATXBUY_HOST}/page/service`"
          >
            <span class="header-button-pointer">服務介紹</span>
          </a>
        </div>

        <div class="headr_link header_text">
          <a
            class="text-decoration-none text-inherit"
            :href="`${CHATXBUY_HOST}/page/freight`"
          >
            <span class="header-button-pointer">費用說明</span>
          </a>
        </div>

        <div class="headr_link header_text">
          <a
            class="text-decoration-none text-inherit"
            :href="`${CHATXBUY_HOST}/page/notice`"
          >
            <span class="header-button-pointer">Q&A</span>
          </a>
        </div>

        <div class="headr_link header_text">
          <a
            class="text-decoration-none text-inherit"
            :href="`${CHATXBUY_HOST}/page/blogList`"
          >
            <span class="header-button-pointer">Blog</span>
          </a>
        </div>

        <div class="headr_link header_text">
          <a
            class="text-decoration-none text-inherit"
            :href="`${CHATXBUY_HOST}/page/aboutUs`"
          >
            <span class="header-button-pointer">關於我們</span>
          </a>
        </div>

        <img
          class="cursor-pointer lg:ml-2.5"
          @click="goChatbot"
          src="@/assets/images/header/Primary.svg"
          alt="代買幫"
        />
      </div>
    </div>

    <!-- Mobile Burger Menu -->
    <a :href="`${CHATXBUY_HOST}/page/tableOfContents`" class="lg:hidden mr-2.5">
      <img src="@/assets/images/header/menu.svg" alt="burger-menu" />
    </a>
  </div>
</template>
