<template>
  <div class="user-management">
    <h1>User Management</h1>
    <div class="admin-panel">
      <div class="search-filter">
        <input type="text" placeholder="Search users..." v-model="searchQuery" />
        <select v-model="filterRole">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="lecturer">Lecturer</option>
        </select>
      </div>

      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.status }}</td>
            <td class="actions">
              <button @click="editUser(user)">Edit</button>
              <button @click="deleteUser(user.id)" class="delete">Delete</button>
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
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'lecturer', status: 'inactive' },
])

const searchQuery = ref('')
const filterRole = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesRole = filterRole.value === '' || user.role === filterRole.value

    return matchesSearch && matchesRole
  })
})

function editUser(user) {
  // Implement edit logic
  console.log('Editing user:', user)
}

function deleteUser(userId) {
  // Implement delete logic
  console.log('Deleting user with ID:', userId)
  users.value = users.value.filter(user => user.id !== userId)
}
</script>

<style scoped>
.user-management {
  padding: 20px;
}

.admin-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-filter input, .search-filter select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-filter input {
  flex: 1;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th, .user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.user-table th {
  background-color: #f8f9fa;
}

.actions button {
  margin-right: 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
}

.actions button.delete {
  background-color: #f44336;
}
</style>
