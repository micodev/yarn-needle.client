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
            <th>المحاضر</th>
            <th>الفئة</th>
            <th>السعر</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in filteredCourses" :key="course.id">
            <td>{{ course.id }}</td>
            <td>{{ course.title }}</td>
            <td>{{ course.lecturer }}</td>
            <td>{{ course.category }}</td>
            <td>${{ course.price }}</td>
            <td>{{ course.status }}</td>
            <td class="actions">
              <button @click="editCourse(course)">تعديل</button>
              <button @click="viewDetails(course.id)">تفاصيل</button>
              <button @click="deleteCourse(course.id)" class="delete">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCourseAdminStore } from '@/stores/courseManagementStore'

const courseAdminStore = useCourseAdminStore()
const searchQuery = ref('')
const filterCategory = ref('')

const filteredCourses = computed(() => {
  return courseAdminStore.courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = filterCategory.value === '' || course.category === filterCategory.value

    return matchesSearch && matchesCategory
  })
})

onMounted(() => {
  courseAdminStore.fetchAllCourses()
})

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

.add-btn {
  padding: 10px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.search-filter {
  display: flex;
  gap: 10px;
}

.search-filter input,
.search-filter select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.course-table {
  width: 100%;
  border-collapse: collapse;
}

.course-table th,
.course-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.course-table th {
  background-color: #f8f9fa;
}

.actions button {
  margin-right: 5px;
  padding: 6px 12px;
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
