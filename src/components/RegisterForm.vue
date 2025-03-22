<template>
  <div>
    <Button v-if="!authStore.isAuthenticated" label="تسجيل الدخول" class="h-10" @click="showDialog = true" />
    <Dialog header="مرحبًا بك!" modal v-model:visible="showDialog" class="w-full md:w-1/3">
      <form @submit.prevent="handleSubmit" class="flex flex-col w-full p-4">
        <p class="text-center mb-4">تسجيل الدخول للمتابعة</p>
        <div class="flex flex-col w-full mb-4">
          <IftaLabel class="w-full">
            <InputText id="email" v-model="email" placeholder="example@example.com" required class="w-full">
              <template #prefix>
                <i class="pi pi-user"></i>
              </template>
            </InputText>
            <label for="email">البريد الإلكتروني</label>
          </IftaLabel>
        </div>
        <div class="flex flex-col w-full mb-4">
          <IftaLabel class="w-full">
            <Password id="password" toggleMask v-model="password" placeholder="********" required fluid>
              <template #prefix>
                <i class="pi pi-lock"></i>
              </template>
            </Password>
            <label for="password">كلمة السر هنا</label>
          </IftaLabel>
        </div>
        <p class="text-center text-primary mb-4 cursor-pointer" @click="showForgetPassword">هل نسيت كلمة المرور؟</p>
        <Button label="تسجيل الدخول" type="submit" class="w-full text-white rounded" :loading="loading" />
        <p class="text-center mt-4">ليس لديك حساب؟ <Button variant="text" class="cursor-pointer" @click="openRegisterDialog">حساب جديد</Button></p>
      </form>
    </Dialog>
    <Dialog header="إنشاء حساب جديد" modal v-model:visible="showRegisterForm" class="w-full md:w-1/3">
      <form @submit.prevent="handleRegister" class="flex flex-col w-full p-4">
        <p class="text-center mb-4">إنشاء حساب جديد للمتابعة</p>
        <div class="flex flex-col w-full mb-4">
          <IftaLabel class="w-full">
            <InputText id="registerUsername" v-model="registerUsername" placeholder="exampleuser" required class="w-full">
              <template #prefix>
                <i class="pi pi-user"></i>
              </template>
            </InputText>
            <label for="registerUsername">اسم المستخدم</label>
          </IftaLabel>
        </div>
        <div class="flex flex-col w-full mb-4">
          <IftaLabel class="w-full">
            <InputText id="registerEmail" v-model="registerEmail" placeholder="example@example.com" required class="w-full">
              <template #prefix>
                <i class="pi pi-envelope"></i>
              </template>
            </InputText>
            <label for="registerEmail">البريد الإلكتروني</label>
          </IftaLabel>
        </div>
        <div class="flex flex-col w-full mb-4">
          <IftaLabel class="w-full">
            <Password id="registerPassword" toggleMask v-model="registerPassword" placeholder="********" required fluid>
              <template #prefix>
                <i class="pi pi-lock"></i>
              </template>
            </Password>
            <label for="registerPassword">كلمة السر هنا</label>
          </IftaLabel>
        </div>
        <Button label="إنشاء حساب" type="submit" class="w-full text-white rounded" :loading="loading" />
      </form>
    </Dialog>
    <ForgetPassword ref="forgetPasswordRef" />
    <ToastTemplate ref="toast" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button, Dialog, InputText, Password, IftaLabel } from 'primevue';
import ForgetPassword from './ForgetPassword.vue';
import { useAuthStore } from '@/stores/auth';
import ToastTemplate from './ToastTemplate.vue';

const authStore = useAuthStore();
const toast = ref(null);
const loading = ref(false);

const showDialog = ref(false);
const showRegisterForm = ref(false);
const email = ref('');
const password = ref('');
const registerUsername = ref('');
const registerEmail = ref('');
const registerPassword = ref('');

// Expose showDialog to parent components
defineExpose({ showDialog });

const handleSubmit = async () => {
  loading.value = true;
  try {
    const result = await authStore.login({
      email: email.value,
      username: email.value,
      password: password.value
    });

    if (result.success) {
      // toast.add({ severity: 'success', summary: 'نجاح', detail: 'تم تسجيل الدخول بنجاح' });
      showDialog.value = false;
    } else {
      toast.value.showTemplate('error', 'خطأ: ' + (result.errors || 'فشل تسجيل الدخول'));
    }
  } catch  {
    toast.value.showTemplate('error', 'خطأ: حدث خطأ غير متوقع');
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  loading.value = true;
  try {
    const result = await authStore.register({
      username: registerUsername.value,
      email: registerEmail.value,
      password: registerPassword.value
    });

    if (result.success) {
      toast.value.showTemplate('success', 'نجاح: تم إنشاء الحساب بنجاح');
      showRegisterForm.value = false;
      email.value = registerEmail.value;
      password.value = registerPassword.value;
      // Automatically login after successful registration
      await handleSubmit();
    } else {
      toast.value.showTemplate('error', 'خطأ: ' + (result.errors || 'فشل إنشاء الحساب'));
    }
  } catch  {
    toast.value.showTemplate('error', 'خطأ: حدث خطأ غير متوقع');
  } finally {
    loading.value = false;
  }
};

const openRegisterDialog = () => {
  showDialog.value = false;
  showRegisterForm.value = true;
};

const forgetPasswordRef = ref(null);

const showForgetPassword = async () => {
  showDialog.value = false;
  if (email.value) {
    try {
      const result = await authStore.forgotPassword(email.value);
      if (result.success) {
        toast.value.showTemplate('success', 'نجاح: تم إرسال رابط إعادة تعيين كلمة المرور');
      } else {
        toast.value.showTemplate('error', 'خطأ: ' + (result.errors || 'فشل إرسال رابط إعادة تعيين كلمة المرور'));
      }
    } catch  {
      toast.value.showTemplate('error', 'خطأ: حدث خطأ غير متوقع');
    }
  }
  forgetPasswordRef.value.showForgetPassword();
};

</script>

<style scoped>
.p-field {
  margin-bottom: 1rem;
}
</style>
