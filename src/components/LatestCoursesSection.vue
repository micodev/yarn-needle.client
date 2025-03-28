<template>
  <div class="latest-courses-section py-16 pr-2">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">أحدث الدورات التدريبية</h2>
      <p class="text-md text-gray-600 dark:text-gray-400">دورات مصممة لتطوير مهاراتك في مجالات متعددة</p>
    </div>
    <div class="mobile-courses-container pb-4 overflow-x-auto md:overflow-x-visible">
      <div class="flex md:flex-wrap md:gap-4 gap-4 relative md:justify-center nowrap">
        <div v-if="coursesStore.isLoading" class="w-full text-center">
          <i class="pi pi-spin pi-spinner text-3xl"></i>
        </div>
        <div v-else-if="coursesStore.error" class="w-full text-center text-red-500">
          {{ coursesStore.error }}
        </div>
        <div v-else v-for="(course) in coursesStore.getRecentCourses" :key="course.title"
          class=" w-4/5 flex-shrink-0 md:flex-shrink md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
          <CourseCard
            :course="course"
          />
        </div>
      </div>
    </div>
  </div>

  <PurchaseConfirmDialog
      v-if="selectedCourseId"
      v-model="showPurchaseDialog"
      :course-id="selectedCourseId"
      :type="purchaseType"
    />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCoursesStore } from '@/stores/courses';
import PurchaseConfirmDialog from './PurchaseConfirmDialog.vue';
import CourseCard from './CourseCard.vue';

const coursesStore = useCoursesStore();
const purchaseType = ref('course');

// Add these refs for purchase dialog
const showPurchaseDialog = ref(false);
const selectedCourseId = ref(null);






onMounted(async () => {
  await coursesStore.fetchRecentCourses();
});
</script>

<style scoped>
.mobile-courses-container {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

.mobile-courses-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

@media (max-width: 768px) {
  .nowrap {
    flex-wrap: nowrap;
  }
}
</style>
