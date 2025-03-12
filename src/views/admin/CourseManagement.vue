<template>
  <div class="course-management">
    <h1>إدارة الدورات</h1>
    <div class="admin-panel">
      <div class="actions-bar">
        <Button @click="addNewCourse" icon="pi pi-plus" label="إضافة دورة جديدة" severity="success" />
        <div class="search-filter">
          <InputGroup>
            <InputText v-model="searchQuery" placeholder="ابحث عن الدورات..." type="text" size="small" />
            <InputGroupAddon class="h-9">
              <Button icon="pi pi-search" size="small" severity="secondary" variant="text" @click="applyFiltersAndSort" />
            </InputGroupAddon>
          </InputGroup>
          <Button label="فرز" icon="pi pi-filter" @click="showFilterDialog" :class="{
            'p-button-secondary': !(levelFilter || categoryFilter || courseTypeFilter || lessonRangeFilter || priceRangeFilter || durationRange[0] > 0 || durationRange[1] < maxDuration),
            'p-button-primary': levelFilter || categoryFilter || courseTypeFilter || lessonRangeFilter || priceRangeFilter || durationRange[0] > 0 || durationRange[1] < maxDuration
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
                <div class="flex flex-col gap-2">
                  <Slider v-model="durationRange" range :min="0" :max="maxDuration" class="mt-2" />

                  <div class="flex justify-between text-sm text-gray-600">
                    <span>{{ durationRange[0] }} ساعة</span>
                    <span>{{ durationRange[1] }} ساعة</span>
                  </div>
                </div>
              </div>

              <div>
                <span class="font-medium block mb-2">نطاق السعر</span>
                <Select v-model="priceRangeFilter" :options="priceRangeOptions" optionLabel="name" optionValue="value"
                  placeholder="اختر نطاق السعر" class="w-full" />
              </div>

              <Button
                v-if="levelFilter || categoryFilter || courseTypeFilter || lessonRangeFilter || priceRangeFilter || durationRange[0] > 0 || durationRange[1] < maxDuration"
                label="مسح التصفية" icon="pi pi-times" severity="secondary" text class="mt-2 w-full justify-center"
                @click="clearFilters" />
            </div>
            <template #footer>
              <Button label="تطبيق" icon="pi pi-check" @click="applyFiltersAndClose" autofocus />
            </template>
          </Dialog>
          <Button label="ترتيب" :icon="selectedSort?.icon || 'pi pi-sort'" @click="toggleSort" severity="secondary"
            :class="{ 'p-button-info': selectedSort }" class="whitespace-nowrap" />
          <Popover ref="sortPopover" appendTo="body">
            <div class="flex flex-col gap-2 w-[240px]">
              <ul class="list-none p-0 m-0 flex flex-col justify-start">
                <li v-for="option in sortOptions" :key="option.value"
                  class="flex items-center gap-2 h-[48px] px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors"
                  :class="{ 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400': selectedSort?.value === option.value }"
                  @click="selectSort(option)">
                  <i
                    :class="[option.icon, 'text-lg', selectedSort?.value === option.value ? 'text-primary-500' : '']"></i>
                  <span class="text-[14px]">{{ option.name }}</span>
                </li>
              </ul>
              <Button v-if="selectedSort" label="مسح الترتيب" icon="pi pi-times" severity="secondary" text
                class="mt-1 w-full justify-center h-[40px]" @click="selectedSort = null" />
            </div>
          </Popover>
        </div>
      </div>

      <div v-if="courseAdminStore.loading" class="loading-container">
        <ProgressSpinner />
      </div>
      <div v-else-if="filteredCourses.length > 0">
        <DataTable
          :value="filteredCourses"
          stripedRows
          paginator
          :rows="10"
          tableStyle="min-width: 50rem"
          :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <Column field="id" header="المعرف" sortable />
          <Column field="title" header="العنوان" sortable />
          <Column field="type" header="النوع" sortable />
          <Column field="level" header="المستوى" sortable />
          <Column header="الفئات">
            <template #body="slotProps">
              <Button label="عرض الفئات" @click="showCategoryDialog(parseCategoryJson(slotProps.data.category))" size="small" />
            </template>
          </Column>
          <Column field="duration" header="المدة" sortable>
            <template #body="slotProps">
              {{ formatDuration(slotProps.data.duration) }}
            </template>
          </Column>
          <Column field="lessonCount" header="عدد الدروس" sortable />
          <Column header="السعر" sortable>
            <template #body="slotProps">
              {{ slotProps.data.originalPrice }} {{ slotProps.data.currency }}
            </template>
          </Column>
          <Column field="rating" header="التقييم" sortable>
            <template #body="slotProps">
              <div class="flex align-items-center">
                <Rating v-model="slotProps.data.rating" readonly :cancel="false" />
                <span class="ml-2">({{ slotProps.data.rating.toFixed(1) }})</span>
              </div>
            </template>
          </Column>
          <Column field="students" header="الطلاب" sortable />
          <Column header="الإشتراكات">
            <template #body="slotProps">
              <div v-if="slotProps.data.isSubscribtionIncluded" class="subscription-badges">
                <span v-for="sub in slotProps.data.subscriptionIncludedNames" :key="sub" class="subscription-badge">
                  {{ sub }}
                </span>
              </div>
              <span v-else>-</span>
            </template>
          </Column>
          <Column header="الحالة">
            <template #body="slotProps">
              <Tag :severity="slotProps.data.purchased ? 'success' : 'info'"
                  :value="slotProps.data.purchased ? 'تم الشراء' : 'غير مشترى'" />
            </template>
          </Column>
          <Column header="الإجراءات">
            <template #body="slotProps">
              <div class="action-buttons">
                <Button icon="pi pi-pencil" @click="editCourse(slotProps.data)" severity="info" size="small" />
                <Button icon="pi pi-eye" @click="viewDetails(slotProps.data.id)" severity="secondary" size="small" class="mx-2" />
                <Button icon="pi pi-trash" @click="deleteCourse(slotProps.data.id)" severity="danger" size="small" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <!-- No Results Message -->
      <div v-else
        class="flex flex-col items-center justify-center py-8 sm:py-16 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <i class="pi pi-search-minus text-4xl mb-4 text-gray-400"></i>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">لا توجد نتائج</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4">
          لم نتمكن من العثور على أي دورات تطابق معايير البحث الخاصة بك
        </p>
        <Button label="مسح جميع الفلاتر" icon="pi pi-filter-slash" severity="secondary" @click="clearFilters" />
      </div>
    </div>

    <Dialog v-model:visible="categoryDialogVisible" modal header="Course Categories" :style="{ width: '50vw' }">
      <ul>
        <li v-for="category in selectedCategories" :key="category.id">{{ category.name }}</li>
      </ul>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCourseAdminStore } from '@/stores/courseManagementStore'
import { useLevelOptionsStore } from '@/stores/levelOptions.js'
import { useCategoryOptionsStore } from '@/stores/categoryOptions.js'
import { useCourseTypeStore } from '@/stores/courseType.js'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Select from 'primevue/select'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import ProgressSpinner from 'primevue/progressspinner'
import Slider from 'primevue/slider'
import Popover from 'primevue/popover'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'

const courseAdminStore = useCourseAdminStore()
const searchQuery = ref('')
const categoryDialogVisible = ref(false)
const selectedCategories = ref([])

// Initialize filter states
const levelFilter = ref(null);
const categoryFilter = ref(null);
const courseTypeFilter = ref(null);
const lessonRangeFilter = ref(null);
const priceRangeFilter = ref(null);
const durationRange = ref([0, 50]);
const maxDuration = 60; // Maximum course duration in hours
const filterDialogVisible = ref(false);
const sortPopover = ref();
const selectedSort = ref(null);
const isLevelOptionsLoading = ref(false);

// Initialize stores
const levelOptionsStore = useLevelOptionsStore();
const categoryOptionsStore = useCategoryOptionsStore();
const courseTypeStore = useCourseTypeStore();

// Update computed options to include a default option
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

// Modified to simply return courses from the store instead of filtering locally
const filteredCourses = computed(() => {
  return courseAdminStore.courses;
});

onMounted(async () => {
  await Promise.all([
    levelOptionsStore.fetchLevels(),
    categoryOptionsStore.fetchCategories(),
    courseTypeStore.fetchCourseTypes()
  ]);

  // Initial fetch of courses with no filters
  applyFiltersAndSort();
});

// Watch for changes in filters and automatically apply them
watch([searchQuery, selectedSort], () => {
  applyFiltersAndSort();
});

function parseCategoryJson(categoryStr) {
  if (!categoryStr) return []
  try {
    // Handle the JSON string array format: "[ \"category1\", \"category2\" ]"
    return JSON.parse(categoryStr)
  } catch (e) {
    console.error('Error parsing category JSON:', e)
    return []
  }
}

function addNewCourse() {
  console.log('إضافة دورة جديدة')
}

function editCourse(course) {
  console.log('تعديل الدورة:', course)
}

function viewDetails(courseId) {
  console.log('عرض تفاصيل الدورة:', courseId)
}

async function deleteCourse(courseId) {
  await courseAdminStore.deleteCourse(courseId)
}

function showCategoryDialog(categories) {
  selectedCategories.value = categories.map(cat => ({ id: Date.now() + Math.random(), name: cat }))
  categoryDialogVisible.value = true
}

function formatDuration(minutes) {
  if (!minutes) return '0 دقيقة'

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes} دقيقة`
  } else if (remainingMinutes === 0) {
    return `${hours} ساعة`
  } else {
    return `${hours} ساعة ${remainingMinutes} دقيقة`
  }
}

// Filter methods
const showFilterDialog = () => {
  filterDialogVisible.value = true;
};

const applyFiltersAndClose = () => {
  filterDialogVisible.value = false;
  applyFiltersAndSort();
};

const clearFilters = () => {
  levelFilter.value = null;
  categoryFilter.value = null;
  courseTypeFilter.value = null;
  lessonRangeFilter.value = null;
  priceRangeFilter.value = null;
  durationRange.value = [0, maxDuration];
  searchQuery.value = '';
  selectedSort.value = null;

  // Fetch courses with cleared filters
  applyFiltersAndSort();
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
    params.type = courseTypeFilter.value;
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
  if (durationRange.value[0] > 0 || durationRange.value[1] < maxDuration) {
    params.durationMin = durationRange.value[0] * 60; // Convert hours to minutes
    params.durationMax = durationRange.value[1] * 60; // Convert hours to minutes
  }

  // Sorting
  if (selectedSort.value) {
    params.sortBy = selectedSort.value.value;
  }

  return params;
};

// Sorting methods
const toggleSort = (event) => {
  sortPopover.value.toggle(event);
};

const selectSort = (option) => {
  selectedSort.value = option;
  sortPopover.value.hide();
  applyFiltersAndSort();
};

const applyFiltersAndSort = async () => {
  const queryParams = buildQueryParams();
  await courseAdminStore.fetchAllCourses(queryParams);
};
</script>

<style scoped>
.course-management {
  padding: 20px;
}

.admin-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  gap: 10px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
}

.subscription-badges {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.subscription-badge {
  background-color: #e3f2fd;
  color: #1976d2;
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-block;
}

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

:deep(.p-slider) {
  direction: ltr;
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
</style>
