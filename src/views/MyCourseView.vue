<template>

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
        <i class="pi pi-spin pi-spinner text-3xl text-blue-500"></i>
        <p class="mt-2 text-gray-600">جاري تحميل الدورات...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="courseStore.error" class="text-center py-8">
        <i class="pi pi-exclamation-circle text-3xl text-red-500"></i>
        <p class="mt-2 text-red-600">{{ courseStore.error }}</p>
        <Button label="إعادة المحاولة" icon="pi pi-refresh" @click="courseStore.fetchMyCourses()" class="mt-4" />
      </div>

      <!-- Course Grid -->
      <div v-else-if="courseStore.hasCourses"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CourseCard
          v-for="course in courseStore.courses"
          :key="course.id"
          :course="course"
          @navigate-details="$router.push(`/course/${$event}`)"

        />
      </div>

      <!-- No Courses Message -->
      <div v-else
        class="flex flex-col items-center justify-center py-8 sm:py-16 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <i class="pi pi-book text-3xl mb-4 text-gray-400"></i>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">لا توجد دورات</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4">
          لم يتم العثور على أي دورات مسجلة
        </p>
        <Button label="استكشف الدورات" icon="pi pi-search" @click="$router.push('/courses')" />
      </div>
    </div>


  <!-- Social Media Dialog Component -->
  <SocialMediaDialog v-model="isDialogVisible" :courseData="selectedCourse" />
</template>

<script setup>
import { onMounted } from 'vue';
import { Button } from 'primevue';
import { useMyCourseStore } from '@/stores/myCourses';
import SocialMediaDialog from '@/components/SocialMediaDialog.vue';
import CourseCard from '@/components/CourseCard.vue';

const courseStore = useMyCourseStore();


onMounted(() => {
  courseStore.fetchMyCourses();
});
</script>


