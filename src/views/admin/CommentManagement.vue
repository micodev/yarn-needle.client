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
          v-for="comment in commentStore.comments"
          :key="comment.id"
          class="bg-white rounded-md p-4 shadow-sm"
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
            </div>
          </div>

          <div class="mb-4 leading-relaxed">
            {{ comment.content }}
          </div>

          <div class="flex gap-2.5">
            <button
              @click="hideComment(comment.id)"
              class="px-3 py-1.5 bg-gray-500 text-white rounded text-sm hover:bg-opacity-90 transition"
            >
              Hide
            </button>
          </div>
        </div>

        <div v-if="commentStore.comments.length === 0" class="text-center py-5 text-gray-500">
          No comments match your search criteria
        </div>
      </div>

      <div class="mt-5 flex justify-center items-center gap-2.5">
        <button
          :disabled="currentPage === 1"
          @click="gotoPage(currentPage - 1)"
          class="px-4 py-2 border border-gray-300 bg-white rounded disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="gotoPage(currentPage + 1)"
          class="px-4 py-2 border border-gray-300 bg-white rounded disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCommentManagementStore } from '../../stores/commentManagementStore.js'

const commentStore = useCommentManagementStore()

onMounted(() => {
  commentStore.fetchComments() // initial fetch will set pagination info
})

const searchQuery = ref('')
const courseFilter = ref('')
const statusFilter = ref('')

const uniqueCourses = computed(() => {
  return [...new Set(commentStore.comments.map(comment => comment.course))]
})

const currentPage = computed(() => commentStore.pagination.page || 1)
const totalPages = computed(() => commentStore.pagination.totalPages || 1)

function gotoPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    commentStore.fetchComments(page)
  }
}

// Format date to a more readable form
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Removed previous operations: approveComment, flagComment, deleteComment, replyToComment

// Added hide operation
const hideComment = (commentId) => {
  const comment = commentStore.comments.find(c => c.id === commentId)
  if (comment) {
    comment.hidden = true
    console.log(`Hide action triggered for comment ${commentId}`)
  }
}
</script>
