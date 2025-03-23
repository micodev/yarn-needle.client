<template>
  <div class="latest-courses-section py-16 pr-2">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">أحدث الدورات التدريبية</h2>
      <p class="text-md text-gray-600 dark:text-gray-400">دورات مصممة لتطوير مهاراتك في مجالات متعددة</p>
    </div>
    <div class="mobile-courses-container pb-4">
      <div class="flex md:flex-wrap md:gap-8 gap-4 relative md:justify-center nowrap">
        <div v-if="coursesStore.isLoading" class="w-full text-center">
          <i class="pi pi-spin pi-spinner text-3xl"></i>
        </div>
        <div v-else-if="coursesStore.error" class="w-full text-center text-red-500">
          {{ coursesStore.error }}
        </div>
        <div v-else v-for="(course) in coursesStore.getRecentCourses" :key="course.title"
          class="w-4/5 flex-shrink-0 md:flex-shrink md:w-[calc(33.33%-1.5rem)] lg:w-[calc(20%-1.5rem)]">
          <CourseCard
            :course="course"
            @purchase="handlePurchaseClick"
            @add-course="handleAddCourse"
            @navigate-details="navigateToDetails"
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
      @purchase-success="handlePurchaseSuccess"
    />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useToast } from 'primevue/usetoast';
import { useCoursesStore } from '@/stores/courses';
import { useRouter } from 'vue-router';
import PurchaseConfirmDialog from './PurchaseConfirmDialog.vue';
import CourseCard from './CourseCard.vue';

const coursesStore = useCoursesStore();
const router = useRouter();
const toast = useToast();
const purchaseType = ref('course');

// Add these refs for purchase dialog
const showPurchaseDialog = ref(false);
const selectedCourseId = ref(null);

// Add these methods for handling purchase and navigation
const handlePurchaseClick = (courseId) => {
  selectedCourseId.value = courseId;
  showPurchaseDialog.value = true;
  purchaseType.value = 'course';
};

const handlePurchaseSuccess = () => {
  // You can add success notification or refresh course data if needed
};

const navigateToDetails = (courseId) => {
  router.push({ name: 'course', params: { id: courseId }});
};



const handleAddCourse = async (courseId) => {
  try {
    await coursesStore.enrollCourse(courseId);
    toast.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تم إضافة الدورة إلى مكتبتك',
      life: 3000
    });
  } catch  {
    toast.add({
      severity: 'error',
      summary: 'خطأ',
      detail: 'حدث خطأ أثناء إضافة الدورة',
      life: 3000
    });
  }
};

onMounted(async () => {
  await coursesStore.fetchRecentCourses();
});
</script>

<style scoped>
.mobile-courses-container {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  overflow-x: auto;
}

.mobile-courses-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

@media (max-width: 768px) {
  .nowrap {
    flex-wrap: nowrap;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .mobile-courses-container {
    overflow-x: visible;
  }
}
</style>
