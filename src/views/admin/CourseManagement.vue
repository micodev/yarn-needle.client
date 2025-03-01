<template>
  <div class="course-management">
    <h1>Course Management</h1>
    <div class="admin-panel">
      <div class="actions-bar">
        <button @click="addNewCourse" class="add-btn">Add New Course</button>
        <div class="search-filter">
          <input type="text" placeholder="Search courses..." v-model="searchQuery" />
          <select v-model="filterCategory">
            <option value="">All Categories</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      <table class="course-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Lecturer</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
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
              <button @click="editCourse(course)">Edit</button>
              <button @click="viewDetails(course.id)">Details</button>
              <button @click="deleteCourse(course.id)" class="delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data for demonstration
const courses = ref([
  { id: 1, title: 'Vue.js Masterclass', lecturer: 'John Smith', category: 'development', price: 79.99, status: 'published' },
  { id: 2, title: 'UI/UX Design Principles', lecturer: 'Jane Doe', category: 'design', price: 89.99, status: 'published' },
  { id: 3, title: 'Business Analytics', lecturer: 'Robert Johnson', category: 'business', price: 99.99, status: 'draft' },
])

const searchQuery = ref('')
const filterCategory = ref('')

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = filterCategory.value === '' || course.category === filterCategory.value

    return matchesSearch && matchesCategory
  })
})

function addNewCourse() {
  // Implement add new course logic
  console.log('Adding new course')
}

function editCourse(course) {
  // Implement edit logic
  console.log('Editing course:', course)
}

function viewDetails(courseId) {
  // Implement view details logic
  console.log('Viewing details for course ID:', courseId)
}

function deleteCourse(courseId) {
  // Implement delete logic
  console.log('Deleting course with ID:', courseId)
  courses.value = courses.value.filter(course => course.id !== courseId)
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

.search-filter input, .search-filter select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.course-table {
  width: 100%;
  border-collapse: collapse;
}

.course-table th, .course-table td {
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
