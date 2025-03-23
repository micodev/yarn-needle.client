<template>
  <div class="features-section py-1 px-4 md:px-16 w-100">
    <!-- Desktop view: grid layout -->
    <div class="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="(item, index) in features" :key="`desktop-${index}`" class="feature text-center p-4">
        <i :class="item.icon + ' text-3xl mb-4 text-primary'"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{{ item.title }}</h3>
        <p class="text-gray-700 dark:text-gray-300">{{ item.description }}</p>
      </div>
    </div>

    <!-- Mobile view: one-by-one with fade effect -->
    <div class="block sm:hidden">
      <transition name="fade" mode="out-in">
        <div :key="`mobile-${activeFeatureIndex}`" class="feature text-center p-4">
          <i :class="features[activeFeatureIndex].icon + ' text-3xl mb-4 text-primary'"></i>
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{{ features[activeFeatureIndex].title }}</h3>
          <p class="text-gray-700 dark:text-gray-300">{{ features[activeFeatureIndex].description }}</p>
        </div>
      </transition>

      <!-- Navigation dots -->
      <div class="flex justify-center mt-4">
        <button v-for="(_, index) in features" :key="index"
                @click="activeFeatureIndex = index"
                class="mx-1 w-3 h-3 rounded-full transition-colors"
                :class="index === activeFeatureIndex ? 'bg-primary' : 'bg-gray-300'">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Define features data
const features = ref([
  {
    icon: "pi pi-search",
    title: "اكتشف",
    description: "استكشف مجموعة متنوعة من الدورات والتخصصات."
  },
  {
    icon: "pi pi-check-circle",
    title: "تحقق",
    description: "تحقق من مهاراتك من خلال التقييمات."
  },
  {
    icon: "pi pi-book",
    title: "تعلّم",
    description: "اكتسب المهارات مع المدربين المؤهلين."
  },
  {
    icon: "pi pi-thumbs-up-fill",
    title: "احصل على الشهادة",
    description: "احصل على الشهادات لتعزيز مسيرتك المهنية."
  }
]);

// For mobile view - track active feature
const activeFeatureIndex = ref(0);
let autoChangeInterval = null;

// Auto-change feature every 3 seconds
const startAutoChange = () => {
  autoChangeInterval = setInterval(() => {
    activeFeatureIndex.value = (activeFeatureIndex.value + 1) % features.value.length;
  }, 3000);
};

onMounted(() => {
  startAutoChange();
});

onBeforeUnmount(() => {
  clearInterval(autoChangeInterval);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
