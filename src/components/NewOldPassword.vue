<template>
  <div class="flex justify-center items-center min-h-screen p-4">
    <Card class="w-full max-w-md p-4">
      <template #title>
        تحديث كلمة المرور
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="flex flex-col w-full">
          <div class="flex flex-col w-full mb-4">
            <IftaLabel class="w-full">
              <Password id="newPassword" toggleMask v-model="newPassword" placeholder="********" required fluid>
                <template #prefix>
                  <i class="pi pi-lock"></i>
                </template>
              </Password>
              <label for="newPassword">كلمة المرور الجديدة</label>
            </IftaLabel>
          </div>
          <div class="flex flex-col w-full mb-4">
            <IftaLabel class="w-full">
              <Password id="confirmPassword" toggleMask v-model="confirmPassword" placeholder="********" required fluid>
                <template #prefix>
                  <i class="pi pi-lock"></i>
                </template>
              </Password>
              <label for="confirmPassword">تأكيد كلمة المرور الجديدة</label>
            </IftaLabel>
          </div>
          <p v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</p>
          <Button label="تحديث كلمة المرور" type="submit" class="w-full text-white rounded" />
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button, Card, Password, IftaLabel } from 'primevue';

const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const handleSubmit = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'كلمات المرور غير متطابقة';
  } else {
    errorMessage.value = '';
    console.log('New Password:', newPassword.value);
    // Add your logic to update the password here
  }
};
</script>

<style scoped>
/* No custom CSS needed, using Tailwind CSS classes */
</style>
