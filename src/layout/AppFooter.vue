<template>
  <footer class="py-4  dark:bg-gray-800 dark:text-white bg-gray-200 text-black transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <div class="text-sm">
          &copy; {{ currentYear }} منصة خيط وإبرة. جميع الحقوق محفوظة.
        </div>
        <div class="flex space-x-4">
          <Button label="سياسة الخصوصية" class="p-button-secondary p-button-text" />
          <Button label="شروط الخدمة" class="p-button-secondary p-button-text" />
          <Button icon="pi pi-instagram" variant="text" />
          <Button icon="pi pi-telegram" variant="text" />
          <Button icon="pi pi-twitter" variant="text" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Button } from 'primevue';

const currentYear = new Date().getFullYear();
</script>


