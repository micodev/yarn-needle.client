<template>
  <div class="features-section py-1 px-4 md:px-16 w-100">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="(item, index) in features" :key="index" class="feature text-center p-4">
        <i :class="item.icon + ' text-3xl mb-4 text-primary'"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{{ item.title }}</h3>
        <p class="text-gray-700 dark:text-gray-300">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define features data
const features = ref([
  {
    icon: "pi pi-search",
    title: "اكتشف",
    description: "استكشف مجموعة متنوعة من الدورات والتخصصات."
  },
  {
    icon: "pi pi-check-circle",
    title: "تحقق",
    description: "تحقق من مهاراتك من خلال التقييمات."
  },
  {
    icon: "pi pi-book",
    title: "تعلّم",
    description: "اكتسب المهارات مع المدربين المؤهلين."
  },
  {
    icon: "pi pi-thumbs-up-fill",
    title: "احصل على الشهادة",
    description: "احصل على الشهادات لتعزيز مسيرتك المهنية."
  }
]);
</script>

<style scoped>
</style>
