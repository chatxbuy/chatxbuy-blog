<script setup>
const HOST = process.env.VITE_CHATXBUY_HOST;
</script>

<template>
  <div class="footer">
    <div style="display: flex; flex-direction: column; align-items: center">
      <div>
        <div class="full-width-gray-line" />
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          margin-top: 36px;
        "
      >
        <a :to="`${HOST}`">
          <img
            style="width: 144px"
            src="@/assets/images/desktop/header/basic_logo_cn_l 1.png"
            alt="chatxbuy"
          />
        </a>
      </div>

      <div style="display: flex">
        <div class="footer_herf">
          <a
            style="text-decoration: none; color: inherit"
            :to="`${HOST}/page/service`"
          >
            <span class="button-pointer footer_text">服務介紹</span>
          </a>
        </div>

        <div class="footer_span">|</div>

        <div class="footer_herf">
          <a
            style="text-decoration: none; color: inherit"
            :to="`${HOST}/page/freight`"
          >
            <span class="button-pointer footer_text">費用說明</span>
          </a>
        </div>

        <div class="footer_span">|</div>

        <div class="footer_herf">
          <a
            style="text-decoration: none; color: inherit"
            :to="`${HOST}/page/notice`"
          >
            <span class="button-pointer footer_text">Q&A</span>
          </a>
        </div>

        <div class="footer_span">|</div>

        <div class="footer_herf">
          <a
            style="text-decoration: none; color: inherit"
            :to="`${HOST}/page/blogList`"
          >
            <span class="button-pointer footer_text">Blog</span>
          </a>
        </div>

        <div class="footer_span">|</div>

        <div class="footer_herf">
          <a
            style="text-decoration: none; color: inherit"
            :to="`${HOST}/page/aboutUs`"
          >
            <span class="button-pointer footer_text">關於我們</span>
          </a>
        </div>
      </div>

      <div style="display: flex; margin-top: 28px; margin-bottom: 32px">
        <div class="footer_herf">
          <a
            style="text-decoration: none; color: inherit"
            :to="`${HOST}/page/prohibit`"
          >
            <span class="button-pointer footer_text">禁運商品</span>
          </a>
        </div>

        <div class="footer_herf" style="margin-left: 46px">
          <a
            style="text-decoration: none; color: inherit"
            :to="`${HOST}/page/termsService`"
          >
            <span class="button-pointer footer_text">服務條款</span>
          </a>
        </div>

        <div class="footer_herf" style="margin-left: 46px">
          <a
            style="text-decoration: none; color: inherit"
            :to="`${HOST}/page/privacyPolicy`"
          >
            <span class="button-pointer footer_text">隱私權政策</span>
          </a>
        </div>
      </div>

      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #2a40b3;
          width: 100vw;
          justify-content: center;
        "
      >
        <div style="display: flex; margin-top: 24px; margin-bottom: 24px">
          <div style="padding-right: 24px">
            <a href="https://www.facebook.com/chatXbuy/" target="_blank">
              <img
                src="@/assets/images/desktop/header/Vector-FB.svg"
                alt="FB"
              />
            </a>
          </div>

          <div>
            <a href="https://www.instagram.com/chatxbuy/" target="_blank">
              <img
                src="@/assets/images/desktop/header/Negative-IG.svg"
                alt="ig"
              />
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

<style scope>
.full-width-gray-line {
  width: 100vw;
  height: 1px;
  background-color: #dee2e6;
}

.footer {
  height: 370px;
  width: 40%;
  margin: 0 auto;
}

.footer_span {
  display: inline;
  margin-left: 20px;
  margin-right: 20px;
  color: #868e96;
}

.footer_text {
  font-size: clamp(14px, 1.11vw, 16px);
  color: #3a3a3a;
}

.footer_text:hover {
  color: #0751a0;
}

.footer-blue-footer {
  text-align: center;
  color: #fff;
  font-size: 14px;
  line-height: 28px;
  padding-bottom: 36px;
}
</style>
