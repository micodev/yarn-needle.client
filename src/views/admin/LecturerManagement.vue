<template>
  <div class="lecturer-management">
    <h1>إدارة المحاضرين</h1>
    <div class="admin-panel">
      <div class="actions-bar">
        <button @click="addNewLecturer" class="add-btn">إضافة محاضر جديد</button>
        <div class="search-box">
          <input
            type="text"
            placeholder="البحث عن محاضرين..."
            v-model="searchQuery"
            @input="handleSearch"
          />
        </div>
      </div>

      <div v-if="lecturerStore.loading" class="loading">جاري التحميل...</div>
      <div v-else-if="lecturerStore.hasError" class="error-message">
        {{ lecturerStore.error }}
      </div>
      <table v-else class="lecturer-table">
        <thead>
          <tr>
            <th>الرقم التعريفي</th>
            <th>الاسم</th>
            <th>نبذة تعريفية</th>
            <th>الدورات</th>
            <th>التقييم</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lecturer in lecturerStore.lecturers" :key="lecturer.id">
            <td>{{ lecturer.id }}</td>
            <td>
              <div class="lecturer-info">
                <img :src="lecturer.profilePicture || defaultAvatar" :alt="lecturer.name" class="lecturer-avatar" />
                <div>
                  <div class="lecturer-name">{{ lecturer.name }}</div>
                  <div class="lecturer-email">{{ lecturer.email }}</div>
                </div>
              </div>
            </td>
            <td>{{ lecturer.about }}</td>
            <td>{{ lecturer.courseCount }}</td>
            <td>
              <div class="rating">
                {{ lecturer.rating || 'غير متاح' }}/5
                <span class="stars">★★★★★</span>
              </div>
            </td>
            <td>
              <span class="status-badge" :class="lecturer.status">{{ lecturer.status === 'active' ? 'نشط' : 'غير نشط' }}</span>
            </td>
            <td class="actions">
              <button @click="editLecturer(lecturer)">تعديل</button>
              <button @click="viewCourses(lecturer.id)">الدورات</button>
              <button @click="deleteLecturer(lecturer.id)" class="delete">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination controls -->
      <div class="pagination" v-if="lecturerStore.pagination.totalPages > 1">
        <button
          :disabled="lecturerStore.pagination.currentPage === 1"
          @click="changePage(lecturerStore.pagination.currentPage - 1)"
        >
          السابق
        </button>
        <span>الصفحة {{ lecturerStore.pagination.currentPage }} من {{ lecturerStore.pagination.totalPages }}</span>
        <button
          :disabled="lecturerStore.pagination.currentPage >= lecturerStore.pagination.totalPages"
          @click="changePage(lecturerStore.pagination.currentPage + 1)"
        >
          التالي
        </button>
      </div>
    </div>

    <!-- Modal for adding/editing lecturer would go here -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLecturerStore } from '../../stores/lecturerStore';
import { useRoute, useRouter } from 'vue-router';

const lecturerStore = useLecturerStore();
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const defaultAvatar = 'https://randomuser.me/api/portraits/lego/1.jpg'; // Fallback avatar

// Initialize data
onMounted(async () => {
  // Get page from route query or default to 1
  const page = route.query.page ? parseInt(route.query.page) : 1;
  const search = route.query.search || '';

  if (search) {
    searchQuery.value = search;
  }

  await lecturerStore.fetchLecturers(page, 10, search);
});

// Watch for route changes to update data
watch(
  () => route.query,
  async (query) => {
    const page = query.page ? parseInt(query.page) : 1;
    const search = query.search || '';

    if (search !== searchQuery.value) {
      searchQuery.value = search;
    }

    await lecturerStore.fetchLecturers(page, 10, search);
  }
);

// Debounced search handler
let searchTimeout;
function handleSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    updateRouteQuery({ page: 1, search: searchQuery.value });
  }, 500);
}

// Update route with query parameters
function updateRouteQuery(query) {
  router.push({
    query: {
      ...route.query,
      ...query
    }
  });
}

// Change page
function changePage(page) {
  updateRouteQuery({ page });
}

// Add new lecturer
function addNewLecturer() {
  // Implementation would depend on your UI design
  // Could open a modal or navigate to a form page
  console.log('إضافة محاضر جديد');
}

// Edit lecturer
function editLecturer(lecturer) {
  // Implementation would depend on your UI design
  console.log('تعديل المحاضر:', lecturer);
}

// View courses for a lecturer
function viewCourses(lecturerId) {
  // Navigate to courses page filtered by lecturer
  router.push(`/admin/courses?lecturerId=${lecturerId}`);
}

// Delete a lecturer
async function deleteLecturer(lecturerId) {
  if (confirm('هل أنت متأكد من رغبتك في حذف هذا المحاضر؟')) {
    const success = await lecturerStore.deleteLecturer(lecturerId);
    if (success) {
      // If we're on a page that no longer exists after deletion, go to the last page
      if (lecturerStore.lecturers.length === 0 && lecturerStore.pagination.currentPage > 1) {
        updateRouteQuery({ page: lecturerStore.pagination.currentPage - 1 });
      }
    }
  }
}
</script>

<style scoped>
.lecturer-management {
  padding: 20px;
  direction: rtl; /* Added for Arabic text direction */
  text-align: right;
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
  text-align: right; /* Changed from left to right for Arabic */
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

.loading, .error-message {
  padding: 20px;
  text-align: center;
}

.error-message {
  color: #f44336;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination button {
  padding: 8px 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
