<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Banner Section -->
    <div class="relative h-[150px] sm:h-[200px] w-full">
      <img src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&h=300&fit=crop" alt="Banner" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white p-6 max-w-2xl">
          <h1 class="text-3xl font-bold mb-2">دورات خيط وإبرة</h1>
          <p class="text-lg">اكتشف مجموعتنا الواسعة من الدورات التدريبية المتخصصة</p>
        </div>
      </div>
    </div>

    <!-- Filters and Search Section -->
    <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div class="flex flex-col gap-3 mb-4 sm:mb-8">

        <div class="w-full md:w-1/2">
          <InputGroup >
            <InputText v-model="searchQuery" placeholder="ابحث عن الدورات..."  type="text" size="small" />
            <InputGroupAddon class="h-9">
              <Button  icon="pi pi-search" size="small" severity="secondary" variant="text" />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div class="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          <Button label="فرز" icon="pi pi-filter" @click="toggleLevel"
                  :class="{ 'p-button-info': levelFilter || categoryFilter || courseTypeFilter || lessonRangeFilter || priceRangeFilter || durationRange[0] > 0 || durationRange[1] < maxDuration }"
                  class="whitespace-nowrap" />
          <Popover ref="FilterPopOver" appendTo="body" class="w-full sm:w-auto">
            <div class="flex flex-col gap-4 p-4 min-w-[300px] max-h-[80vh] overflow-y-auto">
              <div>
                <span class="font-medium block mb-2">المجال</span>
                <Select v-model="categoryFilter"
                         :options="categoryOptions"
                         optionLabel="name"
                         optionValue="value"
                         placeholder="اختر المجال"
                         class="w-full" />
              </div>

              <div>
                <span class="font-medium block mb-2">اختر المستوى</span>
                <Select v-model="levelFilter"
                        :options="levelOptions"
                        optionLabel="name"
                        optionValue="value"
                        placeholder="جميع المستويات"
                        class="w-full" />
              </div>

              <div>
                <span class="font-medium block mb-2">عدد الدروس</span>
                <Select v-model="lessonRangeFilter"
                         :options="lessonRangeOptions"
                         optionLabel="name"
                         optionValue="value"
                         placeholder="اختر عدد الدروس"
                         class="w-full" />
              </div>

              <div>
                <span class="font-medium block mb-2">مدة الدورة (بالساعات)</span>
                <div class="flex flex-col gap-2">
                  <Slider v-model="durationRange"
                          range
                          :min="0"
                          :max="maxDuration"
                          class="mt-2" />
                  <div class="flex justify-between text-sm text-gray-600">
                    <span>{{ durationRange[0] }} ساعة</span>
                    <span>{{ durationRange[1] }} ساعة</span>
                  </div>
                </div>
              </div>

              <div>
                <span class="font-medium block mb-2">نطاق السعر</span>
                <Select v-model="priceRangeFilter"
                         :options="priceRangeOptions"
                         optionLabel="name"
                         optionValue="value"
                         placeholder="اختر نطاق السعر"
                         class="w-full" />
              </div>

              <div>
                <span class="font-medium block mb-2">نوع الدورة</span>
                <Select v-model="courseTypeFilter"
                         :options="courseTypeOptions"
                         optionLabel="name"
                         optionValue="value"
                         placeholder="اختر نوع الدورة"
                         class="w-full">
                  <template #value="slotProps">
                    <div class="flex items-center gap-2" v-if="slotProps.value">
                      <span>{{ courseTypeOptions.find(opt => opt.value === slotProps.value)?.icon }}</span>
                      <span>{{ courseTypeOptions.find(opt => opt.value === slotProps.value)?.name }}</span>
                    </div>
                    <span v-else>اختر نوع الدورة</span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex items-center gap-2">
                      <span>{{ slotProps.option.icon }}</span>
                      <span>{{ slotProps.option.name }}</span>
                    </div>
                  </template>
                </Select>
              </div>

              <Button v-if="levelFilter || categoryFilter || courseTypeFilter || lessonRangeFilter || priceRangeFilter || durationRange[0] > 0 || durationRange[1] < maxDuration"
                      label="مسح التصفية"
                      icon="pi pi-times"
                      severity="secondary"
                      text
                      class="mt-2 w-full justify-center"
                      @click="() => {
                        levelFilter = null;
                        categoryFilter = null;
                        courseTypeFilter = null;
                        lessonRangeFilter = null;
                        priceRangeFilter = null;
                        durationRange = [0, maxDuration];
                      }" />
            </div>
          </Popover>

          <Button label="ترتيب" :icon="selectedSort?.icon || 'pi pi-sort'" @click="toggleSort"
                  severity="secondary" :class="{ 'p-button-info': selectedSort }"
                  class="whitespace-nowrap" />
          <Popover ref="sortPopover" appendTo="body">
            <div class="flex flex-col gap-2">
              <ul class="list-none p-0 m-0 flex flex-col justify-start">
                <li v-for="option in sortOptions" :key="option.value"
                    class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition-colors"
                    :class="{ 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400': selectedSort?.value === option.value }"
                    @click="selectSort(option)">
                  <i :class="[option.icon, selectedSort?.value === option.value ? 'text-primary-500' : '']"></i>
                  <span>{{ option.name }}</span>
                </li>
              </ul>
              <Button v-if="selectedSort"
                      label="مسح الترتيب"
                      icon="pi pi-times"
                      severity="secondary"
                      text
                      class="mt-2 w-full justify-center"
                      @click="selectedSort = null" />
            </div>
          </Popover>
        </div>
      </div>

      <!-- Course Cards Grid -->
      <div v-if="filteredCourses.length > 0"
           class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-8 relative">
        <div v-for="(course) in filteredCourses" :key="course.id"
          class="card p-0 rounded-lg shadow-md relative flex flex-col self-start h-full bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div class="relative">
            <img :src="course.image" :alt="course.title" class="w-full h-36 sm:h-48 object-cover rounded" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 via-100% to-surface-0 to-80% opacity-100 dark:via-gray-100/[0.2] dark:to-gray-800">
            </div>
            <div class="relative w-full flex flex-col justify-center items-center rounded-md p-1">
              <p class="text-lg font-bold mb-1 text-right text-gray-900 dark:text-gray-100">{{ course.title }}</p>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">{{ course.description }}</p>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-yellow-500">{{ course.rating }}⭐</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">({{ course.students }} طالب)</span>
              </div>
            </div>
            <div class="absolute top-2 px-2 w-full">
              <div class="flex justify-between">
                <Button icon="pi pi-heart" severity="primary" variant="text" />
                <span v-if="course.discount"
                  class="text-green-500 font-bold text-center content-center rounded-md px-2 bg-green-100 bg-opacity-50 dark:bg-green-900">
                  {{course.discount }}%</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between p-3 sm:p-4 flex-col mt-auto">
            <div class="flex flex-col items-center mb-2">
              <p class="text-gray-500 dark:text-gray-400 line-through text-xs mb-1" v-if="course.discount"
                 v-tooltip="'ريال سعودي'">
                {{ course.originalPrice }} SAR
              </p>
              <p class="text-black dark:text-white font-bold text-sm" v-tooltip="'ريال سعودي'">
                {{ course.discountedPrice || course.originalPrice }} SAR
              </p>
            </div>
            <div class="flex flex-row gap-1">
              <Button label="شراء" class="h-8 flex-1" />
              <Button label="تفاصيل" class="h-8 flex-1" severity="secondary" />
            </div>
          </div>
        </div>
      </div>

      <!-- No Results Message -->
      <div v-else class="flex flex-col items-center justify-center py-8 sm:py-16 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <i class="pi pi-search-minus text-4xl mb-4 text-gray-400"></i>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">لا توجد نتائج</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4">
          لم نتمكن من العثور على أي دورات تطابق معايير البحث الخاصة بك
        </p>
        <Button
          label="مسح جميع الفلاتر"
          icon="pi pi-filter-slash"
          severity="secondary"
          @click="() => {
            levelFilter = null;
            categoryFilter = null;
            lessonRangeFilter = null;
            priceRangeFilter = null;
            durationRange = [0, maxDuration];
            searchQuery = '';
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Button, Popover, Select, Slider } from "primevue";
import { InputText, InputGroup, InputGroupAddon } from "primevue";

const searchQuery = ref("");
const sortPopover = ref();

const sortOptions = ref([
  { name: 'الأحدث', value: 'newest', icon: 'pi pi-clock' },
  { name: 'الأكثر شعبية', value: 'popular', icon: 'pi pi-hashtag' },
  { name: 'الأعلى تقييماً', value: 'top-rated', icon: 'pi pi-star' }
]);

const selectedSort = ref(null);

const toggleSort = (event) => {
  sortPopover.value.toggle(event);
};

const selectSort = (option) => {
  selectedSort.value = option;
  sortPopover.value.hide();
};

const levelFilter = ref(null);
const FilterPopOver = ref();

const levelOptions = ref([
  { name: 'جميع المستويات', value: null },
  { name: 'مبتدئ', value: 'beginner' },
  { name: 'متوسط', value: 'intermediate' },
  { name: 'متقدم', value: 'advanced' }
]);

const toggleLevel = (event) => {
  FilterPopOver.value.toggle(event);
};

// Add duration filter state
const durationRange = ref([0, 50]);
const maxDuration = 50; // Maximum course duration in hours

const lessonRangeFilter = ref(null);
const lessonRangeOptions = ref([
  { name: 'جميع الدروس', value: null },
  { name: '1-5 دروس', value: 'range1', min: 1, max: 5 },
  { name: '6-10 دروس', value: 'range2', min: 6, max: 10 },
  { name: '11-15 درس', value: 'range3', min: 11, max: 15 },
  { name: 'أكثر من 15 درس', value: 'range4', min: 16, max: Infinity }
]);

const priceRangeFilter = ref(null);
const priceRangeOptions = ref([
  { name: 'جميع الأسعار', value: null },
  { name: 'مجاني', value: 'free', min: 0, max: 0 },
  { name: 'أقل من 75 ريال', value: 'under75', min: 1, max: 75 },
  { name: '75-200 ريال', value: 'mid', min: 75, max: 200 },
  { name: 'أكثر من 200 ريال', value: 'above200', min: 200, max: Infinity }
]);

const categoryFilter = ref(null);
const categoryOptions = ref([
  { id: 1, name: 'جميع المجالات', value: null, code: 'ALL' },
  { id: 2, name: 'كتابة سيناريو', value: 'scenario', code: 'SCEN' },
  { id: 3, name: 'كتابة شعر', value: 'poetry', code: 'POET' },
  { id: 4, name: 'تصميم صور', value: 'design', code: 'DSGN' },
  { id: 5, name: 'رسم', value: 'drawing', code: 'DRAW' },
  { id: 6, name: 'تعليق صوتي', value: 'voice', code: 'VOIC' }
]);

const courseTypeFilter = ref(null);
const courseTypeOptions = ref([
  { name: 'جميع الأنواع', value: null, icon: '' },
  { name: 'حضوري', value: 'onsite', icon: '📍' },
  { name: 'عن بعد - مسجل', value: 'recorded', icon: '🌐' },
  { name: 'عن بعد - مباشر', value: 'live', icon: '🔴' }
]);

const courses = ref([
  {
    id: 1,
    title: "التطريز اليدوي للمبتدئين",
    description: "تعلم أساسيات التطريز اليدوي خطوة بخطوة",
    image: "https://images.unsplash.com/photo-1738230077816-fbab6232c545?w=500&h=300&fit=crop",
    originalPrice: "299",
    rating: 4.8,
    students: 1234,
    duration: 10, // Duration in hours
    level: 'beginner',
    currency: "ريال سعودي",
    lessonCount: 4,
    category: 'drawing',
    type: 'onsite',
  },
  {
    id: 2,
    title: "الخياطة المتقدمة",
    description: "تقنيات احترافية في الخياطة والتفصيل",
    image: "https://images.unsplash.com/photo-1738273473785-99c1fc498c14?w=500&h=300&fit=crop",
    originalPrice: "399",
    discountedPrice: "299",
    discount: 25,
    rating: 4.9,
    students: 856,
    duration: 25,
    level: 'advanced',
    currency: "ريال سعودي",
    lessonCount: 12,
    category: 'design',
    type: 'recorded',
  },
  {
    id: 3,
    title: "تصميم الأزياء الرقمي",
    description: "ابتكار تصاميم رقمية احترافية",
    image: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=500&h=300&fit=crop",
    originalPrice: "499",
    rating: 4.7,
    students: 2156,
    duration: 15,
    level: 'intermediate',
    currency: "ريال سعودي",
    lessonCount: 8,
    category: 'design',
    type: 'live',
  },
  {
    id: 4,
    title: "الكروشيه للمحترفين",
    description: "تعلم تقنيات الكروشيه المتقدمة",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=300&fit=crop",
    originalPrice: "349",
    discountedPrice: "279",
    discount: 20,
    rating: 4.6,
    students: 1567,
    duration: 30,
    level: 'advanced',
    currency: "ريال سعودي",
    lessonCount: 16,
    category: 'drawing',
    type: 'onsite',
  },
  {
    id: 5,
    title: "تصميم الأنماط والنقوش",
    description: "إنشاء نقوش وأنماط مميزة للأقمشة",
    image: "https://plus.unsplash.com/premium_photo-1700346339061-9755dcc26bd9?w=500&h=300&fit=crop",
    originalPrice: "199",
    rating: 4.5,
    students: 989,
    duration: 5,
    level: 'beginner',
    currency: "ريال سعودي",
    lessonCount: 3,
    category: 'drawing',
    type: 'recorded',
  }
]);
// re add same courses to test the search functionality with iterator in loop
for (let i = 0; i < 3; i++) {
  courses.value.push(...courses.value);
}
const filteredCourses = computed(() => {
  let result = courses.value.filter(course => {
    const coursePrice = Number(course.discountedPrice || course.originalPrice);
    const selectedPriceRange = priceRangeOptions.value.find(r => r.value === priceRangeFilter.value);

    return (course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!levelFilter.value || course.level === levelFilter.value) &&
      (!categoryFilter.value || course.category === categoryFilter.value) &&  // Add category filter
      (!courseTypeFilter.value || course.type === courseTypeFilter.value) && // Add type filter
      (course.duration >= durationRange.value[0] && course.duration <= durationRange.value[1]) &&
      (!lessonRangeFilter.value ||
        (course.lessonCount >= lessonRangeOptions.value.find(r => r.value === lessonRangeFilter.value)?.min &&
         course.lessonCount <= lessonRangeOptions.value.find(r => r.value === lessonRangeFilter.value)?.max)) &&
      (!priceRangeFilter.value ||
        (coursePrice >= selectedPriceRange?.min && coursePrice <= selectedPriceRange?.max));
  });

  if (selectedSort.value) {
    switch (selectedSort.value.value) {
      case 'newest':
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        result = [...result].sort((a, b) => b.students - a.students);
        break;
      case 'top-rated':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  return result;
});
</script>

<style scoped>
.card {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
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
  direction: ltr; /* Keep slider direction ltr for better UX */
}

:deep(.p-slider .p-slider-range) {
  background: var(--primary-color);
}

.card {
  background-color: var(--p-surface-0);
  border: 1px solid var(--p-content-border-color);
}

:deep(.text-gray-900) {
  color: var(--p-text-color);
}

:deep(.text-gray-700) {
  color: var(--p-text-muted-color);
}

:deep(.text-gray-600) {
  color: var(--p-text-muted-color);
}

:deep(.bg-gray-100) {
  background-color: var(--p-surface-100);
}

:deep(.dark\:bg-gray-800) {
  background-color: var(--p-surface-800);
}

:deep(.hover\:bg-gray-200) {
  &:hover {
    background-color: var(--p-content-hover-background);
  }
}

:deep(.dark\:hover\:bg-gray-700) {
  &:hover {
    background-color: var(--p-content-hover-background);
  }
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

  .card {
    max-width: 100%;
  }
}
</style>
