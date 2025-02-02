<template>
  <div class="flex flex-col md:flex-row bg-white dark:bg-gray-900 text-black dark:text-white p-4 md:p-8 h-full">
    <div class="w-full md:flex-1 flex justify-center items-center md:ml-2 h-auto">
      <div class="relative rounded overflow-hidden w-full">
        <img :src="course.image" alt="Course Thumbnail" class="w-full h-full object-cover rounded">
        <div class="absolute inset-0 right-2 top-2">
          <span class=" bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 px-2 rounded">{{
            course.subscriptionStatus }}</span>
        </div>
        <!-- <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Button icon="pi pi-play" class="p-button-rounded"   severity="primary"  raised />
        </div> -->
      </div>
    </div>
    <div class="w-full md:flex-1 flex flex-col justify-center mt-4 md:mt-0">
      <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ course.title }}</h1>
      <div class="text-gray-700 dark:text-gray-300 mb-4 flex flex-row space-x-4 gap-x-4">
        <div class="flex items-center">
          <i class="pi pi-book ml-2"></i>
          <p>{{ course.lessons }} درس</p>
        </div>
        <div class="flex items-center">
          <i class="pi pi-user ml-2"></i>
          <p>{{ course.level }}</p>
        </div>
        <div class="flex items-center">
          <i class="pi pi-clock ml-2"></i>
          <p>{{ course.duration }} ساعات</p>
        </div>
      </div>
      <div class="flex items-center mb-8">
        <img :src="course.instructorImage" alt="Instructor" class="rounded-full ml-2">
        <p class="text-lg text-gray-900 dark:text-gray-100">تقديم {{ course.instructor }}</p>
      </div>
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">سجل بهذه الدورة واحصل على:</h2>
      <ul class="list-disc list-inside mb-8 text-gray-900 dark:text-gray-100">
        <li v-for="award in course.awards" :key="award">{{ award }}</li>
      </ul>

      <p v-if="!course.purchased" class="text-xl mb-2 text-gray-900 dark:text-gray-100">امتلك الدورة بـ</p>
      <p v-else class="text-xl mb-2 text-transparent">.</p>
      <Button :label="course.purchased ? 'ابدأ الآن' : course.price"
        :icon="course.purchased ? 'pi pi-arrow-left' : ''" />
    </div>
  </div>
  <div class="flex flex-col md:flex-row bg-white dark:bg-gray-900 text-black dark:text-white p-4 md:p-8 h-full mt-8">
    <div class="w-full md:w-3/4">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">محتوى الدورة</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">{{ course.content }}</p>
      <Fieldset legend="محاور الدورة" :toggleable="true" :collapsed="true" class="mb-4">
        <ul class="list-disc list-inside mb-8 text-gray-900 dark:text-gray-100">
          <li v-for="topic in course.topics" :key="topic">{{ topic }}</li>
        </ul>
      </Fieldset>
      <Fieldset legend="نتائج الدورة" :toggleable="true" :collapsed="true" class="mb-4">
        <ul class="list-disc list-inside mb-8 text-gray-900 dark:text-gray-100">
          <li v-for="result in course.results" :key="result">{{ result }}</li>
        </ul>
      </Fieldset>
      <Fieldset legend="الفئة المستهدفة" :toggleable="true" :collapsed="true" class="mb-4">
        <ul class="list-disc list-inside mb-8 text-gray-900 dark:text-gray-100">
          <li v-for="audience in course.targetAudience" :key="audience">{{ audience }}</li>
        </ul>
      </Fieldset>
      <Fieldset legend="التقييمات والتعليقات" :toggleable="true" :collapsed="true">
        <div v-for="comment in displayedComments" :key="comment.id" class="mb-4">
          <div class="flex items-center mb-2">
            <img :src="comment.avatar" alt="User Avatar" class="rounded-full w-8 h-8 ml-2">
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
        <div class="mt-4 flex flex-col space-y-4 justify-center">
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">أضف تقييمك وتعليقك</h3>
          <Rating v-model="newComment.rating" :stars="5" cancel="false" />
          <Textarea v-model="newComment.text" class="w-full mt-2 p-2 border rounded" placeholder="اكتب تعليقك هنا..." />
          <div>
            <Button v-if="!loading" label="إرسال" class="mt-2 w-1/2" @click="addComment" />
            <ProgressSpinner v-else class="mt-2" />
          </div>
        </div>
      </Fieldset>
    </div>
    <div class="w-full md:w-1/4 p-4 mt-4 md:mt-0">
      <div class="mb-4">
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
</template>

<script setup>
import { computed, watch } from 'vue';
import { Button, Fieldset, Rating, Textarea, ProgressSpinner } from 'primevue';
import { useCourseStore } from '@/stores/course';
import { newComment, displayedComments, showMoreButton, addComment, showMoreComments, updateDisplayedComments, loading } from '@/stores/comments';

const courseStore = useCourseStore();
const course = computed(() => courseStore.course);

// Watch for changes in comments and update the displayed count accordingly.
watch(() => course.value.comments, () => {
  updateDisplayedComments();
});

</script>

<style scoped>
:deep(.text-gray-900) {
  color: var(--p-text-color);
}

:deep(.text-gray-700) {
  color: var(--p-text-muted-color);
}

:deep(.bg-white) {
  background-color: var(--p-surface-0);
}

:deep(.dark\:bg-gray-800) {
  background-color: var(--p-surface-800);
}

:deep(.border-gray-200) {
  border-color: var(--p-content-border-color);
}

:deep(.dark\:border-gray-700) {
  border-color: var(--p-content-border-color);
}
</style>
