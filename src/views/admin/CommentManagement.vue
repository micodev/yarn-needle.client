<template>
  <div class="comment-management">
    <h1>Comment Management</h1>
    <div class="admin-panel">
      <div class="filter-section">
        <div class="search-box">
          <input type="text" placeholder="Search comments..." v-model="searchQuery" />
        </div>
        <div class="filters">
          <select v-model="courseFilter">
            <option value="">All Courses</option>
            <option v-for="course in uniqueCourses" :key="course" :value="course">{{ course }}</option>
          </select>
          <select v-model="statusFilter">
            <option value="">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Review</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      <div class="comments-list">
        <div
          v-for="comment in paginatedComments"
          :key="comment.id"
          class="comment-card"
          :class="{ 'flagged': comment.status === 'flagged', 'pending': comment.status === 'pending' }"
        >
          <div class="comment-header">
            <div class="user-info">
              <img :src="comment.userAvatar" :alt="comment.userName" class="user-avatar" />
              <div>
                <div class="user-name">{{ comment.userName }}</div>
                <div class="comment-meta">
                  <span>{{ formatDate(comment.date) }}</span> |
                  <span>Course: {{ comment.course }}</span>
                </div>
              </div>
            </div>
            <div class="comment-status">
              <span class="status-badge" :class="comment.status">{{ comment.status }}</span>
            </div>
          </div>

          <div class="comment-content">
            {{ comment.content }}
          </div>

          <div class="comment-actions">
            <button v-if="comment.status !== 'approved'" @click="approveComment(comment.id)" class="approve">Approve</button>
            <button v-if="comment.status !== 'flagged'" @click="flagComment(comment.id)" class="flag">Flag</button>
            <button @click="deleteComment(comment.id)" class="delete">Delete</button>
            <button @click="replyToComment(comment.id)" class="reply">Reply</button>
          </div>
        </div>

        <div v-if="filteredComments.length === 0" class="no-results">
          No comments match your search criteria
        </div>
      </div>

      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data for demonstration
const comments = ref([
  {
    id: 1,
    userName: 'Alice Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    date: '2023-06-28',
    course: 'Vue.js Masterclass',
    content: 'Great course! I learned so much about Vue 3 composition API.',
    status: 'approved'
  },
  {
    id: 2,
    userName: 'Bob Smith',
    userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: '2023-06-27',
    course: 'UI/UX Design Principles',
    content: 'The instructor explains the concepts very clearly.',
    status: 'pending'
  },
  {
    id: 3,
    userName: 'Charlie Brown',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '2023-06-26',
    course: 'Business Analytics',
    content: 'This course contains some inappropriate content. Please check module 3.',
    status: 'flagged'
  },
  {
    id: 4,
    userName: 'Diana Miller',
    userAvatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    date: '2023-06-25',
    course: 'Vue.js Masterclass',
    content: 'I wish there were more practice exercises, but overall it was helpful.',
    status: 'approved'
  },
])

const searchQuery = ref('')
const courseFilter = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

const uniqueCourses = computed(() => {
  return [...new Set(comments.value.map(comment => comment.course))]
})

const filteredComments = computed(() => {
  return comments.value.filter(comment => {
    // Search filter
    const matchesSearch = searchQuery.value === '' ||
      comment.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      comment.userName.toLowerCase().includes(searchQuery.value.toLowerCase());

    // Course filter
    const matchesCourse = courseFilter.value === '' || comment.course === courseFilter.value;

    // Status filter
    const matchesStatus = statusFilter.value === '' || comment.status === statusFilter.value;

    return matchesSearch && matchesCourse && matchesStatus;
  });
})

const totalPages = computed(() => {
  return Math.ceil(filteredComments.value.length / itemsPerPage) || 1;
})

const paginatedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredComments.value.slice(startIndex, endIndex);
})

// Format date to a more readable form
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Comment management methods
const approveComment = (commentId) => {
  const commentIndex = comments.value.findIndex(c => c.id === commentId);
  if (commentIndex !== -1) {
    comments.value[commentIndex].status = 'approved';
    // In a real app: API call to update the comment status
    console.log(`Approved comment ${commentId}`);
  }
}

const flagComment = (commentId) => {
  const commentIndex = comments.value.findIndex(c => c.id === commentId);
  if (commentIndex !== -1) {
    comments.value[commentIndex].status = 'flagged';
    // In a real app: API call to update the comment status
    console.log(`Flagged comment ${commentId}`);
  }
}

const deleteComment = (commentId) => {
  if (confirm('Are you sure you want to delete this comment?')) {
    comments.value = comments.value.filter(c => c.id !== commentId);
    // In a real app: API call to delete the comment
    console.log(`Deleted comment ${commentId}`);

    // Handle pagination when deleting the last item on a page
    if (paginatedComments.value.length === 0 && currentPage.value > 1) {
      currentPage.value--;
    }
  }
}

const replyToComment = (commentId) => {
  // In a real app: Open a modal or navigate to a reply form
  console.log(`Replying to comment ${commentId}`);
}
</script>

<style scoped>
.comment-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.admin-panel {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filter-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.search-box input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  font-size: 14px;
}

.filters {
  display: flex;
  gap: 10px;
}

.filters select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-card {
  background-color: white;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.comment-card.flagged {
  border-left: 4px solid #ff4d4f;
}

.comment-card.pending {
  border-left: 4px solid #faad14;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: bold;
  color: #333;
}

.comment-meta {
  font-size: 12px;
  color: #777;
}

.status-badge {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 10px;
  text-transform: capitalize;
}

.status-badge.approved {
  background-color: #52c41a;
  color: white;
}

.status-badge.pending {
  background-color: #faad14;
  color: white;
}

.status-badge.flagged {
  background-color: #ff4d4f;
  color: white;
}

.comment-content {
  margin-bottom: 15px;
  line-height: 1.5;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

.comment-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.approve {
  background-color: #52c41a;
  color: white;
}

.flag {
  background-color: #faad14;
  color: white;
}

.delete {
  background-color: #ff4d4f;
  color: white;
}

.reply {
  background-color: #1890ff;
  color: white;
}

.comment-actions button:hover {
  opacity: 0.9;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #777;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  color: #666;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
  }

  .search-box input {
    width: 100%;
  }

  .filters {
    width: 100%;
  }

  .filters select {
    flex: 1;
  }
}
</style>
