<template>
  <Dialog  header="نسيت كلمة المرور" pt:mask:class="backdrop-blur-sm" closable v-model:visible="showForgetPasswordDialog" class="w-full md:w-1/3" modal >

    <template v-if="emailSent">
      <p class="text-center mb-4">لقد تم ارسال رابط تحديث الرمز السري لحسابك على الايميل يرجى التحقق من البريد الوارد او الرسائل العشوائىة</p>
      <Button label="إغلاق" @click="closeForgetDialog" class="w-full rounded p-dialog-close-button"  :aria-controls="showForgetPasswordDialog ? 'dlg' : null" aria-label="Close"  :aria-expanded="showForgetPasswordDialog ? true : false" />
    </template>
    <template v-else>
      <form @submit.prevent="sendForgetPasswordLink" class="flex flex-col w-full p-4">
        <p class="text-center mb-4">أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور</p>
        <div class="flex flex-col w-full mb-4">
          <IftaLabel class="w-full">
            <InputText id="forgetEmail" v-model="forgetEmail" placeholder="example@example.com" required class="w-full">
              <template #prefix>
                <i class="pi pi-envelope"></i>
              </template>
            </InputText>
            <label for="forgetEmail">البريد الإلكتروني</label>
          </IftaLabel>
        </div>
        <Button label="إرسال رابط إعادة تعيين كلمة المرور" type="submit" class="w-full rounded" />
      </form>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Button, InputText, IftaLabel, Dialog } from 'primevue';

const showForgetPasswordDialog = ref(false);
const forgetEmail = ref('');
const emailSent = ref(false);

const closeForgetDialog = () => {
  showForgetPasswordDialog.value = false;
  forgetEmail.value = '';
  emailSent.value = false;
};

const showForgetPassword = () => {
  showForgetPasswordDialog.value = true;
};

defineExpose({ showForgetPassword });

const sendForgetPasswordLink = () => {
  console.log('Sending forget password link to:', forgetEmail.value);
  // Add your logic to send the forget password link here
  emailSent.value = true;
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
