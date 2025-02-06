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
          <RegisterForm />

          <Avatar label="TA" shape="circle" class="bg-primary text-white dark:text-black" />
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
import RegisterForm from "@/components/RegisterForm.vue";
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
