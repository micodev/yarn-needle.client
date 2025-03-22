<template>
  <div class="card dark:bg-gray-800 dark:text-white bg-gray-200 text-black transition-colors duration-300">
    <Menubar :model="items">
      <template #start>
        <img src="@/../public/favicon.svg" alt="شعار" class="h-10" />

      </template>

      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple
           class="flex items-center"
           v-bind="props.action"
           :class="{ 'active-link': isActiveRoute(item.route) }">
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

          <template v-if="!authStore.isAuthenticated">
            <RegisterForm />
          </template>

          <Avatar v-if="authStore.isAuthenticated" :label="authStore.userInitials" shape="circle"
            class="bg-primary text-white dark:text-black cursor-pointer" @click="toggleProfileMenu" aria-haspopup="true"
            aria-controls="overlay_menu" />
          <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true">
            <template #start>
            </template>
          </Menu>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { Menubar, Menu, Avatar, Button, Badge } from "primevue";
import RegisterForm from "@/components/RegisterForm.vue";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Define all menu items
const allMenuItems = [
  {
    label: 'الرئيسية',
    icon: 'pi pi-home',
    route: '/',
    command: () => {
      router.push('/');
    },
  },
  {
    label: 'الدورات',
    icon: 'pi pi-home',
    route: '/courses',
    command: () => {
      router.push('/courses');
    },
  },
  {
    label: 'دوراتي',
    icon: 'pi pi-book',
    route: '/my-courses',
    requiresAuth: true,
    command: () => {
      router.push('/my-courses');
    },
  },
  {
    label: 'الطلبات',
    icon: 'pi pi-shopping-cart',
    route: '/order-history',
    requiresAuth: true,
    command: () => {
      router.push('/order-history');
    },
  },
  {
    label: 'حول خيط وإبرة',
    icon: 'pi pi-info-circle',
    route: '/about',
    command: () => {
      router.push('/about');
    },
  },
];

// Computed property that filters items based on authentication status
const items = computed(() => {
  return allMenuItems.filter(item => !item.requiresAuth || authStore.isAuthenticated);
});

const menu = ref();
const menuItems = ref([
  {
    items: [
      {
        label: authStore.user?.userName || 'الملف الشخصي',
        icon: 'pi pi-user',
        class: 'font-bold',
        command: () => {
          router.push('/profile'); // Add navigation to profile page
          menu.value.hide();
        }
      },
      { separator: true },
      {
        label: 'تسجيل الخروج',
        icon: 'pi pi-power-off',
        command: () => {
          authStore.logout();
          // Optionally close the menu after logout
          menu.value.hide();
        }
      }
    ]
  }
]);

// Function to check if menu item matches current route
const isActiveRoute = (itemRoute) => {
  console.log(route.path, itemRoute);
  if (!itemRoute) return false;
  return route.path === itemRoute;
};

const toggleProfileMenu = (event) => {
  menu.value.toggle(event);
};

const isDarkMode = ref(false);

// Function to apply theme based on current state
const applyTheme = () => {
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

// Initialize dark mode from localStorage or system preference
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value);
  applyTheme();
};

onMounted(() => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true';
  applyTheme();
});
</script>

<style>
/* add padding padding: 21px; to avatar */
.p-avatar {
  padding: 21px;
}

.p-menu-submenu-label {
  /* remove padding */
  padding: 0 !important;
}
</style>
