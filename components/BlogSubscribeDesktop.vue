<script setup>
import { subscribeBlog } from '@/apis/blog';

const nickName = ref('');
const email = ref('');
const validation = ref({
  nickName: null,
  email: null,
});

const subscriptionSuccess = ref(false);

const onSubmitSubscribe = async (event) => {
  event.preventDefault();

  // Validate data
  validation.value = {
    nickName: null,
    email: null,
  };

  if (nickName.value.length < 1) {
    validation.value.nickName = false;
  }

  if (
    // eslint-disable-next-line no-useless-escape
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.value)
  ) {
    validation.value.email = false;
  }

  if (this.validation.nickName === false || this.validation.email === false) {
    return;
  }

  // Call API
  const data = {
    nickName: nickName.value,
    email: email.value,
  };

  const res = await subscribeBlog(data);

  if (res.data[0].email === this.email) {
    this.subscriptionSuccess = true;
  }

  this.$refs['my-modal'].show();
};
</script>

<template>
  <div class="Subscribe-block-gray">
    <form @submit="onSubmitSubscribe">
      <div class="Subscribe-blog">訂閱代買幫Blog</div>

      <b-form-group style="margin-top: 14px">
        <input
          id="input-2"
          v-model="nickName"
          :state="validation.nickName"
          placeholder="請輸入您的代稱*"
        />

        <b-form-invalid-feedback :state="validation.nickName">
          <mdicon name="alert-circle-outline" size="14" />
          代稱不可留空
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group style="margin-top: 24px">
        <input
          id="input-3"
          v-model="email"
          :state="validation.email"
          placeholder="請輸入您的email*"
        />

        <b-form-invalid-feedback :state="validation.email">
          <mdicon name="alert-circle-outline" size="14" />
          請輸入有效的信箱
        </b-form-invalid-feedback>
      </b-form-group>

      <button type="submit" class="Subscribe-blog-Button1" style="border: none">
        立即訂閱
      </button>
    </form>

    <!-- 訂閱彈窗 -->
    <b-modal ref="my-modal" centered size="sm" hide-header hide-footer>
      <div
        class="my-4"
        style="text-align: center; font-size: 20px; font-weight: bold"
      >
        <div v-if="subscriptionSuccess">你已成功訂閱</div>

        <div v-if="!subscriptionSuccess">
          訂閱失敗，
          <br />
          請稍後重試
        </div>
      </div>

      <b-button
        class="mt-3"
        block
        @click="() => this.$refs['my-modal'].hide()"
        style="
          background-color: #01cbcb !important;
          border: none;
          border-radius: 9999px !important;
          width: auto;
          padding: 10px 40px;
          margin-inline: auto;
          margin-bottom: 24px;
        "
        >確定</b-button
      >
    </b-modal>
  </div>
</template>
