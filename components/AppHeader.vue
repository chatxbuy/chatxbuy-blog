<script setup>
import { ref, onMounted } from 'vue';
import { getExchangeRate } from '@/apis/exchangeRate';

const HOST = process.env.VITE_CHATXBUY_HOST;
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
  <div class="header" style="padding-inline: 80px">
    <div class="left-content" style="gap: 16px">
      <div>
        <a :to="`${HOST}`">
          <img
            style="width: 104px"
            src="@/public/images/desktop/header/basic_logo_cn_l 1.png"
            alt="chatxbuy"
          />
        </a>
      </div>

      <p class="text-center">
        今日匯率：新台幣
        <span style="color: #3c5bff; font-weight: 600; padding-inline: 4px">{{
          rate
        }}</span>
      </p>
    </div>

    <div class="mid-content">
      <div style="display: flex; justify-content: end">
        <div class="headr_link header_text">
          <a
            style="text-decoration: none; color: inherit"
            :href="`${HOST}/page/service`"
          >
            <span class="header-button-pointer">服務介紹</span>
          </a>
        </div>

        <div class="headr_link header_text">
          <a
            style="text-decoration: none; color: inherit"
            :href="`${HOST}/page/freight`"
          >
            <span class="header-button-pointer">費用說明</span>
          </a>
        </div>

        <div class="headr_link header_text">
          <a
            style="text-decoration: none; color: inherit"
            :href="`${HOST}/page/notice`"
          >
            <span class="header-button-pointer">Q&A</span>
          </a>
        </div>

        <div class="headr_link header_text">
          <a
            style="text-decoration: none; color: inherit"
            :href="`${HOST}/page/blogList`"
          >
            <span class="header-button-pointer">Blog</span>
          </a>
        </div>

        <div class="headr_link header_text">
          <a
            style="text-decoration: none; color: inherit"
            :href="`${HOST}/page/aboutUs`"
          >
            <span class="header-button-pointer">關於我們</span>
          </a>
        </div>

        <img
          class=""
          style="cursor: pointer; margin-left: 10px"
          @click="goChatbot"
          src="@/public/images/desktop/header/Primary.svg"
          alt="代買幫"
        />
      </div>
    </div>
  </div>
</template>

<style scope>
.left-content {
  height: 100%;
  display: flex;
  align-items: center;
}

.left-content .text-center {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
}

.mid-content {
  display: table-cell;
  height: 100%;
  vertical-align: middle;
}

.header-button-pointer {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
}

.headr_link {
  padding-left: 20px;
  padding-right: 20px;
  white-space: nowrap;
}

.header_text {
  font-family: PingFang TC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #3a3a3a;
}

.headr_link:hover {
  -webkit-text-stroke-width: 0px;
  color: #0751a0;
}

.header {
  display: table;
  height: 72px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.header .left-side-content {
  height: 100%;
  width: 20%;
  display: table-cell;
  vertical-align: middle;
}

.header .mid-side-content {
  display: table-cell;
  height: 100%;
  width: 80%;
  vertical-align: middle;
}
</style>
