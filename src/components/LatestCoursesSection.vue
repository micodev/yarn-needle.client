<template>
  <div class="latest-courses-section py-16 px-4 md:px-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">أحدث الدورات التدريبية</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">دورات مصممة لتطوير مهاراتك في مجالات متعددة</p>
    </div>
    <div class="flex flex-wrap gap-8 mb-12 relative justify-center">
      <div v-if="coursesStore.isLoading" class="w-full text-center">
        <i class="pi pi-spin pi-spinner text-3xl"></i>
      </div>
      <div v-else-if="coursesStore.error" class="w-full text-center text-red-500">
        {{ coursesStore.error }}
      </div>
      <div v-else v-for="(course) in coursesStore.getRecentCourses" :key="course.title"
        class="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
        <CourseCard
          :course="course"
          @purchase="handlePurchaseClick"
          @add-course="handleAddCourse"
          @navigate-details="navigateToDetails"
        />
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

const handleSubscription = (plan) => {
  selectedCourseId.value = plan.code;
  showPurchaseDialog.value = true;
  purchaseType.value = 'membership';
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
