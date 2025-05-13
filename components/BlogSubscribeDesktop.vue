<script setup>
import { subscribeBlog } from '@/apis/blog';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

const nickName = ref('');
const email = ref('');

// Modal Control
const isOpen = ref(false);
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

const subscriptionSuccess = ref(false);

const error = ref({
  nickName: false,
  email: false,
});

const validate = () => {
  error.value = {
    nickName: false,
    email: false,
  };

  if (nickName.value.length < 1) {
    error.value.nickName = true;
  }

  if (
    // eslint-disable-next-line no-useless-escape
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.value)
  ) {
    error.value.email = true;
  }

  if (error.value.nickName || error.value.email) {
    return false;
  }

  return true;
};

const onSubmitSubscribe = async () => {
  // Validate data
  const isValid = validate();
  if (!isValid) return;

  // Call API
  const data = {
    nickName: nickName.value,
    email: email.value,
  };

  try {
    const res = await subscribeBlog(data);

    if (res.data[0].email === email.value) {
      subscriptionSuccess.value = true;
    }
  } catch (error) {
    console.error(error);
  }

  openModal();
};
</script>

<template>
  <div class="bg-gray py-6 px-4 rounded-xl w-full">
    <form class="flex flex-col gap-8" @submit.prevent="onSubmitSubscribe">
      <div class="text-primary font-bold text-2xl">訂閱代買幫Blog</div>

      <div>
        <input
          v-model="nickName"
          placeholder="請輸入您的代稱*"
          class="w-full bg-white border rounded-lg p-3"
          :class="{
            'border-error': error.nickName,
            'border-gray-300': !error.nickName,
          }"
        />

        <div v-if="error.nickName" class="form-error">
          <span>
            <ErrorIcon />
            代稱不可留空
          </span>
        </div>
      </div>

      <div>
        <input
          v-model="email"
          placeholder="請輸入您的email*"
          class="w-full bg-white border rounded-lg p-3"
          :class="{
            'border-error': error.nickName,
            'border-gray-300': !error.nickName,
          }"
        />

        <div v-if="error.email" class="form-error">
          <span>
            <ErrorIcon />
            請輸入有效的信箱
          </span>
        </div>
      </div>

      <button
        type="submit"
        class="bg-[#5974FF] text-white py-3 rounded-lg cursor-pointer"
      >
        立即訂閱
      </button>
    </form>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" class="relative z-10" @close="closeModal">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-3xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-xl font-medium leading-6 text-gray-900"
                >
                  <span v-if="subscriptionSuccess"> 你已成功訂閱 </span>
                  <span v-else>訂閱失敗，請稍後重試</span>
                </DialogTitle>

                <div class="mt-4">
                  <button
                    type="button"
                    class="rounded-full w-full bg-[#01CBCB] text-white py-3 px-4"
                    @click="closeModal"
                  >
                    確定
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
