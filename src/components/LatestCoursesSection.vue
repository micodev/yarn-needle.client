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
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">إشتراكات العضوية</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">إشترك بعضويتك الآن وأحصل على وصول غير محدود</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
      <div v-if="membershipStore.isLoading" class="col-span-4 text-center">
        <i class="pi pi-spin pi-spinner text-3xl"></i>
      </div>
      <div v-else-if="membershipStore.error" class="col-span-4 text-center text-red-500">
        {{ membershipStore.error }}
      </div>
      <MembershipCard
        v-else
        v-for="(plan,index) in membershipStore.getMemberships"
        :key="plan.id"
        :plan="plan"
        :IsSpecialMembership="index == 1"
        @subscribe="handleSubscription"
      />
    </div>

    <PurchaseConfirmDialog
      v-if="selectedCourseId"
      v-model="showPurchaseDialog"
      :course-id="selectedCourseId"
      :type="purchaseType"
      @purchase-success="handlePurchaseSuccess"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useToast } from 'primevue/usetoast';
import { useMembershipStore } from '@/stores/membership';
import { useCoursesStore } from '@/stores/courses';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import PurchaseConfirmDialog from './PurchaseConfirmDialog.vue';
import CourseCard from './CourseCard.vue';
import MembershipCard from './MembershipCard.vue';

const membershipStore = useMembershipStore();
const coursesStore = useCoursesStore();
const authStore = useAuthStore();
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

const handleSubscription = async (plan) => {
  if (!authStore.hasProfile) {
    toast.add({
      severity: 'warn',
      summary: 'تنبيه',
      detail: 'يجب إكمال معلومات حسابك الشخصي قبل الاشتراك',
      life: 3000
    });
    return;
  }

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
  await Promise.all([
    membershipStore.fetchMemberships(),
    coursesStore.fetchRecentCourses()
  ]);
});
</script>
