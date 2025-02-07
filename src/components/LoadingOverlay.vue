<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <ProgressSpinner class="w-16 h-16" strokeWidth="4" fill="var(--surface-ground)" />
    <span class="text-white text-xl mr-4">جاري التحميل...</span>
  </div>
</template>

<script setup>
import { ProgressSpinner } from 'primevue';
</script>
