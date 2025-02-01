<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Banner Section -->
    <div class="relative h-[200px] w-full"></div>
      <img src="https://placehold.co/1200x300" alt="Banner" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white p-6 max-w-2xl">
          <h1 class="text-3xl font-bold mb-2">دورات خيط وإبرة</h1>
          <p class="text-lg">اكتشف مجموعتنا الواسعة من الدورات التدريبية المتخصصة</p>
        </div>
      </div>
    </div>

    <!-- Filters and Search Section -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        <div class="flex gap-2">
          <Button label="تصفية" icon="pi pi-filter" />
          <Button label="ترتيب" icon="pi pi-sort" severity="secondary" />
        </div>
        <span class="p-input-icon-left flex-1 md:max-w-md">
          <i class="pi pi-search" />
          <InputText v-model="searchQuery" placeholder="ابحث عن الدورات..." class="w-full" />
        </span>
      </div>

      <!-- Course Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
        <div v-for="(course, index) in paddedCourses" :key="course.title"
          class="card p-0 rounded-lg shadow-md relative flex flex-col self-start h-full bg-white dark:bg-gray-800">
          <div class="relative">
            <img :src="course.image" alt="Course Image" class="w-full rounded" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.5] via-20% to-surface-0 to-70% opacity-100 dark:via-gray-100/[0.2] dark:to-gray-800">
            </div>
            <div class="relative w-full flex flex-col justify-center items-center rounded-md p-2">
              <p class="text-xl font-bold mb-2 text-right text-gray-900 dark:text-gray-100">{{ course.title }}</p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">{{ course.description }}</p>
            </div>
            <div class="absolute top-2 px-2 w-full">
              <div class="flex justify-between">
                <Button icon="pi pi-heart" severity="primary" variant="text" />
                <span v-if="course.discount"
                  class="text-green-500 font-bold text-center content-center rounded-md px-2 bg-green-100 bg-opacity-50 dark:bg-green-900">
                  {{course.discount }}%</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between p-4 flex-col mt-auto">
            <div class="flex flex-row justify-center mb-2">
              <p class="text-black dark:text-white font-bold text-base" v-if="course.discountedPrice">
                {{ course.discountedPrice }} ريال سعودي</p>
              <p class="text-black dark:text-white font-bold text-base" v-if="!course.discountedPrice">
                {{ course.originalPrice }} ريال سعودي</p>
              <p class="text-gray-500 dark:text-gray-400 line-through mr-2" v-if="course.discount">
                {{ course.originalPrice }} ريال سعودي</p>
            </div>
            <div class="flex flex-row gap-1">
              <Button label="شراء" class="h-8 flex-1" />
              <Button label="تفاصيل" class="h-8 flex-1" severity="secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Button } from "primevue/button";
import { InputText } from "primevue/inputtext";

const searchQuery = ref("");

const courses = ref([
  {
    title: "دورة المونتاج المتقدم",
    description: "تعلم أدوات و تقنيات المونتاج الحديثة",
    image: "https://placehold.co/300x200",
    originalPrice: "200",
    currency: "ريال سعودي"
  },
  {
    title: "دورة التصوير الفوتوغرافي",
    description: "اكتشف أسرار التصوير باحترافية",
    image: "https://placehold.co/300x200",
    originalPrice: "150",
    discountedPrice: "105",
    discount: 30,
    currency: "ريال سعودي"
  },
  {
    title: "دورة كتابة المحتوى",
    description: "تعلم كتابة المحتوى بشكل احترافي",
    image: "https://placehold.co/300x200",
    originalPrice: "100",
    discountedPrice: "70",
    discount: 30,
    currency: "ريال سعودي"
  }
]);

const longestDescriptionLength = computed(() => {
  return Math.max(...courses.value.map(course => course.description.length));
});

const paddedCourses = computed(() => {
  return courses.value.map(course => {
    const paddingLength = longestDescriptionLength.value - course.description.length;
    return {
      ...course,
      description: course.description + ' '.repeat(paddingLength)
    };
  });
});
</script>
