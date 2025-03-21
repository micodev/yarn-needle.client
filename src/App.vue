<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppFooter from './layout/AppFooter.vue';

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.init()
})
</script>

<template>
  <div id="app">
    <!-- Your header components -->
    <main>
      <!-- Your router-view or main content -->
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

