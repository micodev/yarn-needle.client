<template>
  <wave-background />
  <div class="layout-wrapper bg-zinc-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 z-10">

    <app-topbar></app-topbar>
    <app-sidebar></app-sidebar>
    <div class="layout-main-container md:px-12 lg:px-20">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>

  <Toast />
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
import WaveBackground from '../components/WaveBackground.vue'
</script>
