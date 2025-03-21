<template>
  <div
    :class="['card p-0 rounded-lg shadow-md relative flex flex-col min-h-[420px]', 'bg-slate-50 dark:bg-gray-800']"
  >
    <div class="relative p-3 flex-grow">
      <img :src="course.image" alt="Course Image" class="w-full h-40 object-cover rounded" />
      <div class="relative w-full flex flex-col justify-center items-center rounded-md p-2">
        <p class="text-xl font-bold mb-2 text-right text-gray-900 dark:text-gray-100">{{ course.title }}</p>
        <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{{ course.description }}</p>
      </div>
      <div class="absolute top-5 left-4 px-2 w-full">
        <!-- discount badge only -->
        <div class="flex justify-end">
          <span
            v-if="course.discount"
            class="text-white font-bold text-center content-center rounded-md px-4 py-1 bg-primary bg-opacity-45 backdrop-blur-md border border-primary border-opacity-50 shadow-md dark:bg-primary dark:bg-opacity-45 dark:text-white"
          >
            {{ course.discount }}%
          </span>
        </div>
      </div>
    </div>
    <div class="p-4 mt-auto">
      <div class="flex flex-row justify-center mb-2">
        <p class="text-black dark:text-white font-bold text-base align-middle ml-2" v-if="course.discount">
          <SARSymbol :value="getDiscountedPrice(course)" />
        </p>
        <p class="text-black dark:text-white font-bold text-base" v-if="!course.discount">
          <SARSymbol :value="course.originalPrice" />
        </p>
        <p class="text-gray-500 dark:text-gray-400 line-through ml-2 content-center text-sm" v-if="course.discount">
          <SARSymbol :value="course.originalPrice" :line-through="true" />
        </p>
      </div>
      <div class="flex flex-row gap-1">
        <Button
          v-if="!course.purchased && !course.isSubscribtionIncluded"
          label="شراء"
          icon="pi pi-shopping-cart"
          class="h-8 flex-1"
          severity="primary"
          @click="onPurchaseClick(course.id)"
        />
        <Button
          v-if="course.isSubscribtionIncluded && !course.purchased"
          label="إضافة للمكتبة"
          class="h-8 flex-1"
          severity="success"
          @click="onAddCourse(course.id)"
        />
        <Button
          label="فتح الدورة"
          v-if="course.purchased"
          class="h-8 flex-1"
          severity="primary"
          @click="onNavigateToDetails(course.id)"
        />
        <Button
          v-if="!course.purchased"
          label="التفاصيل"
          class="h-8 flex-1"
          severity="primary"
          outlined
          @click="onNavigateToDetails(course.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from "primevue";
import SARSymbol from './SARSymbol.vue';

const { course } = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['purchase', 'add-course', 'navigate-details']);

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
  emit('purchase', courseId);
};

const onAddCourse = (courseId) => {
  emit('add-course', courseId);
};

const onNavigateToDetails = (courseId) => {
  emit('navigate-details', courseId);
};
</script>
