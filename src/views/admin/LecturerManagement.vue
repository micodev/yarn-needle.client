<template>
  <div class="lecturer-management">
    <h1>Lecturer Management</h1>
    <div class="admin-panel">
      <div class="actions-bar">
        <button @click="addNewLecturer" class="add-btn">Add New Lecturer</button>
        <div class="search-box">
          <input type="text" placeholder="Search lecturers..." v-model="searchQuery" />
        </div>
      </div>

      <table class="lecturer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Expertise</th>
            <th>Courses</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lecturer in filteredLecturers" :key="lecturer.id">
            <td>{{ lecturer.id }}</td>
            <td>
              <div class="lecturer-info">
                <img :src="lecturer.avatar" :alt="lecturer.name" class="lecturer-avatar" />
                <div>
                  <div class="lecturer-name">{{ lecturer.name }}</div>
                  <div class="lecturer-email">{{ lecturer.email }}</div>
                </div>
              </div>
            </td>
            <td>{{ lecturer.expertise }}</td>
            <td>{{ lecturer.coursesCount }}</td>
            <td>
              <div class="rating">
                {{ lecturer.rating }}/5
                <span class="stars">★★★★★</span>
              </div>
            </td>
            <td>
              <span class="status-badge" :class="lecturer.status">{{ lecturer.status }}</span>
            </td>
            <td class="actions">
              <button @click="editLecturer(lecturer)">Edit</button>
              <button @click="viewCourses(lecturer.id)">Courses</button>
              <button @click="deleteLecturer(lecturer.id)" class="delete">Delete</button>
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
const lecturers = ref([
  {
    id: 1,
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    expertise: 'Web Development',
    coursesCount: 5,
    rating: 4.8,
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Prof. Jane Doe',
    email: 'jane.doe@example.com',
    expertise: 'UI/UX Design',
    coursesCount: 3,
    rating: 4.7,
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    name: 'Dr. Robert Johnson',
    email: 'robert.johnson@example.com',
    expertise: 'Data Science',
    coursesCount: 4,
    rating: 4.5,
    status: 'inactive',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
])

const searchQuery = ref('')

const filteredLecturers = computed(() => {
  return lecturers.value.filter(lecturer => {
    return (
      lecturer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      lecturer.expertise.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

function addNewLecturer() {
  console.log('Adding new lecturer')
}

function editLecturer(lecturer) {
  console.log('Editing lecturer:', lecturer)
}

function viewCourses(lecturerId) {
  console.log('Viewing courses for lecturer ID:', lecturerId)
}

function deleteLecturer(lecturerId) {
  console.log('Deleting lecturer with ID:', lecturerId)
  lecturers.value = lecturers.value.filter(lecturer => lecturer.id !== lecturerId)
}
</script>

<style scoped>
.lecturer-management {
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

.search-box input {
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.lecturer-table {
  width: 100%;
  border-collapse: collapse;
}

.lecturer-table th, .lecturer-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.lecturer-table th {
  background-color: #f8f9fa;
}

.lecturer-info {
  display: flex;
  align-items: center;
}

.lecturer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.lecturer-name {
  font-weight: bold;
}

.lecturer-email {
  font-size: 12px;
  color: #666;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.stars {
  color: gold;
  letter-spacing: -3px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.active {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background-color: #f8d7da;
  color: #721c24;
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
