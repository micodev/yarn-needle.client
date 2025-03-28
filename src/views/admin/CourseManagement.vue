<template>
  <div class="p-5">
    <h1 class="text-3xl font-bold mb-3">إدارة الدورات</h1>
    <div class="rounded-lg shadow-md p-5">
      <!-- Use shared filter component with admin configuration -->
      <CourseFilterBar
        :admin-mode="true"
        @apply-filters="handleFilterChange"
        @clear-filters="clearFilters"
      >
        <template #beforeFilters>
          <Button @click="addNewCourse" icon="pi pi-plus" label="إضافة دورة جديدة" severity="success" />
        </template>
      </CourseFilterBar>

      <div v-if="courseAdminStore.loading" class="flex justify-center items-center min-h-[300px] w-full">
        <ProgressSpinner />
      </div>
      <div v-else-if="filteredCourses.length > 0">
        <DataTable
          :value="filteredCourses"
          stripedRows
          :show-gridlines="true"
          paginator
          :rows="10"
          tableStyle="min-width: 50rem"
          :rowsPerPageOptions="[5, 10, 20, 50]"
        >
          <Column field="id" header="المعرف" sortable />
          <Column field="title" header="العنوان" sortable />
          <Column field="typeName" header="النوع" sortable />
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
                <Button icon="pi pi-eye" @click="viewDetails(slotProps.data.id)" severity="secondary" size="small" class="mx-2" />
                <Button icon="pi pi-ban" @click="deactivateCourse(slotProps.data.id)" severity="warning" size="small" />
              </div>
            </template>
          </Column>
        </DataTable>
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

    <!-- Replace New Course Dialog with CourseForm component -->
    <CourseForm v-model:visible="courseDialogVisible" @course-submitted="onCourseSubmitted" />

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
import { ref, computed, onMounted } from 'vue';
import { useCourseStore } from '@/stores/courseStore'; // Use unified store
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import CourseForm from './CourseForm.vue';
import CourseFilterBar from '@/components/CourseFilterBar.vue';

const courseStore = useCourseStore();
const router = useRouter();

const categoryDialogVisible = ref(false);
const selectedCategories = ref([]);
const subscriptionDialogVisible = ref(false);
const selectedSubscriptions = ref([]);
const courseDialogVisible = ref(false);

// Make sure to set admin mode in the store
onMounted(async () => {
  courseStore.setAdminMode(true);
  await courseStore.fetchAllAdminCourses({});
});

// Use the filtered courses directly from the store
const filteredCourses = computed(() => courseStore.courses);

function parseCategoryJson(categoryStr) {
  if (!categoryStr) return [];
  try {
    return JSON.parse(categoryStr);
  } catch (e) {
    console.error('Error parsing category JSON:', e);
    return [];
  }
}

function addNewCourse() {
  courseDialogVisible.value = true;
}

function viewDetails(courseId) {
  router.push({ name: 'course', params: { id: courseId }});
}

async function deactivateCourse(courseId) {
  await courseStore.deleteCourse(courseId);
  // Refresh the courses list
  handleFilterChange({});
}

function showCategoryDialog(categories) {
  selectedCategories.value = categories.map(cat => ({ id: Date.now() + Math.random(), name: cat }));
  categoryDialogVisible.value = true;
}

function showSubscriptionDialog(subscriptions) {
  selectedSubscriptions.value = subscriptions || [];
  subscriptionDialogVisible.value = true;
}

function formatDuration(minutes) {
  if (!minutes) return '0 دقيقة';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} دقيقة`;
  } else if (remainingMinutes === 0) {
    return `${hours} ساعة`;
  } else {
    return `${hours} ساعة ${remainingMinutes} دقيقة`;
  }
}

// Handler for filter component changes
function handleFilterChange(queryParams) {
  courseStore.fetchAllAdminCourses(queryParams);
}

function clearFilters() {
  // This will be called when the filter component clears its filters
  courseStore.fetchAllAdminCourses({});
}

function clearAllFilters() {
  clearFilters();
}

function onCourseSubmitted() {
  handleFilterChange({});
}
</script>
