<template>
  <div class="hero-section flex flex-col md:flex-row items-center py-16 px-4 md:px-16 bg-slate-50 dark:bg-gray-900">
    <div class="md:w-1/2 p-4">
      <img src="https://placehold.co/600x400" alt="Illustrative placeholder" class="w-full" />
    </div>
    <div class="text-center md:text-right md:w-1/2 p-4">
      <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">منصة خيط وإبرة <span class="block mt-1">حيث
          تبدأ مهاراتك في الازدهار</span></h1>
      <p class="text-xl mb-6 text-gray-700 dark:text-gray-300">اكتشف الدورات المتنوعة وابدأ رحلتك التعليمية معنا</p>
      <div class="flex justify-center md:justify-end gap-1">
        <Button label="استكشف جميع الدورات" class="h-10 mb-6 flex-auto" @click="router.push('/courses')" />
        <Button label="حول خيط وإبرة" severity="secondary" class="h-10 mb-6 flex px-5" @click="router.push('/about')" />
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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
      <div v-if="coursesStore.isLoading" class="col-span-3 text-center">
        <i class="pi pi-spin pi-spinner text-4xl"></i>
      </div>
      <div v-else-if="coursesStore.error" class="col-span-3 text-center text-red-500">
        {{ coursesStore.error }}
      </div>
      <div v-else v-for="(course, index) in coursesStore.getRecentCourses" :key="course.title"
        :class="['card p-0 rounded-lg shadow-md relative flex flex-col self-start h-full', 'bg-slate-50 dark:bg-gray-800' ]">
        <div class="relative">
          <img :src="course.image" alt="Course Image" class="w-full rounded" />
          <!-- gradient-->
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.5] via-20% to-surface-0 to-70% opacity-100 dark:via-gray-100/[0.2] dark:to-gray-800">
          </div>
          <div
            class="relative w-full flex flex-col justify-center items-center rounded-md p-2">
            <p class="text-xl font-bold mb-2 text-right text-gray-900 dark:text-gray-100">{{ course.title }}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">{{ course.description }}</p>
          </div>
          <div class="absolute top-2 px-2 w-full">
            <!-- flex-row space between items -->
            <div class="flex justify-between">
              <Button icon="pi pi-heart" severity="primary" variant="text" />
              <span v-if="course.discount"
                class="text-green-500 font-bold text-center content-center rounded-md px-2 bg-primary bg-opacity-50 dark:bg-green-900">{{
                  course.discount }}% </span>
            </div>
          </div>
        </div>
        <div class="flex justify-between p-4 flex-col mt-auto">
          <div class="flex flex-row justify-center mb-2">
            <p class="text-black dark:text-white font-bold text-base align-middle ml-2" v-if="course.discount">{{ getDiscountedPrice(course) }} ريال سعودي</p>
            <p class="text-black dark:text-white font-bold text-base" v-if="!course.discount">{{ course.originalPrice }} ريال سعودي</p>
            <p class="text-gray-500 dark:text-gray-400 line-through ml-2 content-center text-xs" v-if="course.discount">{{ course.originalPrice }} ريال سعودي</p>
          </div>
          <div class="flex flex-row gap-1">
            <Button
              v-if="!course.purchased && !course.isSubscribtionIncluded"
              label="شراء"
              class="h-8 flex-1"
              :severity="index == 1?'contrast':'primary'"
              @click="handlePurchaseClick(course.id)"
            />
            <Button
              v-if="course.isSubscribtionIncluded"
              label="إضافة للمكتبة"
              class="h-8 flex-1"
              severity="success"
              @click="handleAddCourse(course.id)"
            />
            <Button
              label="فتح الدورة"
              v-if="course.purchased"
              class="h-8 flex-1"
              severity="primary"
              @click="navigateToDetails(course.id)"
            />
            <Button
              v-if="!course.purchased"
              label="تفاصيل"
              class="h-8 flex-1"
              severity="secondary"
              @click="navigateToDetails(course.id)"
            />
          </div>
        </div>
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
        class="plan-card p-6 rounded-lg  shadow-inner bg-slate-100 dark:bg-gray-800 flex flex-col justify-between h-full">
        <div>
          <div class="flex items-center mb-4">
            <i :class="plan.iconClass" class="text-lg ml-3"></i>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ plan.title }}</h3>
          </div>
          <ul class="text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li v-for="(point, index) in plan.features" :key="index">{{ point }}</li>
          </ul>
        </div>
        <div class="mt-auto">
          <p class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{{ plan.price }} ريال سعودي / الشهر</p>
          <Button
            label="إشترك الآن"
            icon="pi pi-arrow-left"
            class="h-10 w-full"
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

const membershipStore = useMembershipStore();
const coursesStore = useCoursesStore();
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const purchaseType = ref('course');
const getDiscountedPrice = (course) => {
  if (!course.discount) return course.originalPrice;

  let discountRate = course.discount;
  let originalPrice = course.originalPrice;

  if (discountRate > 1) {
    discountRate /= 100; // Convert percentage to decimal
  }

  // Calculate discount amount
  const discountAmount = originalPrice * discountRate;

  // Calculate discounted price
  const discountedPrice = originalPrice - discountAmount;

  return Math.round(discountedPrice);
};

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
    // Add logic to add course to user's library
    await coursesStore.addCourseToLibrary(courseId);
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
