<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <div class="admin-content">
      <div class="card">
        <h2>User Management</h2>
        <p>Manage users and permissions</p>
      </div>
      <div class="card">
        <h2>Course Management</h2>
        <p>Create, update, and delete courses</p>
      </div>
      <div class="card">
        <h2>Order Management</h2>
        <p>Review and process orders</p>
      </div>
      <div class="card">
        <h2>Statistics</h2>
        <p>View site statistics and analytics</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  // Check if user has admin permissions
  if (!authStore.isAdmin) {
    // Redirect non-admin users
    router.push('/');
  }
});
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.admin-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

h2 {
  color: #555;
  margin-bottom: 10px;
}

p {
  color: #777;
}
</style>
