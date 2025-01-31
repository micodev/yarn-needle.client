<template>
  <div>
    <Button label="تسجيل الدخول" class="h-10" @click="showDialog = true" />
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
        <Button label="تسجيل الدخول" type="submit" class="w-full text-white rounded" />
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
        <Button label="إنشاء حساب" type="submit" class="w-full text-white rounded" />
      </form>
    </Dialog>
    <ForgetPassword ref="forgetPasswordRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button, Dialog, InputText, Password, IftaLabel } from 'primevue';
import ForgetPassword from './ForgetPassword.vue';
const showDialog = ref(false);
const showRegisterForm = ref(false);
const email = ref('');
const password = ref('');
const registerUsername = ref('');
const registerEmail = ref('');
const registerPassword = ref('');

const handleSubmit = () => {
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  showDialog.value = false;
};

const handleRegister = () => {
  console.log('Register Username:', registerUsername.value);
  console.log('Register Email:', registerEmail.value);
  console.log('Register Password:', registerPassword.value);
  showRegisterForm.value = false;
};

const openRegisterDialog = () => {
  showDialog.value = false;
  showRegisterForm.value = true;
};



const forgetPasswordRef = ref(null);

const showForgetPassword = () => {
  showDialog.value = false;
  forgetPasswordRef.value.showForgetPassword();
};

</script>

<style scoped>
.p-field {
  margin-bottom: 1rem;
}
</style>
