<template>
  <!-- Banner Section -->
  <div class="relative h-[150px] sm:h-[200px] w-full">
    <img src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&h=300&fit=crop" alt="Banner"
      class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="text-center text-white p-6 max-w-2xl">
        <h1 class="text-3xl font-bold mb-2">دورات خيط وإبرة</h1>
        <p class="text-lg">اكتشف مجموعتنا الواسعة من الدورات التدريبية المتخصصة</p>
      </div>
    </div>
  </div>

  <!-- Filters and Search Section -->
  <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
    <!-- Use shared filter component with user configuration -->
    <CourseFilterBar
      :admin-mode="false"
      @apply-filters="handleFilterChange"
      @clear-filters="clearFilters"
    />

    <!-- Course Cards Grid -->
    <div v-if="isLoading && !courses.length" class="text-center p-8">جاري التحميل...</div>
    <div v-else-if="filteredCourses.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-8 relative">
      <CourseCard
        v-for="course in filteredCourses"
        :key="course.id"
        :course="course"
      />
      <div v-if="isLoading" class="col-span-full flex justify-center items-center p-4">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="3" />
      </div>
    </div>

    <!-- No Results Message -->
    <div v-else
      class="flex flex-col items-center justify-center py-8 sm:py-16 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <i class="pi pi-search-minus text-3xl mb-4 text-gray-400"></i>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">لا توجد نتائج</h3>
      <p class="text-gray-600 dark:text-gray-400 text-center mb-4">
        لم نتمكن من العثور على أي دورات تطابق معايير البحث الخاصة بك
      </p>
      <Button label="مسح جميع الفلاتر" icon="pi pi-filter-slash" severity="secondary" @click="clearAllFilters" />
    </div>
  </div>

  <PurchaseConfirmDialog v-if="selectedCourseId" type="course" v-model="showPurchaseDialog"
    :course-id="selectedCourseId"  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Button, ProgressSpinner } from "primevue";
import { useCourseStore } from '@/stores/courseStore'; // Use unified store
import PurchaseConfirmDialog from '../components/PurchaseConfirmDialog.vue';
import { useToast } from 'primevue/usetoast';
import CourseCard from '../components/CourseCard.vue';
import CourseFilterBar from '@/components/CourseFilterBar.vue';

const courseStore = useCourseStore();
const { loading: isLoading, courses } = storeToRefs(courseStore);
const router = useRouter();
const toast = useToast();

// Add these refs for purchase dialog
const showPurchaseDialog = ref(false);
const selectedCourseId = ref(null);

// Use the reactive courses from the store
const filteredCourses = computed(() => courses.value);

onMounted(() => {
  // Make sure to set user mode in the store
  courseStore.setAdminMode(false);
  courseStore.fetchCourses();

  // Add scroll event listener for infinite scrolling
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Handler for the filter component's filter changes
function handleFilterChange(queryParams) {
  console.log('Filter applied with params:', queryParams);
  courseStore.resetPagination();
  courseStore.fetchFilteredCourses(queryParams);
}

function clearFilters() {
  courseStore.resetPagination();
  courseStore.fetchCourses();
}

function clearAllFilters() {
  clearFilters();
}

// Handle infinite scrolling
const handleScroll = () => {
  const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;

  if (bottom && !isLoading.value && courseStore.pagination.hasMore) {
    courseStore.loadMore();
  }
};




</script>

<style scoped>
.card {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

:deep(.p-progress-spinner) {
  width: 50px;
  height: 50px;
}

:deep(.p-progress-spinner-circle) {
  stroke: var(--primary-color);
  stroke-width: 3;
}
</style>
