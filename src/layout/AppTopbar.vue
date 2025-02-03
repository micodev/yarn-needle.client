<template>
  <div class="card  dark:bg-gray-800 dark:text-white bg-gray-200 text-black transition-colors duration-300">
    <Menubar :model="items">
      <template #start>
        <img src="@/../public/favicon.svg" alt="Logo" class="h-10" />
        <InputGroup class="w-64 mr-2 hidden sm:flex">
            <InputGroupAddon class="h-9">
              <i class="pi pi-search"></i>
            </InputGroupAddon>
            <InputText placeholder="إسم الدورة" size="small" class="h-9" />

        </InputGroup>
      </template>

      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut
            }}</span>
          <i v-if="hasSubmenu"
            :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" @click="toggleDarkMode" class="h-10" />

          <!-- Show either login/register or user info -->
          <template v-if="!authStore.isAuthenticated">
            <Dialog v-model:visible="visible" modal header="تسجيل حساب جديد" class="w-[90vw] md:w-[50vw]">
              <div class="flex flex-col gap-4">
                <span class="p-float-label">
                  <InputText id="username" v-model="form.username" class="w-full" />
                  <label for="username">اسم المستخدم</label>
                </span>
                <span class="p-float-label">
                  <InputText id="email" v-model="form.email" type="email" class="w-full" />
                  <label for="email">البريد الإلكتروني</label>
                </span>
                <span class="p-float-label">
                  <Password id="password" v-model="form.password" class="w-full" toggleMask />
                  <label for="password">كلمة المرور</label>
                </span>
                <Button label="تسجيل" @click="handleRegister" :loading="loading" />
              </div>
            </Dialog>
            <Button label="تسجيل حساب" @click="visible = true" />
          </template>

          <template v-else>
            <Button icon="pi pi-user" :label="authStore.user?.username" class="p-button-text" />
            <Button icon="pi pi-power-off" @click="handleLogout" class="p-button-danger" />
          </template>

          <Avatar v-if="authStore.isAuthenticated"
                 image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                 shape="circle" />
        </div>
      </template>

    </Menubar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Menubar } from "primevue";
import { InputText } from "primevue";
import { Avatar } from "primevue";
import { Button } from "primevue";
import { Badge } from "primevue";
import { InputGroup } from "primevue";
import { InputGroupAddon } from "primevue";
import { Dialog } from "primevue/dialog";
import { Password } from "primevue/password";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore();
const toast = useToast();
const visible = ref(false);
const loading = ref(false);

const form = ref({
  username: '',
  email: '',
  password: ''
});

const handleRegister = async () => {
  loading.value = true;
  try {
    const result = await authStore.register(form.value);
    if (result.success) {
      toast.add({ severity: 'success', summary: 'نجاح', detail: 'تم تسجيل الحساب بنجاح' });
      visible.value = false;
      // Automatically login after registration
      await authStore.login({
        email: form.value.email,
        password: form.value.password
      });
    } else {
      toast.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تسجيل الحساب' });
    }
  } finally {
    loading.value = false;
  }
};

const handleLogout = () => {
  authStore.logout();
  toast.add({ severity: 'info', summary: 'تم تسجيل الخروج', detail: 'تم تسجيل خروجك بنجاح' });
};

const items = ref([
  {
    label: 'الدورات',
    icon: 'pi pi-home'
  },
  {
    label: 'العضويات',
    icon: 'pi pi-search',
  }
]);

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};
</script>
