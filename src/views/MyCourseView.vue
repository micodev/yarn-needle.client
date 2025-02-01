<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Banner Section -->
    <div class="relative h-[150px] sm:h-[200px] w-full">
      <img src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&h=300&fit=crop" alt="Banner" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white p-6 max-w-2xl">
          <h1 class="text-3xl font-bold mb-2">دوراتي</h1>
          <p class="text-lg">تابع تقدمك في الدورات المسجلة</p>
        </div>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div class="flex flex-col gap-3 mb-4 sm:mb-8">
        <div class="w-full">
          <InputGroup>
            <InputText v-model="searchQuery" placeholder="ابحث في دوراتي..." type="text" size="small" />
            <InputGroupAddon class="h-9">
              <Button icon="pi pi-search" size="small" severity="secondary" variant="text" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <!-- Course Cards Grid -->
      <div v-if="filteredCourses.length > 0"
           class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-8">
        <div v-for="course in filteredCourses" :key="course.id"
             class="card p-0 rounded-lg shadow-md relative flex flex-col bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div class="relative">
            <img :src="course.image" :alt="course.title" class="w-full h-36 sm:h-48 object-cover rounded-t-lg" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 via-100% to-surface-0 to-80% opacity-100 dark:via-gray-100/[0.2] dark:to-gray-800">
            </div>
            <div class="absolute top-2 right-2">
              <Tag :severity="getProgressSeverity(course.progress)" :value="course.progress + '%'" />
            </div>
          </div>

          <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{{ course.title }}</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">{{ course.description }}</p>

            <div class="mt-auto">
              <ProgressBar :value="course.progress" class="mb-3" />
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ course.completedLessons }}/{{ course.totalLessons }} درس</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ course.duration }} ساعات</span>
              </div>
              <Button label="متابعة التعلم" icon="pi pi-play" class="w-full" />
            </div>
          </div>
        </div>
      </div>

      <!-- No Courses Message -->
      <div v-else class="flex flex-col items-center justify-center py-8 sm:py-16 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <i class="pi pi-book text-4xl mb-4 text-gray-400"></i>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">لا توجد دورات</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4">
          لم يتم العثور على أي دورات مسجلة
        </p>
        <Button
          label="استكشف الدورات"
          icon="pi pi-search"
          @click="$router.push('/courses')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Button, ProgressBar, Tag } from 'primevue';
import { InputText, InputGroup, InputGroupAddon } from 'primevue';

const searchQuery = ref('');

// Sample data for purchased courses
const myCourses = ref([
  {
    id: 1,
    title: "الجوانب الأربع لجودة الحياة",
    description: "تعلم كيفية تحسين جودة حياتك من خلال فهم الجوانب الأربعة الرئيسية",
    image: "https://placehold.co/600x400",
    progress: 75,
    completedLessons: 12,
    totalLessons: 18,
    duration: 6,
    instructor: "عبدالله الخليفة",
  },
  {
    id: 2,
    title: "التطريز اليدوي للمبتدئين",
    description: "تعلم أساسيات التطريز اليدوي خطوة بخطوة",
    image: "https://images.unsplash.com/photo-1738230077816-fbab6232c545?w=500&h=300&fit=crop",
    progress: 30,
    completedLessons: 3,
    totalLessons: 10,
    duration: 8,
    instructor: "سارة أحمد",
  },
  // Add more courses as needed
]);

const filteredCourses = computed(() => {
  return myCourses.value.filter(course =>
    course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const getProgressSeverity = (progress) => {
  if (progress < 30) return 'warning';
  if (progress < 70) return 'info';
  return 'success';
};
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

:deep(.p-progressbar) {
  height: 0.5rem;
}

/* Mobile-specific styles */
@media (max-width: 640px) {
  .card {
    max-width: 100%;
  }
}
</style>
