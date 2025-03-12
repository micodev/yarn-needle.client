<template>
  <div class="course-management">
    <h1>إدارة الدورات</h1>
    <div class="admin-panel">
      <div class="actions-bar">
        <Button @click="addNewCourse" icon="pi pi-plus" label="إضافة دورة جديدة" severity="success" />
        <div class="search-filter">
          <InputText v-model="searchQuery" placeholder="ابحث عن دورات..." />
          <Dropdown v-model="filterCategory" :options="categoryOptions" optionLabel="label" optionValue="value" placeholder="جميع الفئات" />
        </div>
      </div>

      <div v-if="courseAdminStore.loading">
        <ProgressSpinner />
      </div>

      <DataTable
        v-else
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
        <Column header="الفئات">
          <template #body="slotProps">
            <Button label="عرض الفئات" @click="showCategoryDialog(parseCategoryJson(slotProps.data.category))" size="small" />
          </template>
        </Column>
        <Column field="duration" header="المدة (دقيقة)" sortable />
        <Column header="السعر" sortable>
          <template #body="slotProps">
            {{ slotProps.data.originalPrice }} {{ slotProps.data.currency }}
          </template>
        </Column>
        <Column field="discount" header="الخصم" sortable>
          <template #body="slotProps">
            {{ slotProps.data.discount }}%
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

    <Dialog v-model:visible="categoryDialogVisible" modal header="Course Categories" :style="{ width: '50vw' }">
      <ul>
        <li v-for="category in selectedCategories" :key="category.id">{{ category.name }}</li>
      </ul>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCourseAdminStore } from '@/stores/courseManagementStore'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import ProgressSpinner from 'primevue/progressspinner'

const courseAdminStore = useCourseAdminStore()
const searchQuery = ref('')
const filterCategory = ref('')
const categoryDialogVisible = ref(false)
const selectedCategories = ref([])

const categoryOptions = [
  { label: 'جميع الفئات', value: '' },
  { label: 'تطوير', value: 'development' },
  { label: 'تصميم', value: 'design' },
  { label: 'أعمال', value: 'business' }
]

const filteredCourses = computed(() => {
  return courseAdminStore.courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (course.type && course.type.toLowerCase().includes(searchQuery.value.toLowerCase()))

    const matchesCategory =
      filterCategory.value === '' ||
      (course.category && parseCategoryJson(course.category).some(cat =>
        cat.toLowerCase().includes(filterCategory.value.toLowerCase())
      ))

    return matchesSearch && matchesCategory
  })
})

onMounted(() => {
  courseAdminStore.fetchAllCourses()
})

function parseCategoryJson(categoryStr) {
  if (!categoryStr) return []
  try {
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
  selectedCategories.value = categories.map(cat => ({ id: Date.now(), name: cat }))
  categoryDialogVisible.value = true
}
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

/* Additional styles can be removed since PrimeVue components have their own styling */
</style>
