<template>
  <div
    :class="['card p-0 rounded-lg relative flex flex-col h-full transition-transform duration-300 ease-in-out transform-gpu origin-center md:hover:scale-105 hover:z-10 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/30', 'border-2 shadow-inner border-primary-100 dark:border-2 dark:border-zinc-700 dark:bg-gray-800']"
  >
    <div class="relative p-3 sm:p-2 flex-grow">
      <img :src="course.image" alt="Course Image" class="w-full h-40 sm:h-36 object-cover rounded" />
      <div class="relative w-full flex flex-col justify-center items-center rounded-md p-2 sm:p-1">
        <p class="text-lg sm:text-base font-bold mb-2 sm:mb-1 text-right text-gray-900 dark:text-gray-100">{{ course.title }}</p>
        <!-- Rating component - moved above description -->
        <div v-if="!course.purchased" class="flex items-center gap-2 w-full justify-center mb-2 sm:mb-1">
          <Rating v-model="localRating" readonly disabled :cancel="false" class="cursor-default direction-rtl sm:scale-90" />
          <span class="text-gray-600 dark:text-gray-400 text-sm sm:text-xs flex items-center">
            <i class="pi pi-users ml-2"></i>
            {{ course.students || 0 }}
          </span>
        </div>
        <!-- Progress information for enrolled courses -->
        <div v-if="course.purchased" class="flex justify-between items-center w-full mb-2 text-xs sm:text-sm">
          <span class="text-sm text-gray-600 dark:text-gray-400">{{ course.lessonCount }} درس</span>
          <span class="text-sm text-gray-600 dark:text-gray-400">{{ formattedDuration }}</span>
        </div>
        <div class="relative w-full h-[4.5rem] mb-2 sm:mb-1 overflow-hidden">
          <p class="text-gray-700 dark:text-gray-300 text-sm sm:text-xs text-ellipsis">
            {{ truncatedDescription }}
          </p>
          <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white dark:to-gray-800"></div>
        </div>
      </div>
      <div class="absolute top-5 left-4 px-2 w-full">
        <!-- discount badge only -->
        <div class="flex justify-end">
          <span
            v-if="course.discount && !course.purchased"
            class="text-white font-bold text-center content-center rounded-md px-4 py-1 sm:px-2 sm:py-0.5 sm:text-sm bg-primary bg-opacity-45 backdrop-blur-md border border-primary border-opacity-50 shadow-md dark:bg-primary dark:bg-opacity-45 dark:text-white"
          >
            {{ course.discount }}%
          </span>
        </div>
      </div>
    </div>
    <div class="p-4 pt-2 sm:p-2 sm:pt-1">
      <!-- Price section - only for non-enrolled courses -->
      <div v-if="!course.purchased" class="flex flex-row justify-center mb-2 sm:mb-1" :class="{'opacity-0': course.purchased}">
        <p class="text-black dark:text-white font-bold text-base sm:text-sm align-middle ml-2" v-if="course.discount">
          <SARSymbol :value="getDiscountedPrice(course)" />
        </p>
        <p class="text-black dark:text-white font-bold text-base sm:text-sm" v-if="!course.discount">
          <SARSymbol :value="course.originalPrice" />
        </p>
        <p class="text-gray-500 dark:text-gray-400 line-through ml-2 content-center text-sm sm:text-xs" v-if="course.discount">
          <SARSymbol :value="course.originalPrice" :line-through="true" />
        </p>
      </div>

      <!-- Buttons for regular course view -->
      <div v-if="!course.purchased" class="flex flex-row gap-1">
        <Button
          v-if="!course.purchased && !course.isSubscribtionIncluded"
          label="شراء"
          icon="pi pi-shopping-cart"
          class="h-8 sm:h-7 flex-1 text-sm sm:text-xs"
          severity="primary"
          @click="onPurchaseClick(course.id)"
        />
        <Button
          v-if="course.isSubscribtionIncluded && !course.purchased"
          label="إضافة للمكتبة"
          class="h-8 sm:h-7 flex-1 text-sm sm:text-xs"
          severity="success"
          @click="onAddCourse(course.id)"
        />
        <Button
          label="التفاصيل"
          icon="pi pi-eye"
          class="h-8 sm:h-7 flex-1 text-sm sm:text-xs"
          severity="primary"
          outlined
          @click="onNavigateToDetails(course.id)"
        />
      </div>

      <!-- Buttons for enrolled course view -->
      <div v-if="course.purchased" class="flex gap-2 flex-col sm:flex-row">
        <Button
          label="التفاصيل"
          icon="pi pi-eye"
          class="h-8 sm:h-7 flex-1 text-sm sm:text-xs"
          severity="primary"
          @click="onNavigateToDetails(course.id)"
        />
        <Button
          label="معلومات الاتصال"
          class="h-8 sm:h-7 flex-1 text-sm sm:text-xs"
          severity="primary"
          outlined
          @click="onShowSocials(course)"
        />
      </div>
    </div>
    <SocialMediaDialog v-model="isDialogVisible" :courseData="selectedCourse" />
    <ToastTemplate ref="toastRef" />
    <PurchaseConfirmDialog
      v-if="selectedCourseId"
      v-model="showPurchaseDialog"
      :course-id="selectedCourseId"
      :type="purchaseType"
    />
  </div>

</template>

<script setup>
import { Button, Rating } from "primevue";
import SARSymbol from './SARSymbol.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import SocialMediaDialog from './SocialMediaDialog.vue';
import ToastTemplate from './ToastTemplate.vue';
import { useRouter } from 'vue-router';
import { useCoursesStore } from '@/stores/courses';
import PurchaseConfirmDialog from './PurchaseConfirmDialog.vue';
const router = useRouter();
const coursesStore = useCoursesStore();
const isDialogVisible = ref(false);
const selectedCourse = ref(null);
const toastRef = ref(null);
const showPurchaseDialog = ref(false);
const selectedCourseId = ref(null);

const purchaseType = ref('course');
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
  // Removed enrolled prop since we're now using course.purchased
});

// Create a local copy of the rating to avoid mutating the prop
const localRating = ref(props.course.rating);
const screenSize = ref('md'); // Default to medium

// Computed property for truncated description based on screen size
const truncatedDescription = computed(() => {
  if (!props.course.description) return '';

  const charLimits = {
    'xs': 200,
    'sm': 200,
    'md': 90,
    'lg': 100,
    'xl': 200
  };

  const limit = charLimits[screenSize.value];
  return props.course.description.length > limit
    ? props.course.description.substring(0, limit) + '...'
    : props.course.description;
});

// Update screen size based on window width
const updateScreenSize = () => {
  const width = window.innerWidth;
  if (width < 640) screenSize.value = 'xs';
  else if (width < 768) screenSize.value = 'sm';
  else if (width < 1024) screenSize.value = 'md';
  else if (width < 1280) screenSize.value = 'lg';
  else screenSize.value = 'xl';
};

// Set up resize listener
onMounted(() => {
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});

// Clean up resize listener
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});


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

const onPurchaseClick = (courseId) => {
  selectedCourseId.value = courseId; // Set the selected course ID
  showPurchaseDialog.value = true;
  purchaseType.value = 'course';
};

const onAddCourse = async (courseId) => {
  try {
    await coursesStore.enrollCourse(courseId);
    toastRef.value.showTemplate('success', 'تم إضافة الدورة إلى مكتبتك', 3000);
  } catch  {
    toastRef.value.showTemplate('error', 'حدث خطأ أثناء إضافة الدورة', 3000);
  }
};

const onNavigateToDetails = (courseId) => {
  router.push({ name: 'course', params: { id: courseId } });
};

const onShowSocials = (course) => {
  selectedCourse.value = course;
  isDialogVisible.value = true;
};

// Function to get the correct Arabic text for minutes based on number
const getArabicMinutesText = (minutes) => {
  // In Arabic grammar:
  // - 1 minute uses singular (دقيقة)
  // - 2-10 minutes uses plural (دقائق)
  // - 11 and above has special rules, but for simplicity we'll use singular (دقيقة)
  if (minutes === 1) {
    return 'دقيقة';
  } else if (minutes >= 2 && minutes <= 10) {
    return 'دقائق';
  } else {
    return 'دقيقة';
  }
};

// Add a computed property to format the duration
const formattedDuration = computed(() => {
  if (!props.course.duration) return '';

  const hours = Math.floor(props.course.duration / 60);
  const minutes = props.course.duration % 60;

  const hoursText = hours === 1 ? 'ساعة' : 'ساعات';

  if (minutes === 0) {
    return `${hours} ${hoursText}`;
  } else {
    const minutesText = getArabicMinutesText(minutes);
    return `${hours} ${hoursText} و ${minutes} ${minutesText}`;
  }
});
</script>
