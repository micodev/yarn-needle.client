<template>
  <div class="p-5">
    <h1>إدارة الدورات</h1>
    <div class="bg-white rounded-lg shadow-md p-5">
      <div class="flex justify-between mb-5">
        <Button @click="addNewCourse" icon="pi pi-plus" label="إضافة دورة جديدة" severity="success" />
        <div class="flex gap-2.5">
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

      <div v-if="courseAdminStore.loading" class="flex justify-center items-center min-h-[300px] w-full">
        <ProgressSpinner />
      </div>
      <div v-else-if="filteredCourses.length > 0">
        <DataTable
          :value="filteredCourses"
          stripedRows
          show-gridlines="true"
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
              <Button icon="pi pi-eye" @click="showCategoryDialog(parseCategoryJson(slotProps.data.category))" size="small" />
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
          <Column header="العضويات">
            <template #body="slotProps">
              <Button v-if="slotProps.data.subscriptionIncludedNames && slotProps.data.subscriptionIncludedNames.length > 0"
                icon="pi pi-eye"

                @click="showSubscriptionDialog(slotProps.data.subscriptionIncludedNames)"
                size="small" />
              <span v-else class="text-gray-500">غير متصل بعضوية</span>
            </template>
          </Column>
          <Column header="الحالة">
            <template #body="slotProps">
              <Tag :severity="slotProps.data.isActive ? 'info' : 'danger'"
                  :value="slotProps.data.isActive ? 'نشط' : 'غير نشط'" />
            </template>
          </Column>
          <Column header="الإجراءات">
            <template #body="slotProps">
              <div class="flex gap-1.5">
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

    <!-- Add Course Dialog -->
    <Dialog v-model:visible="courseDialogVisible" modal header="إضافة دورة جديدة"
           :style="{ width: '90vw', maxWidth: '800px' }" :closable="!submitting">
      <div class="flex flex-col gap-4 max-h-[70vh] overflow-y-auto p-2">
        <!-- Form Sections -->
        <div class="surface-card p-4 shadow-2 border-round">
          <div class="text-xl font-medium mb-3">معلومات أساسية</div>
          <div class="grid formgrid">
            <div class="field col-12 md:col-6">
              <label for="title" class="block mb-2">العنوان*</label>
              <InputText id="title" v-model="newCourse.title" class="w-full"
                         :class="{'p-invalid': v$.title.$invalid && v$.title.$dirty}" />
              <small v-if="v$.title.$invalid && v$.title.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>

            <div class="field col-12 md:col-6">
              <label for="image" class="block mb-2">رابط الصورة*</label>
              <InputText id="image" v-model="newCourse.image" class="w-full"
                         :class="{'p-invalid': v$.image.$invalid && v$.image.$dirty}" />
              <small v-if="v$.image.$invalid && v$.image.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>

            <div class="field col-12">
              <label for="description" class="block mb-2">الوصف*</label>
              <Textarea id="description" v-model="newCourse.description" rows="5" class="w-full"
                        :class="{'p-invalid': v$.description.$invalid && v$.description.$dirty}" />
              <small v-if="v$.description.$invalid && v$.description.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>
          </div>
        </div>

        <div class="surface-card p-4 shadow-2 border-round">
          <div class="text-xl font-medium mb-3">تفاصيل الدورة</div>
          <div class="grid formgrid">
            <div class="field col-12 md:col-4">
              <label for="type" class="block mb-2">نوع الدورة*</label>
              <Select id="type" v-model="newCourse.type" :options="courseTypeStore.getCourseTypes"
                     optionLabel="name" optionValue="code" class="w-full"
                     :class="{'p-invalid': v$.type.$invalid && v$.type.$dirty}" />
              <small v-if="v$.type.$invalid && v$.type.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>

            <div class="field col-12 md:col-4">
              <label for="level" class="block mb-2">المستوى*</label>
              <Select id="level" v-model="newCourse.level" :options="levelOptionsStore.getLevels"
                     optionLabel="name" optionValue="value" class="w-full"
                     :class="{'p-invalid': v$.level.$invalid && v$.level.$dirty}" />
              <small v-if="v$.level.$invalid && v$.level.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>

            <div class="field col-12 md:col-4">
              <label for="categorySelect" class="block mb-2">المجال*</label>
              <MultiSelect id="categorySelect" v-model="selectedCategories"
                         :options="categoryOptionsStore.getCategories" optionLabel="name"
                         :class="{'p-invalid': v$.category.$invalid && v$.category.$dirty}"
                         placeholder="اختر المجالات" display="chip" class="w-full" />
              <small v-if="v$.category.$invalid && v$.category.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>

            <div class="field col-12 md:col-4">
              <label for="originalPrice" class="block mb-2">السعر الأصلي*</label>
              <InputNumber id="originalPrice" v-model="newCourse.originalPrice" class="w-full"
                         :min="0" :class="{'p-invalid': v$.originalPrice.$invalid && v$.originalPrice.$dirty}" />
              <small v-if="v$.originalPrice.$invalid && v$.originalPrice.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>

            <div class="field col-12 md:col-4">
              <label for="discount" class="block mb-2">الخصم (%)</label>
              <InputNumber id="discount" v-model="newCourse.discount" class="w-full"
                         :min="0" :max="100" />
            </div>

            <div class="field col-12 md:col-4">
              <label for="currency" class="block mb-2">العملة</label>
              <InputText id="currency" v-model="newCourse.currency" class="w-full" />
            </div>

            <div class="field col-12 md:col-6">
              <label for="duration" class="block mb-2">مدة الدورة (بالدقائق)*</label>
              <InputNumber id="duration" v-model="newCourse.duration" class="w-full"
                         :min="0" :class="{'p-invalid': v$.duration.$invalid && v$.duration.$dirty}" />
              <small v-if="v$.duration.$invalid && v$.duration.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>

            <div class="field col-12 md:col-6">
              <label for="lessonCount" class="block mb-2">عدد الدروس*</label>
              <InputNumber id="lessonCount" v-model="newCourse.lessonCount" class="w-full"
                         :min="0" :class="{'p-invalid': v$.lessonCount.$invalid && v$.lessonCount.$dirty}" />
              <small v-if="v$.lessonCount.$invalid && v$.lessonCount.$dirty" class="p-error">
                هذا الحقل مطلوب
              </small>
            </div>
          </div>
        </div>

        <div class="surface-card p-4 shadow-2 border-round">
          <div class="text-xl font-medium mb-3">معلومات المدرب والمحتوى</div>
          <div class="grid formgrid">
            <div class="field col-12 md:col-6">
              <label for="instructor" class="block mb-2">اسم المدرب</label>
              <InputText id="instructor" v-model="newCourse.instructor" class="w-full" />
            </div>

            <div class="field col-12 md:col-6">
              <label for="instructorImage" class="block mb-2">صورة المدرب (رابط)</label>
              <InputText id="instructorImage" v-model="newCourse.instructorImage" class="w-full" />
            </div>

            <div class="field col-12 md:col-6">
              <label for="topics" class="block mb-2">المواضيع (قائمة مفصولة بفواصل)</label>
              <Chips id="topics" v-model="topicsArray" class="w-full" separator="," />
            </div>

            <div class="field col-12 md:col-6">
              <label for="results" class="block mb-2">النتائج المتوقعة (قائمة مفصولة بفواصل)</label>
              <Chips id="results" v-model="resultsArray" class="w-full" separator="," />
            </div>

            <div class="field col-12">
              <label for="targetAudience" class="block mb-2">الجمهور المستهدف (قائمة مفصولة بفواصل)</label>
              <Chips id="targetAudience" v-model="targetAudienceArray" class="w-full" separator="," />
            </div>
          </div>
        </div>

        <div class="surface-card p-4 shadow-2 border-round">
          <div class="text-xl font-medium mb-3">الإعدادات الإضافية</div>
          <div class="grid formgrid">
            <div class="field col-12 md:col-6">
              <label for="organizations" class="block mb-2">المؤسسات (قائمة مفصولة بفواصل)</label>
              <Chips id="organizations" v-model="newCourse.organizations" class="w-full" separator="," />
            </div>

            <div class="field col-12 md:col-6">
              <label for="awards" class="block mb-2">الجوائز (قائمة مفصولة بفواصل)</label>
              <Chips id="awards" v-model="awardsArray" class="w-full" separator="," />
            </div>

            <div class="field col-12 md:col-6">
              <label for="subscriptions" class="block mb-2">العضويات المتضمنة</label>
              <MultiSelect id="subscriptions" v-model="newCourse.subscriptionIncludedNames"
                           :options="subscriptionOptions" class="w-full" display="chip" />
            </div>

            <div class="field-checkbox col-12 md:col-6 flex align-items-center">
              <Checkbox id="isActive" v-model="newCourse.isActive" :binary="true" />
              <label for="isActive" class="mr-2">نشط</label>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between">
          <Button label="إلغاء" icon="pi pi-times" @click="closeCourseDialog" :disabled="submitting" />
          <Button label="حفظ" icon="pi pi-check" @click="submitCourse" :loading="submitting" />
        </div>
      </template>
    </Dialog>

    <!-- Success/Error Message -->
    <Toast position="bottom-center" />

    <!-- Existing Dialogs -->
    <Dialog v-model:visible="categoryDialogVisible" modal header="Course Categories" :style="{ width: '50vw' }">
      <ul>
        <li v-for="category in selectedCategories" :key="category.id">{{ category.name }}</li>
      </ul>
    </Dialog>

    <!-- Add new dialog for subscriptions -->
    <Dialog v-model:visible="subscriptionDialogVisible" modal header="الإشتراكات" :style="{ width: '50vw' }">
      <ul>
        <li v-for="subscription in selectedSubscriptions" :key="subscription">{{ subscription }}</li>
      </ul>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { useCourseAdminStore } from '@/stores/courseManagementStore'
import { useLevelOptionsStore } from '@/stores/levelOptions.js'
import { useCategoryOptionsStore } from '@/stores/categoryOptions.js'
import { useCourseTypeStore } from '@/stores/courseType.js'
import { useRouter } from 'vue-router' // Add router import
import { useToast } from 'primevue/usetoast'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
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
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'
import Chips from 'primevue/chips'
import Toast from 'primevue/toast'

const courseAdminStore = useCourseAdminStore()
const router = useRouter() // Initialize router
const searchQuery = ref('')
const categoryDialogVisible = ref(false)
const selectedCategories = ref([])
const subscriptionDialogVisible = ref(false)
const selectedSubscriptions = ref([])

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
  resetForm();
  courseDialogVisible.value = true;
}

function editCourse(course) {
  console.log('تعديل الدورة:', course)
}

function viewDetails(courseId) {
  router.push({ name: 'course', params: { id: courseId }})
}

async function deleteCourse(courseId) {
  await courseAdminStore.deleteCourse(courseId)
}

function showCategoryDialog(categories) {
  selectedCategories.value = categories.map(cat => ({ id: Date.now() + Math.random(), name: cat }))
  categoryDialogVisible.value = true
}

function showSubscriptionDialog(subscriptions) {
  selectedSubscriptions.value = subscriptions || []
  subscriptionDialogVisible.value = true
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

// New Course Dialog
const courseDialogVisible = ref(false);
const submitting = ref(false);
const toast = useToast();
const topicsArray = ref([]);
const resultsArray = ref([]);
const targetAudienceArray = ref([]);
const awardsArray = ref([]);

// Example subscription options - replace with your actual data source
const subscriptionOptions = ref(['العضوية الذهبية', 'العضوية الفضية', 'العضوية البرونزية']);

// Define new course model
const newCourse = reactive({
  title: '',
  description: '',
  image: '',
  originalPrice: 0,
  rating: 0,
  students: 0,
  duration: 0,
  level: '',
  currency: 'ريال سعودي',
  lessonCount: 0,
  category: '',
  type: '',
  discount: null,
  instructor: '',
  instructorImage: '',
  organizations: [],
  awards: [],
  subscriptionIncludedNames: [],
  isSubscribtionIncluded: false,
  purchased: false,
  topics: [],
  results: [],
  targetAudience: [],
  isActive: true,
  socials: []
});

// Form validation rules
const rules = computed(() => {
  return {
    title: { required },
    description: { required },
    image: { required },
    originalPrice: { required, minValue: minValue(0) },
    duration: { required, minValue: minValue(0) },
    level: { required },
    lessonCount: { required, minValue: minValue(0) },
    category: { required },
    type: { required }
  }
});

// Computed property to handle category array to string conversion
const v$ = useVuelidate(rules, {
  ...newCourse,
  category: computed({
    get: () => selectedCategories.value.length > 0 ? 'valid' : '',
    set: () => {}
  })
});

// Initialize form for a new course
function addNewCourse() {
  resetForm();
  courseDialogVisible.value = true;
}

// Close dialog and reset form
function closeCourseDialog() {
  courseDialogVisible.value = false;
  setTimeout(() => resetForm(), 300);
}

// Reset all form fields
function resetForm() {
  Object.keys(newCourse).forEach(key => {
    if (Array.isArray(newCourse[key])) {
      newCourse[key] = [];
    } else if (typeof newCourse[key] === 'boolean') {
      newCourse[key] = key === 'isActive'; // isActive is true by default, others false
    } else if (typeof newCourse[key] === 'number') {
      newCourse[key] = 0;
    } else {
      newCourse[key] = key === 'currency' ? 'ريال سعودي' : '';
    }
  });

  selectedCategories.value = [];
  topicsArray.value = [];
  resultsArray.value = [];
  targetAudienceArray.value = [];
  awardsArray.value = [];
  v$.value.$reset();
}

// Handle form submission
async function submitCourse() {
  // First validate the form
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) {
    toast.add({ severity: 'error', summary: 'خطأ', detail: 'الرجاء إكمال جميع الحقول الإلزامية', life: 3000 });
    return;
  }

  try {
    submitting.value = true;

    // Prepare data for submission
    const courseData = { ...newCourse };

    // Convert category from selected objects to JSON string array
    courseData.category = JSON.stringify(selectedCategories.value.map(cat => cat.name));

    // Set arrays from chips component
    courseData.topics = topicsArray.value;
    courseData.results = resultsArray.value;
    courseData.targetAudience = targetAudienceArray.value;
    courseData.awards = awardsArray.value;

    // Set subscription included flag
    courseData.isSubscribtionIncluded = courseData.subscriptionIncludedNames.length > 0;

    // Send data to API
    await courseAdminStore.createCourse(courseData);

    // Check for errors
    if (courseAdminStore.error) {
      throw new Error(courseAdminStore.error);
    }

    // Show success message
    toast.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم إنشاء الدورة بنجاح', life: 3000 });

    // Close dialog
    courseDialogVisible.value = false;

    // Refresh course list
    applyFiltersAndSort();

    // Reset form after successful submission
    resetForm();
  } catch (error) {
    toast.add({ severity: 'error', summary: 'خطأ', detail: error.message || 'حدث خطأ أثناء إنشاء الدورة', life: 3000 });
  } finally {
    submitting.value = false;
  }
}
</script>

<style>
/* These utility classes enable RTL (right-to-left) support for PrimeVue components */
:deep(.p-inputgroup),
:deep(.p-popover .p-popover-content),
:deep(.p-popover),
:deep(.p-select),
:deep(.p-select-panel),
:deep(.p-dialog) {
  direction: rtl;
}

:deep(.p-slider) {
  direction: ltr;
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

/* Add styles for form validation */
:deep(.p-invalid) {
  border-color: #f44336;
}

/* Add styles for form sections */
.surface-card {
  background-color: #ffffff;
}

/* Make sure dialog form is scrollable */
:deep(.p-dialog-content) {
  overflow-y: visible;
}
</style>
