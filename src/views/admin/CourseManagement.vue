<template>
  <div class="course-management">
    <h1>إدارة الدورات</h1>
    <div class="admin-panel">
      <div class="actions-bar">
        <button @click="addNewCourse" class="add-btn">إضافة دورة جديدة</button>
        <div class="search-filter">
          <input type="text" placeholder="ابحث عن دورات..." v-model="searchQuery" />
          <select v-model="filterCategory">
            <option value="">جميع الفئات</option>
            <option value="development">تطوير</option>
            <option value="design">تصميم</option>
            <option value="business">أعمال</option>
          </select>
        </div>
      </div>

      <div v-if="courseAdminStore.loading">Loading...</div>

      <table v-else class="course-table">
        <thead>
          <tr>
            <th>المعرف</th>
            <th>العنوان</th>
            <th>النوع</th>
            <th>الفئات</th>
            <th>المدة (دقيقة)</th>
            <th>السعر</th>
            <th>الخصم</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in filteredCourses" :key="course.id">
            <td>{{ course.id }}</td>
            <td>{{ course.title }}</td>
            <td>{{ course.type }}</td>
            <td>
              <button @click="showCategoryDialog(parseCategoryJson(course.category))">عرض الفئات</button>
            </td>
            <td>{{ course.duration }}</td>
            <td>{{ course.originalPrice }} {{ course.currency }}</td>
            <td>{{ course.discount }}%</td>
            <td class="actions">
              <button @click="editCourse(course)">تعديل</button>
              <button @click="viewDetails(course.id)">تفاصيل</button>
              <button @click="deleteCourse(course.id)" class="delete">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
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
import Dialog from 'primevue/dialog'

const courseAdminStore = useCourseAdminStore()
const searchQuery = ref('')
const filterCategory = ref('')
const categoryDialogVisible = ref(false)
const selectedCategories = ref([])

const filteredCourses = computed(() => {
  return courseAdminStore.courses.filter(course => {
    const matchesSearch =LowerCase()))
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory =      (course.category && parseCategoryJson(course.category).some(cat =>
      filterCategory.value === '' || course.category.some(cat => cat.name === filterCategory.value)tegory.value.toLowerCase())
  ))
    return matchesSearch && matchesCategory
  })    return matchesSearch && matchesCategory
})

onMounted(() => {
  courseAdminStore.fetchAllCourses()onMounted(() => {
})llCourses()

function addNewCourse() {
  console.log('إضافة دورة جديدة')function parseCategoryJson(categoryStr) {
}

function editCourse(course) {   return JSON.parse(categoryStr)
  console.log('تعديل الدورة:', course)  } catch (e) {
} category JSON:', e)

function viewDetails(courseId) { }
  console.log('عرض تفاصيل الدورة:', courseId)}
}

async function deleteCourse(courseId) { console.log('إضافة دورة جديدة')
  await courseAdminStore.deleteCourse(courseId)}
}

function showCategoryDialog(categories) {e)
  selectedCategories.value = categories
  categoryDialogVisible.value = true
}function viewDetails(courseId) {
'عرض تفاصيل الدورة:', courseId)
function parseCategoryJson(categoryJson) {
  try {
    return JSON.parse(categoryJson)sync function deleteCourse(courseId) {
  } catch (error) {  await courseAdminStore.deleteCourse(courseId)
    console.error('Failed to parse category JSON:', error)
    return []
  }Dialog(categories) {
}cat => ({ id: Date.now(), name: cat }))
</script>Visible.value = true

<style scoped></script>
.course-management {
  padding: 20px;
}

.admin-panel {
  background: white;
  border-radius: 8px;el {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
} 2px 10px rgba(0, 0, 0, 0.1);
;
.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px; display: flex;
}  justify-content: space-between;
 20px;
.add-btn {
  padding: 10px 16px;
  background-color: #4CAF50;add-btn {
  color: white;  padding: 10px 16px;
  border: none;4CAF50;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
 font-weight: bold;
.search-filter {}
  display: flex;
  gap: 10px; {
}
 gap: 10px;
.search-filter input,}
.search-filter select {
  padding: 8px;ut,
  border: 1px solid #ddd;elect {
  border-radius: 4px;
}
 border-radius: 4px;
.course-table {}
  width: 100%;
  border-collapse: collapse;
} width: 100%;
  border-collapse: collapse;
.course-table th,
.course-table td {
  padding: 12px;
  text-align: left;d {
  border-bottom: 1px solid #eee;
};
eee;
.course-table th {
  background-color: #f8f9fa;
}.course-table th {
9fa;
.actions button {
  margin-right: 5px;
  padding: 6px 12px; button {
  border: none;  margin-right: 5px;











</style>}  background-color: #f44336;.actions button.delete {}  color: white;  background-color: #2196F3;  cursor: pointer;  border-radius: 4px;  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2196F3;
  color: white;
}

.actions button.delete {
  background-color: #f44336;
}
</style>
