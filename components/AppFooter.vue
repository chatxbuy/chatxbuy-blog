<script setup>
import '@/assets/css/footer.css';
const HOST = import.meta.env.VITE_CHATXBUY_HOST;
</script>

<template>
  <div class="footer">
    <div class="lg:flex flex-col items-center">
      <div>
        <div class="full-width-gray-line" />
      </div>

      <div class="max-lg:pl-4">
        <div class="mt-12 mb-9 lg:flex lg:justify-center lg:mb-[30px] lg:mt-9">
          <a :href="`${HOST}`">
            <img
              class="w-[104px] lg:w-[144px]"
              src="@/assets/images/header/basic_logo_cn_l 1.png"
              alt="chatxbuy"
            />
          </a>
        </div>

        <div class="hidden lg:flex">
          <div class="">
            <a
              style="text-decoration: none; color: inherit"
              :href="`${HOST}/page/service`"
            >
              <span class="footer_text">服務介紹</span>
            </a>
          </div>

          <div class="footer_span">|</div>

          <div class="">
            <a
              style="text-decoration: none; color: inherit"
              :href="`${HOST}/page/freight`"
            >
              <span class="footer_text">費用說明</span>
            </a>
          </div>

          <div class="footer_span">|</div>

          <div class="">
            <a
              style="text-decoration: none; color: inherit"
              :href="`${HOST}/page/notice`"
            >
              <span class="footer_text">Q&A</span>
            </a>
          </div>

          <div class="footer_span">|</div>

          <div class="">
            <a
              style="text-decoration: none; color: inherit"
              :href="`${HOST}/page/blogList`"
            >
              <span class="footer_text">Blog</span>
            </a>
          </div>

          <div class="footer_span">|</div>

          <div class="">
            <a
              style="text-decoration: none; color: inherit"
              :href="`${HOST}/page/aboutUs`"
            >
              <span class="footer_text">關於我們</span>
            </a>
          </div>
        </div>

        <div class="lg:flex justify-center gap-[46px] lg:mt-7 lg:mb-8">
          <div class="max-lg:mb-6">
            <a
              style="text-decoration: none; color: inherit"
              :href="`${HOST}/page/prohibit`"
            >
              <span class="footer_text">禁運商品</span>
            </a>
          </div>

          <div class="max-lg:mb-6">
            <a
              style="text-decoration: none; color: inherit"
              :href="`${HOST}/page/termsService`"
            >
              <span class="footer_text">服務條款</span>
            </a>
          </div>

          <div class="max-lg:mb-6">
            <a
              style="text-decoration: none; color: inherit"
              :href="`${HOST}/page/privacyPolicy`"
            >
              <span class="footer_text">隱私權政策</span>
            </a>
          </div>
        </div>
      </div>

      <div
        :class="[
          'lg:flex lg:flex-col lg:items-center lg:justify-center',
          'w-screen bg-[#2A40B3] max-lg:pl-4',
        ]"
      >
        <div
          :class="[
            'max-lg:pt-10 max-lg:pb-4 lg:py-6',
            'flex gap-6 items-center lg:justify-center',
          ]"
        >
          <div>
            <a href="https://www.facebook.com/chatXbuy/" target="_blank">
              <img src="@/assets/images/header/Vector-FB.svg" alt="FB" />
            </a>
          </div>

          <div>
            <a href="https://www.instagram.com/chatxbuy/" target="_blank">
              <img src="@/assets/images/header/Negative-IG.svg" alt="ig" />
            </a>
          </div>
        </div>

        <div class="footer-blue-footer">
          代買幫商行<br />
          客服時段：週一～週五 09:30~18:30<br />
          Copyright© 2024 chatxbuy All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
</template>
