<template>
  <div class="flex flex-col md:flex-row gap-3 mb-4 sm:mb-8">
    <!-- Search input, conditionally shown -->
    <div v-if="showSearch" class="w-full md:w-1/2">
      <InputGroup>
        <InputText v-model="searchQuery" :placeholder="searchPlaceholder" type="text" size="small" />
        <InputGroupAddon :class="adminMode ? 'h-12' : 'h-9'">
          <Button icon="pi pi-search" size="small" severity="secondary" variant="text" @click="applyFilters" />
        </InputGroupAddon>
      </InputGroup>
    </div>

    <!-- Filter buttons -->
    <div class="flex gap-2 overflow-x-auto pb-2 sm:pb-0" :class="showSearch ? 'w-full md:w-1/2 justify-end' : 'w-full justify-between'">
      <slot name="beforeFilters"></slot>

      <Button label="فرز" icon="pi pi-filter" @click="showFilterDialog" :class="{
        'p-button-secondary': !hasActiveFilters,
        'p-button-primary': hasActiveFilters
      }" class="whitespace-nowrap" />

      <Dialog v-model:visible="filterDialogVisible" modal header="فرز" :style="{ width: '90vw', maxWidth: '500px' }"
          :breakpoints="{ '960px': '75vw', '641px': '90vw' }">
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-2">
            <div class="w-1/2">
              <span class="font-medium block mb-2">المجال</span>
              <Select v-model="categoryFilter" :options="categoryOptions" optionLabel="name" optionValue="code"
                placeholder="اختر المجال" class="w-full" :loading="categoryOptionsStore.isLoading" />
            </div>
            <div class="w-1/2">
              <span class="font-medium block mb-2">اختر المستوى</span>
              <Select v-model="levelFilter" :options="levelOptions" filter optionLabel="name" optionValue="value"
                placeholder="جميع المستويات" class="w-full" :loading="isLevelOptionsLoading" />
            </div>
          </div>

          <div class="flex flex-row gap-2">
            <div class="w-1/2">
              <span class="font-medium block mb-2">عدد الدروس</span>
              <Select v-model="lessonRangeFilter" :options="lessonRangeOptions" optionLabel="name"
                optionValue="value" placeholder="اختر عدد الدروس" class="w-full" />
            </div>
            <div class="w-1/2">
              <span class="font-medium block mb-2">نوع الدورة</span>
              <Select v-model="courseTypeFilter" :options="courseTypeOptions" optionLabel="name" optionValue="code"
                placeholder="اختر نوع الدورة" class="w-full" :loading="courseTypeStore.isLoading" />
            </div>
          </div>

          <div>
            <span class="font-medium block mb-2">مدة الدورة (بالساعات)</span>
            <div class="flex flex-row gap-3 items-center">
              <div class="w-1/2">
                <label class="text-sm text-gray-600 block mb-1">الحد الأدنى</label>
                <InputNumber v-model="durationMin" showButtons :min="0" :max="durationMax" class="w-full" :step="1" suffix=" ساعة"
                  @input="onDurationMinChange" />
              </div>
              <div class="w-1/2">
                <label class="text-sm text-gray-600 block mb-1">الحد الأقصى</label>
                <InputNumber v-model="durationMax" showButtons :min="durationMin + 1" :max="maxDuration" class="w-full" :step="1" suffix=" ساعة"
                  @input="onDurationMaxChange" />
              </div>
            </div>
          </div>

          <div>
            <span class="font-medium block mb-2">نطاق السعر</span>
            <Select v-model="priceRangeFilter" :options="priceRangeOptions" optionLabel="name" optionValue="value"
              placeholder="اختر نطاق السعر" class="w-full" />
          </div>

          <Button
            v-if="hasActiveFilters"
            label="مسح التصفية" icon="pi pi-times" severity="secondary" text class="mt-2 w-full justify-center"
            @click="clearFilters" />
        </div>
        <template #footer>
          <Button label="تطبيق" icon="pi pi-check" @click="applyFiltersAndClose" autofocus />
        </template>
      </Dialog>

      <!-- Sort button -->
      <Button label="ترتيب" :icon="selectedSort?.icon || 'pi pi-sort'" @click="toggleSort" severity="secondary"
        :class="{ 'p-button-info': selectedSort }" class="whitespace-nowrap" />
      <Popover ref="sortPopover" appendTo="body">
        <div class="flex flex-col gap-2 w-[240px]">
          <ul class="list-none p-0 m-0 flex flex-col justify-start">
            <li v-for="option in sortOptions" :key="option.value"
              class="flex items-center gap-2 h-[48px] px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors"
              :class="{ 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400': selectedSort?.value === option.value }"
              @click="selectSort(option)">
              <i :class="[option.icon, 'text-lg', selectedSort?.value === option.value ? 'text-primary-500' : '']"></i>
              <span class="text-[14px]">{{ option.name }}</span>
            </li>
          </ul>
          <Button v-if="selectedSort" label="مسح الترتيب" icon="pi pi-times" severity="secondary" text
            class="mt-1 w-full justify-center h-[40px]" @click="clearSort" />
        </div>
      </Popover>

      <slot name="afterFilters"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Button, Dialog, Popover, Select, InputNumber } from 'primevue';
import { InputText, InputGroup, InputGroupAddon } from 'primevue';
import { useLevelOptionsStore } from '@/stores/levelOptions.js';
import { useCategoryOptionsStore } from '@/stores/categoryOptions.js';
import { useCourseTypeStore } from '@/stores/courseType.js';

const props = defineProps({
  adminMode: {
    type: Boolean,
    default: false
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  searchPlaceholder: {
    type: String,
    default: 'ابحث عن الدورات...'
  },
  initialFilters: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['apply-filters', 'clear-filters']);

// Initialize filter states
const searchQuery = ref(props.initialFilters.search || '');
const levelFilter = ref(props.initialFilters.level || null);
const categoryFilter = ref(props.initialFilters.category || null);
const courseTypeFilter = ref(props.initialFilters.courseType || null);
const lessonRangeFilter = ref(props.initialFilters.lessonRange || null);
const priceRangeFilter = ref(props.initialFilters.priceRange || null);
const durationMin = ref(props.initialFilters.durationMin || 0);
const durationMax = ref(props.initialFilters.durationMax || 50);
const maxDuration = 60; // Maximum course duration in hours
const filterDialogVisible = ref(false);
const sortPopover = ref();
const selectedSort = ref(props.initialFilters.sort ?
  sortOptions.value.find(opt => opt.value === props.initialFilters.sort) : null);
const isLevelOptionsLoading = ref(false);

// Initialize stores
const levelOptionsStore = useLevelOptionsStore();
const categoryOptionsStore = useCategoryOptionsStore();
const courseTypeStore = useCourseTypeStore();

// Options for filters
const levelOptions = computed(() => [
  { name: 'جميع المستويات', value: null },
  ...levelOptionsStore.getLevels
]);

const categoryOptions = computed(() => [
  { name: 'جميع المجالات', code: null },
  ...categoryOptionsStore.getCategories
]);

const courseTypeOptions = computed(() => [
  { name: 'جميع الأنواع', code: null },
  ...courseTypeStore.getCourseTypes
]);

const sortOptions = ref([
  { name: 'الأحدث', value: 'newest', icon: 'pi pi-clock' },
  { name: 'الأكثر شعبية', value: 'popular', icon: 'pi pi-hashtag' },
  { name: 'الأعلى تقييماً', value: 'top-rated', icon: 'pi pi-star' }
]);

const lessonRangeOptions = ref([
  { name: 'جميع الدروس', value: null },
  { name: '1-5 دروس', value: 'range1', min: 1, max: 5 },
  { name: '6-10 دروس', value: 'range2', min: 6, max: 10 },
  { name: '11-15 درس', value: 'range3', min: 11, max: 15 },
  { name: 'أكثر من 15 درس', value: 'range4', min: 16, max: Infinity }
]);

const priceRangeOptions = ref([
  { name: 'جميع الأسعار', value: null },
  { name: 'مجاني', value: 'free', min: 0, max: 0 },
  { name: 'أقل من 75 ريال', value: 'under75', min: 1, max: 75 },
  { name: '75-200 ريال', value: 'mid', min: 75, max: 200 },
  { name: 'أكثر من 200 ريال', value: 'above200', min: 200, max: Infinity }
]);

const hasActiveFilters = computed(() => {
  return levelFilter.value ||
         categoryFilter.value ||
         courseTypeFilter.value ||
         lessonRangeFilter.value ||
         priceRangeFilter.value ||
         durationMin.value > 0 ||
         durationMax.value < maxDuration;
});

// Watch for search query changes
watch(searchQuery, () => {
  if (props.adminMode) {
    applyFilters();
  }
});

// Filter methods
const showFilterDialog = () => {
  filterDialogVisible.value = true;
};

const applyFiltersAndClose = () => {
  filterDialogVisible.value = false;
  applyFilters();
};

const clearFilters = () => {
  levelFilter.value = null;
  categoryFilter.value = null;
  courseTypeFilter.value = null;
  lessonRangeFilter.value = null;
  priceRangeFilter.value = null;
  durationMin.value = 0;
  durationMax.value = maxDuration;

  emit('clear-filters');
  applyFilters();
};

// Sorting methods
const toggleSort = (event) => {
  sortPopover.value.toggle(event);
};

const selectSort = (option) => {
  selectedSort.value = option;
  sortPopover.value.hide();
  applyFilters();
};

const clearSort = () => {
  selectedSort.value = null;
  applyFilters();
};

// Duration slider handlers
const onDurationMinChange = () => {
  if (durationMin.value >= durationMax.value) {
    durationMax.value = Math.min(durationMin.value + 1, maxDuration);
  }
};

const onDurationMaxChange = () => {
  if (durationMax.value <= durationMin.value) {
    durationMax.value = durationMin.value + 1;
  }
};

// Build query parameters from current filters
const buildQueryParams = () => {
  const params = {};

  // Search query
  if (searchQuery.value) {
    params.search = searchQuery.value;
  }

  // Level filter
  if (levelFilter.value) {
    params.level = levelFilter.value;
  }

  // Category filter
  if (categoryFilter.value) {
    params.category = categoryFilter.value;
  }

  // Course type filter
  if (courseTypeFilter.value) {
    params.courseType = courseTypeFilter.value;
  }

  // Lesson range filter
  if (lessonRangeFilter.value) {
    const option = lessonRangeOptions.value.find(opt => opt.value === lessonRangeFilter.value);
    if (option) {
      params.lessonsMin = option.min;
      params.lessonsMax = option.max !== Infinity ? option.max : undefined;
    }
  }

  // Price range filter
  if (priceRangeFilter.value) {
    const option = priceRangeOptions.value.find(opt => opt.value === priceRangeFilter.value);
    if (option) {
      params.priceMin = option.min;
      params.priceMax = option.max !== Infinity ? option.max : undefined;
    }
  }

  // Duration range filter
  if (durationMin.value > 0 || durationMax.value < maxDuration) {
    params.durationMin = durationMin.value * 60; // Convert hours to minutes
    params.durationMax = durationMax.value * 60; // Convert hours to minutes
  }

  // Sorting
  if (selectedSort.value) {
    params.sortBy = selectedSort.value.value;
  }

  return params;
};

const applyFilters = () => {
  const queryParams = buildQueryParams();
  emit('apply-filters', queryParams);
};

onMounted(async () => {
  await Promise.all([
    levelOptionsStore.fetchLevels(),
    categoryOptionsStore.fetchCategories(),
    courseTypeStore.fetchCourseTypes()
  ]);
});
</script>

<style scoped>
:deep(.p-inputgroup) {
  direction: rtl;
}

:deep(.p-popover .p-popover-content) {
  direction: rtl;
}

:deep(.p-popover) {
  direction: rtl;
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

:deep(.p-select) {
  width: 100%;
  direction: rtl;
}

:deep(.p-select-panel) {
  direction: rtl;
}

:deep(.p-dialog) {
  direction: rtl;
}

:deep(.p-dialog-header) {
  padding: 1.5rem;
}

:deep(.p-dialog-content) {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

:deep(.p-dialog-footer) {
  padding: 1.5rem;
  text-align: left;
}

/* Mobile-specific styles */
@media (max-width: 640px) {
  :deep(.p-popover) {
    max-width: calc(100vw - 2rem) !important;
    margin: 0 1rem;
  }

  :deep(.p-popover .p-popover-content) {
    padding: 1rem;
  }
}
</style>
