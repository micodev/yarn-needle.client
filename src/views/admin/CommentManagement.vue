<template>
  <div class="max-w-7xl mx-auto p-5">
    <h1 class="text-2xl mb-5 text-gray-800">Comment Management</h1>
    <div class="bg-gray-50 rounded-lg p-5 shadow-md">
      <div class="flex flex-wrap justify-between items-center gap-2.5 mb-5">
        <div class="search-box">
          <input
            type="text"
            placeholder="Search comments..."
            v-model="searchQuery"
            class="p-2.5 border border-gray-300 rounded-md w-72 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex gap-2.5">
          <select
            v-model="courseFilter"
            class="p-2.5 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Courses</option>
            <option v-for="course in uniqueCourses" :key="course" :value="course">{{ course }}</option>
          </select>
          <select
            v-model="statusFilter"
            class="p-2.5 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Review</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div
          v-for="comment in paginatedComments"
          :key="comment.id"
          class="bg-white rounded-md p-4 shadow-sm"
          :class="{
            'border-l-4 border-red-500': comment.status === 'flagged',
            'border-l-4 border-yellow-500': comment.status === 'pending'
          }"
        >
          <div class="flex justify-between mb-2.5">
            <div class="flex items-center gap-2.5">
              <img
                :src="comment.userAvatar"
                :alt="comment.userName"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div class="font-bold text-gray-800">{{ comment.userName }}</div>
                <div class="text-xs text-gray-500">
                  <span>{{ formatDate(comment.date) }}</span> |
                  <span>Course: {{ comment.course }}</span>
                </div>
              </div>
            </div>
            <div>
              <span
                class="text-xs px-2 py-1 rounded-full capitalize"
                :class="{
                  'bg-green-500 text-white': comment.status === 'approved',
                  'bg-yellow-500 text-white': comment.status === 'pending',
                  'bg-red-500 text-white': comment.status === 'flagged'
                }"
              >
                {{ comment.status }}
              </span>
            </div>
          </div>

          <div class="mb-4 leading-relaxed">
            {{ comment.content }}
          </div>

          <div class="flex gap-2.5">
            <button
              v-if="comment.status !== 'approved'"
              @click="approveComment(comment.id)"
              class="px-3 py-1.5 bg-green-500 text-white rounded text-sm hover:bg-opacity-90 transition"
            >
              Approve
            </button>
            <button
              v-if="comment.status !== 'flagged'"
              @click="flagComment(comment.id)"
              class="px-3 py-1.5 bg-yellow-500 text-white rounded text-sm hover:bg-opacity-90 transition"
            >
              Flag
            </button>
            <button
              @click="deleteComment(comment.id)"
              class="px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-opacity-90 transition"
            >
              Delete
            </button>
            <button
              @click="replyToComment(comment.id)"
              class="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-opacity-90 transition"
            >
              Reply
            </button>
          </div>
        </div>

        <div v-if="filteredComments.length === 0" class="text-center py-5 text-gray-500">
          No comments match your search criteria
        </div>
      </div>

      <div class="mt-5 flex justify-center items-center gap-2.5">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="px-4 py-2 border border-gray-300 bg-white rounded disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="px-4 py-2 border border-gray-300 bg-white rounded disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
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
