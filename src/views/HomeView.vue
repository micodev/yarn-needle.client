<template>
  <div class="hero-section flex flex-col md:flex-row items-center py-16 px-4 md:px-16 bg-slate-50 dark:bg-gray-900">
    <div class="md:w-1/2 p-4">
      <img src="https://placehold.co/600x400" alt="Illustrative placeholder" class="w-full" />
    </div>
    <div class="text-center md:text-right md:w-1/2 p-4">
      <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">منصة خيط وإبرة <span class="block mt-1">نحيك مستقبلك.. بخيوط الموهبة</span></h1>
      <p class="text-xl mb-6 text-gray-700 dark:text-gray-300">اكتشف الدورات المتنوعة وابدأ رحلتك التعليمية معنا</p>
      <div class="flex justify-center md:justify-end gap-1">
        <Button label="استكشف جميع الدورات" class="h-10 mb-6 flex-auto" @click="router.push('/courses')" />

      </div>
    </div>
  </div>
  <div class="features-section py-1 px-4 md:px-16 bg-slate-50 dark:bg-gray-900">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="feature text-center p-4">
        <i class="pi pi-search text-4xl mb-4 text-primary"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">اكتشف</h3>
        <p class="text-gray-700 dark:text-gray-300">استكشف مجموعة متنوعة من الدورات والتخصصات.</p>
      </div>
      <div class="feature text-center p-4">
        <i class="pi pi-check-circle text-4xl mb-4 text-primary"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">تحقق</h3>
        <p class="text-gray-700 dark:text-gray-300">تحقق من مهاراتك من خلال التقييمات.</p>
      </div>
      <div class="feature text-center p-4">
        <i class="pi pi-book text-4xl mb-4 text-primary"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">تعلّم</h3>
        <p class="text-gray-700 dark:text-gray-300">اكتسب المهارات مع المدربين المؤهلين.</p>
      </div>
      <div class="feature text-center p-4">
        <i class="pi pi-thumbs-up-fill text-4xl mb-4 text-primary"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">احصل على الشهادة</h3>
        <p class="text-gray-700 dark:text-gray-300">احصل على الشهادات لتعزيز مسيرتك المهنية.</p>
      </div>
    </div>
  </div>
  <div class="latest-courses-section py-16 px-4 md:px-16 bg-slate-50 dark:bg-gray-900">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">أحدث الدورات التدريبية</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">دورات مصممة لتطوير مهاراتك في مجالات متعددة</p>
    </div>
    <div class="flex flex-wrap gap-8 mb-12 relative justify-center">
      <div v-if="coursesStore.isLoading" class="w-full text-center">
        <i class="pi pi-spin pi-spinner text-4xl"></i>
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
        <i class="pi pi-spin pi-spinner text-4xl"></i>
      </div>
      <div v-else-if="membershipStore.error" class="col-span-4 text-center text-red-500">
        {{ membershipStore.error }}
      </div>
      <div v-else v-for="plan in membershipStore.getMemberships" :key="plan.id"
        :class="[
          'plan-card p-6 rounded-lg shadow-inner flex flex-col justify-between h-full',
          plan.code === 'GOLD' ? 'gold-membership bg-blue-100 dark:bg-blue-900 border-2 border-blue-500' : 'bg-slate-100 dark:bg-gray-800'
        ]">
        <div>
          <div class="flex items-center mb-4">
            <i :class="[plan.iconClass, plan.code === 'GOLD' ? 'text-blue-600 dark:text-blue-400' : '']" class="text-lg ml-3"></i>
            <h3 :class="['text-2xl font-bold', plan.code === 'GOLD' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-900 dark:text-gray-100']">
              {{ plan.title }}
              <span v-if="plan.code === 'GOLD'" class="text-sm font-normal bg-blue-500 text-white px-2 py-1 rounded-full mr-2">مميز</span>
            </h3>
          </div>
          <ul class="text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li v-for="(point, index) in plan.features" :key="index">{{ point }}</li>
          </ul>
        </div>
        <div class="mt-auto">
          <p :class="['text-lg font-bold mb-4', plan.code === 'GOLD' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-900 dark:text-gray-100']">
            <SARSymbol :value="plan.price" :showUnit="true" />
          </p>
          <Button
            :label="plan.code === 'GOLD' ? 'إشترك الآن (العضوية المميزة)' : 'إشترك الآن'"
            icon="pi pi-arrow-left"
            :class="['h-10 w-full', plan.code === 'GOLD' ? 'p-button-primary' : '']"
            :severity="plan.code === 'GOLD' ? 'info' : 'primary'"
            @click="handleSubscription(plan)"
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
import { Button } from "primevue";
import { useToast } from 'primevue/usetoast';
import { useMembershipStore } from '@/stores/membership';
import { useCoursesStore } from '@/stores/courses';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import PurchaseConfirmDialog from '../components/PurchaseConfirmDialog.vue';
import SARSymbol from '../components/SARSymbol.vue';
import CourseCard from '../components/CourseCard.vue';

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

<style scoped>
.gold-membership {
  transform: scale(1.05);
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

.gold-membership:hover {
  transform: scale(1.07);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.7);
}
</style>
