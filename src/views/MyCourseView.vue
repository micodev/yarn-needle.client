<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Banner Section -->
    <div class="relative h-[150px] sm:h-[200px] w-full">
      <img src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&h=300&fit=crop" alt="Banner"
        class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white p-6 max-w-2xl">
          <h1 class="text-3xl font-bold mb-2">دوراتي</h1>
          <p class="text-lg">تابع تقدمك في الدورات المسجلة</p>
        </div>
      </div>
    </div>

    <!-- Course Cards Grid -->
    <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <!-- Loading State -->
      <div v-if="courseStore.loading" class="text-center py-8">
        <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
        <p class="mt-2 text-gray-600">جاري تحميل الدورات...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="courseStore.error" class="text-center py-8">
        <i class="pi pi-exclamation-circle text-4xl text-red-500"></i>
        <p class="mt-2 text-red-600">{{ courseStore.error }}</p>
        <Button label="إعادة المحاولة" icon="pi pi-refresh" @click="courseStore.fetchMyCourses()" class="mt-4" />
      </div>

      <!-- Course Grid -->
      <div v-else-if="courseStore.hasCourses"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="course in courseStore.courses" :key="course.id"
          class="w-full rounded-lg shadow-md relative flex flex-col bg-surface-0 dark:bg-surface-900 transition-all duration-300 ease-in-out hover:shadow-xl sm:hover:-translate-y-1">
          <div class="relative aspect-video">
            <img :src="course.image" :alt="course.title" class="w-full h-full object-cover rounded-t-lg"
              loading="lazy" />
            <div
              class="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 via-100% to-surface-0 to-80% opacity-100 dark:via-gray-100/[0.2] dark:to-gray-800">
            </div>
          </div>

          <div class="p-3 sm:p-4 flex flex-col flex-grow">
            <h3 class="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{{ course.title }}</h3>
            <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-4">{{ course.description }}</p>

            <div class="mt-auto">
              <div class="flex justify-between items-center mb-3 text-xs sm:text-sm">
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ course.completedLessons }}/{{
                  course.totalLessons }} درس</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ course.duration }} ساعات</span>
              </div>
              <div class="flex gap-2 flex-col sm:flex-row">
                <Button label="عرض التفاصيل" icon="pi pi-eye" class="w-full sm:flex-1" severity="primary"
                  @click="$router.push(`/course/${course.id}`)" />
                <Button label="معلومات إضافية" icon="pi pi-info-circle" class="w-full sm:flex-1" severity="secondary"
                  @click="showSocialsDialog(course)" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Courses Message -->
      <div v-else
        class="flex flex-col items-center justify-center py-8 sm:py-16 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <i class="pi pi-book text-4xl mb-4 text-gray-400"></i>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">لا توجد دورات</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4">
          لم يتم العثور على أي دورات مسجلة
        </p>
        <Button label="استكشف الدورات" icon="pi pi-search" @click="$router.push('/courses')" />
      </div>
    </div>
  </div>

  <!-- Social Media Dialog Component -->
  <SocialMediaDialog v-model="isDialogVisible" :courseData="selectedCourse" />
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { Button } from 'primevue';
import { useMyCourseStore } from '@/stores/myCourses';
import SocialMediaDialog from '@/components/SocialMediaDialog.vue';

const courseStore = useMyCourseStore();
const isDialogVisible = ref(false);
const selectedCourse = ref(null);

const showSocialsDialog = (course) => {
  selectedCourse.value = course;
  isDialogVisible.value = true;
};

onMounted(() => {
  courseStore.fetchMyCourses();
});
</script>

<style scoped>
:deep(.text-gray-900) {
  color: var(--p-text-color);
}

:deep(.text-gray-700) {
  color: var(--p-text-muted-color);
}

:deep(.text-gray-600) {
  color: var(--p-text-muted-color);
}

:deep(.bg-white) {
  background-color: var(--p-surface-0);
}

:deep(.dark) {
  background-color: var(--p-surface-800);
}
</style>
