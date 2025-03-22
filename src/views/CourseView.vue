<template>
  <Toast />
  <div v-if="course">
    <div class="flex flex-col md:flex-row  p-4 md:p-8 h-full">
      <div class="w-full md:flex-1 flex justify-center items-center md:ml-2 h-auto">
        <div class="relative rounded overflow-hidden w-full">
          <img :src="course.image" alt="Course Thumbnail" class="w-full h-full object-cover rounded">
          <div class="absolute inset-0 right-2 top-2 flex flex-col gap-y-1" v-if="!course.purchased">
            <span>
              <span class=" bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 px-2 rounded">
                {{ course.isSubscribtionIncluded ? "مشمول بعضويتك" : "غير مشمول بعضويتك" }} </span>
            </span>
            <span>
              <span v-if="course.subscriptionIncludedNames.length > 0 && !course.isSubscribtionIncluded"
                class=" bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 px-2 rounded">
                {{"العضويات المشمولة : " +  course.subscriptionIncludedNames.join("، ") }}
              </span>
            </span>
          </div>

        </div>
      </div>
      <div class="w-full md:flex-1 flex flex-col justify-center mt-4 md:mt-0">
        <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ course.title }}</h1>
        <div class="text-gray-700 dark:text-gray-300 mb-4 flex flex-row space-x-4 gap-x-4">
          <div class="flex items-center">
            <i class="pi pi-book ml-2"></i>
            <p>{{ course.lessonCount }} درس</p>
          </div>
          <div class="flex items-center">
            <i class="pi pi-user ml-2"></i>
            <p>{{ course.level }}</p>
          </div>
          <div class="flex items-center">
            <i class="pi pi-clock ml-2"></i>
            <p>{{ formattedDuration }}</p>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <img :src="course.instructorImage" alt="Instructor" class="rounded-full w-12 h-12 ml-2">
          <p class="text-lg text-gray-900 dark:text-gray-100">تقديم {{ course.instructor }}</p>
        </div>
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">سجل بهذه الدورة واحصل على:</h2>
        <ul class="list-disc list-inside mb-2 text-gray-900 dark:text-gray-100">
          <li v-for="award in course.awards" :key="award">{{ award }}</li>
        </ul>

        <p v-if="!authStore.isAuthenticated" class="text-xl mb-2 text-gray-900 dark:text-gray-100">
          سجل للحصول على الدورة
        </p>
        <p v-else-if="!course.purchased" class="text-xl mb-2 text-gray-900 dark:text-gray-100">
          {{ course.isSubscribtionIncluded ? 'أضف الدورة إلى حسابك' : 'امتلك الدورة بـ' }}
        </p>
        <p v-else class="text-xl mb-2 text-transparent">.</p>
        <Button
          :label="!authStore.isAuthenticated
            ? 'سجل للحصول على الدورة'
            : course.purchased
              ? 'معلومات التواصل'
              : course.isSubscribtionIncluded
                ? 'أضف الدورة'
                : `${course.originalPrice} ${course.currency}`"
          :icon="course.purchased ? 'pi pi-arrow-left' : ''"
          @click="handleCourseAction" />
      </div>
    </div>
    <div class="flex flex-col md:flex-row  p-4 md:p-8 h-full mt-8">
      <div class="w-full md:w-3/4">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">محتوى الدورة</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">{{ course.description }}</p>
        <Fieldset legend="محاور الدورة" :toggleable="true" :collapsed="true" class="mb-4">
          <ul class="list-disc list-inside mb-2 text-gray-900 dark:text-gray-100">
            <li v-for="topic in course.topics" :key="topic">{{ topic }}</li>
          </ul>
        </Fieldset>
        <Fieldset legend="نتائج الدورة" :toggleable="true" :collapsed="true" class="mb-4">
          <ul class="list-disc list-inside mb-2 text-gray-900 dark:text-gray-100">
            <li v-for="result in course.results" :key="result">{{ result }}</li>
          </ul>
        </Fieldset>
        <Fieldset legend="الفئة المستهدفة" :toggleable="true" :collapsed="true" class="mb-4">
          <ul class="list-disc list-inside mb-2 text-gray-900 dark:text-gray-100">
            <li v-for="audience in course.targetAudience" :key="audience">{{ audience }}</li>
          </ul>
        </Fieldset>
        <Fieldset legend="التقييمات والتعليقات" :toggleable="true" :collapsed="true">
          <div v-for="comment in displayedComments" :key="comment.id" class="mb-4 bg-primary-50 dark:border-2 dark:bg-transparent p-2 rounded">
            <div class="flex items-center mb-2">
              <img v-if="isValidImageUrl(comment.avatar)" :src="comment.avatar" alt="User Avatar" class="rounded-full w-8 h-8 ml-2">
              <i v-else class="pi pi-user rounded-full ml-2 flex items-center justify-center "></i>
              <div>
                <p class="text-lg text-gray-900 dark:text-gray-100">{{ comment.name }}</p>
                <Rating :model-value="comment.rating" readonly :stars="5" cancel="false" />
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300">{{ comment.text }}</p>
          </div>
          <div class="flex justify-center my-4 relative">
            <hr class="w-full border-t border-gray-300 dark:border-gray-700 absolute top-1/2">
            <Button v-if="showMoreButton" label="عرض المزيد" severity="primary" size="small" class="w-1/4"
              @click="showMoreComments" />
          </div>
          <div v-if="!hasAlreadyCommented" class="mt-4 flex flex-col space-y-4 justify-center">
            <template v-if="authStore.isAuthenticated">
              <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">أضف تقييمك وتعليقك</h3>
              <Rating v-model="newComment.rating" :stars="5" cancel="false" />
              <Textarea v-model="newComment.text" class="w-full mt-2 p-2 border rounded"
                placeholder="اكتب تعليقك هنا..." />
              <div>
                <Button v-if="!loading" label="إرسال" class="mt-2 w-1/2" @click="addComment"
                  :disabled="!newComment.rating || !newComment.text" />
                <ProgressSpinner v-else class="mt-2" />
              </div>
            </template>
            <template v-else>
              <div class="text-center">
                <p class="text-gray-700 dark:text-gray-300 mb-4">يجب تسجيل الدخول لإضافة تعليق</p>
                <router-link to="/" class="text-primary">
                  <Button label="تسجيل الدخول" severity="primary" />
                </router-link>
              </div>
            </template>
          </div>
        </Fieldset>
      </div>
      <div class="w-full md:w-1/4 p-4 mt-4 md:mt-0">
        <div class="mb-4" v-if="course != null && course.sponsorLogos && course.sponsorLogos.length > 0">
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">الجهة الراعية</h3>
          <div class="flex space-x-2 gap-2">
            <img v-for="(logo, index) in course.sponsorLogos" :key="index" :src="logo" alt="Sponsor Logo"
              class="w-10 h-10 rounded-lg object-contain">
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">معلومات المدرب</h3>
          <div class="flex items-center mb-2">
            <img :src="course.instructorImage" alt="Instructor" class="rounded-full w-12 h-12 ml-2">
            <div>
              <p class="text-lg text-gray-900 dark:text-gray-100">{{ course.instructor }}</p>
              <p class="text-sm text-gray-700 dark:text-gray-300">مدرب</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
    <ProgressSpinner />
  </div>

  <!-- Add the SocialMediaDialog component -->
  <SocialMediaDialog
    v-model="showSocialDialog"
    :courseData="course"
  />

  <!-- Add RegisterForm component -->
  <RegisterForm ref="registerFormRef" />
</template>

<script setup>
import { computed, watch, onUnmounted, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Button, Fieldset, Rating, Textarea, ProgressSpinner, Toast } from 'primevue';
import { useToast } from 'primevue/usetoast';
import { useCourseStore } from '@/stores/course';
import { useCommentsStore } from '@/stores/comments';
import { useAuthStore } from '@/stores/auth';
import SocialMediaDialog from '@/components/SocialMediaDialog.vue';
import RegisterForm from '@/components/RegisterForm.vue';

const route = useRoute();
const courseStore = useCourseStore();
const commentsStore = useCommentsStore();
const authStore = useAuthStore();
const showSocialDialog = ref(false);
const registerFormRef = ref(null);

const course = computed(() => courseStore.course);
const displayedComments = computed(() => commentsStore.displayedComments);
const showMoreButton = computed(() => commentsStore.showMoreButton);
const newComment = computed(() => commentsStore.newComment);
const loading = computed(() => commentsStore.loading);
const hasAlreadyCommented = computed(() => commentsStore.error === "already_commented");
const toast = useToast();

// Fetch course and comments when component is mounted and watch for route changes
const fetchCourseAndComments = async (id) => {
  if (id) {
    await courseStore.fetchCourse(id);

    if (authStore.isAuthenticated) {
      await commentsStore.fetchComments(id);
    }
  }
};
onMounted(async () => {
  await fetchCourseAndComments(route.params.id);
});

watch(
  () => route.params.id,
  async (newId) => {
    await fetchCourseAndComments(newId);
  }
);

// Clear course data and reset comments when component is unmounted
onUnmounted(() => {
  courseStore.clearCourse();
});

// Modify addComment to include user info
const addComment = async () => {
  if (!authStore.isAuthenticated) {
    toast.add({
      severity: 'warn',
      summary: 'تنبيه',
      detail: 'يجب تسجيل الدخول لإضافة تعليق',
      life: 3000
    });
    return;
  }

  // Add user info to comment
  const commentWithUser = {
    ...newComment.value,
    userName: authStore.user?.userName,
    userImage: authStore.user?.profileImage || '/default-avatar.png'
  };

  await commentsStore.addComment(route.params.id, commentWithUser);
};

const showMoreComments = () => commentsStore.showMoreComments(route.params.id);
// Watch for errors in comments store and show toast notification
watch(
  () => commentsStore.error,
  (error) => {
    if (error == "already_commented") {
      toast.add({
        severity: 'error',
        summary: 'خطأ',
        detail: 'لقد قمت بتقييم هذه الدورة مسبقاً',
        life: 3000
      });
    }
  }
);

const handleCourseAction = async () => {
  if (!authStore.isAuthenticated) {
    // Open RegisterForm dialog instead of redirecting
    registerFormRef.value.showDialog = true;
    return;
  }

  if (course.value.purchased) {
    // Show social media dialog for purchased courses
    showSocialDialog.value = true;
  } else if (course.value.isSubscribtionIncluded) {
    try {
      await courseStore.enrollCourse(course.value.id);
      toast.add({
        severity: 'success',
        summary: 'تم بنجاح',
        detail: 'تم إضافة الدورة إلى مكتبتك',
        life: 3000
      });
      // Refresh course data
      await courseStore.fetchCourse(route.params.id);
    } catch  {
      toast.add({
        severity: 'error',
        summary: 'خطأ',
        detail: 'حدث خطأ أثناء إضافة الدورة',
        life: 3000
      });
    }
  } else {
    // Handle purchase flow
    // Add your purchase logic here
  }
};

// Inside the <script setup> section, add the isValidImageUrl function
const isValidImageUrl = (url) => {
  if (!url) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
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
  if (!course.value) return '';

  const hours = Math.floor(course.value.duration / 60);
  const minutes = course.value.duration % 60;

  const hoursText = hours === 1 ? 'ساعة' : 'ساعات';

  if (minutes === 0) {
    return `${hours} ${hoursText}`;
  } else {
    const minutesText = getArabicMinutesText(minutes);
    return `${hours} ${hoursText} و ${minutes} ${minutesText}`;
  }
});
</script>

<style>
.p-fieldset-toggle-button {
  background-color: var(--primary-color) !important;
}
.p-fieldset {
  background-color: var(--primary-color) !important;
  padding-bottom: 0px;
}
</style>
