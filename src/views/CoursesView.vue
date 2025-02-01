<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Banner Section -->
    <div class="relative h-[200px] w-full">
      <img src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&h=300&fit=crop" alt="Banner" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white p-6 max-w-2xl">
          <h1 class="text-3xl font-bold mb-2">دورات خيط وإبرة</h1>
          <p class="text-lg">اكتشف مجموعتنا الواسعة من الدورات التدريبية المتخصصة</p>
        </div>
      </div>
    </div>

    <!-- Filters and Search Section -->
    <div class="container mx-auto px-4 py-8">


      <!-- Course Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8 relative">
        <div v-for="(course) in filteredCourses" :key="course.id"
          class="card p-0 rounded-lg shadow-md relative flex flex-col self-start h-full bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div class="relative">
            <img :src="course.image" :alt="course.title" class="w-full h-48 object-cover rounded" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 via-100% to-surface-0 to-80% opacity-100 dark:via-gray-100/[0.2] dark:to-gray-800">
            </div>
            <div class="relative w-full flex flex-col justify-center items-center rounded-md p-1">
              <p class="text-lg font-bold mb-1 text-right text-gray-900 dark:text-gray-100">{{ course.title }}</p>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">{{ course.description }}</p>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-yellow-500">{{ course.rating }}⭐</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">({{ course.students }} طالب)</span>
              </div>
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
            <div class="flex flex-col items-center mb-2">
              <p class="text-gray-500 dark:text-gray-400 line-through text-xs mb-1" v-if="course.discount">
                {{ course.originalPrice }} ريال سعودي
              </p>
              <p class="text-black dark:text-white font-bold text-sm">
                {{ course.discountedPrice || course.originalPrice }} ريال سعودي
              </p>
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
import { Button } from "primevue";
import { InputText, InputGroup,InputGroupAddon } from "primevue";

const searchQuery = ref("");

const courses = ref([
  {
    id: 1,
    title: "التطريز اليدوي للمبتدئين",
    description: "تعلم أساسيات التطريز اليدوي خطوة بخطوة",
    image: "https://images.unsplash.com/photo-1738230077816-fbab6232c545?w=500&h=300&fit=crop",
    originalPrice: "299",
    rating: 4.8,
    students: 1234,
    currency: "ريال سعودي"
  },
  {
    id: 2,
    title: "الخياطة المتقدمة",
    description: "تقنيات احترافية في الخياطة والتفصيل",
    image: "https://images.unsplash.com/photo-1738273473785-99c1fc498c14?w=500&h=300&fit=crop",
    originalPrice: "399",
    discountedPrice: "299",
    discount: 25,
    rating: 4.9,
    students: 856,
    currency: "ريال سعودي"
  },
  {
    id: 3,
    title: "تصميم الأزياء الرقمي",
    description: "ابتكار تصاميم رقمية احترافية",
    image: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=500&h=300&fit=crop",
    originalPrice: "499",
    rating: 4.7,
    students: 2156,
    currency: "ريال سعودي"
  },
  {
    id: 4,
    title: "الكروشيه للمحترفين",
    description: "تعلم تقنيات الكروشيه المتقدمة",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=300&fit=crop",
    originalPrice: "349",
    discountedPrice: "279",
    discount: 20,
    rating: 4.6,
    students: 1567,
    currency: "ريال سعودي"
  },
  {
    id: 5,
    title: "تصميم الأنماط والنقوش",
    description: "إنشاء نقوش وأنماط مميزة للأقمشة",
    image: "https://plus.unsplash.com/premium_photo-1700346339061-9755dcc26bd9?w=500&h=300&fit=crop",
    originalPrice: "199",
    rating: 4.5,
    students: 989,
    currency: "ريال سعودي"
  }
]);
// re add same courses to test the search functionality with iterator in loop
for (let i = 0; i < 3; i++) {
  courses.value.push(...courses.value);
}
const filteredCourses = computed(() => {
  return courses.value.filter(course =>
    course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.card {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

:deep(.p-inputgroup) {
  direction: rtl;
}
</style>
