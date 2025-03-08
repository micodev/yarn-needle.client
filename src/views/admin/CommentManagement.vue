<template>
  <div class="max-w-7xl mx-auto p-5">
    <h1 class="text-2xl mb-5">إدارة التعليقات</h1>
    <div class="rounded-lg p-5 shadow-md">
      <!-- Removed search and filter controls -->

      <!-- Updated comment view to grid layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="comment in commentStore.comments"
          :key="comment.id"
          class="rounded-md p-4 shadow-sm bg-white"
        >
          <div class="flex justify-between mb-2.5">
            <div class="flex items-center gap-2.5">
              <img
                :src="comment.userAvatar"
                :alt="comment.userName"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div class="font-bold">{{ comment.userName }}</div>
                <div class="text-xs">
                  <!-- Removed date display -->
                  <span>الدورة: {{ comment.course }}</span>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>

          <div class="mb-4 leading-relaxed">
            <template v-if="hasMoreThan3Lines(comment.content)">
              <div v-if="expandedComments[comment.id]">
                <div class="whitespace-pre-wrap">{{ comment.content }}</div>
                <Button @click="toggleExpand(comment)" class="text-sm" variant="text">
                  اخفاء
                </Button>
              </div>
              <div v-else>
                <div class="whitespace-pre-wrap">{{ getFirstThreeLines(comment.content) }}</div>
                <Button @click="toggleExpand(comment)" class="text-sm" variant="text">
                  عرض المزيد
                </Button>
              </div>
            </template>
            <template v-else>
              {{ comment.content }}
            </template>
            <Badge v-if="comment.deletedAt" class="mr-1" value="مخفى" severity="danger" />
          </div>

          <!-- New rating display -->
          <div class="mb-2">
            <span>{{ getStars(comment.rating) }}</span>
          </div>

          <div class="flex gap-2.5">
            <Button
              @click="hideComment(comment.id)"
              class="px-3 py-1.5 rounded text-sm hover:bg-opacity-90 transition"
            >
              إخفاء
            </Button>
          </div>
        </div>

        <div v-if="commentStore.comments.length === 0" class="text-center py-5">
          لا توجد تعليقات تطابق معايير البحث
        </div>
      </div>

      <div class="mt-5 flex justify-center items-center gap-2.5">
        <Button
          :disabled="currentPage === 1"
          @click="gotoPage(currentPage - 1)"
          class="px-4 py-2 border rounded disabled:cursor-not-allowed"
        >
          السابق
        </Button>
        <span>الصفحة {{ currentPage }} من {{ totalPages }}</span>
        <Button
          :disabled="currentPage === totalPages"
          @click="gotoPage(currentPage + 1)"
          class="px-4 py-2 border rounded disabled:cursor-not-allowed"
        >
          التالي
        </Button>
      </div>
    </div>
    <!-- Removed Dialog component -->
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useCommentManagementStore } from '../../stores/commentManagementStore.js'
import Badge from 'primevue/badge'
import {Button} from 'primevue'

const commentStore = useCommentManagementStore()

onMounted(() => {
  commentStore.fetchComments() // initial fetch will set pagination info
})

// Removed searchQuery, courseFilter, statusFilter, uniqueCourses and formatDate

const currentPage = computed(() => commentStore.pagination.pageIndex || 1)
const totalPages = computed(() => commentStore.pagination.totalPages || 1)

function gotoPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    commentStore.fetchComments(page)
  }
}

const hideComment = (commentId) => {
  commentStore.hideComment(commentId)
}

// Add reactive state for expanded comments
const expandedComments = reactive({})

function toggleExpand(comment) {
  expandedComments[comment.id] = !expandedComments[comment.id]
}

// Helper function: check if comment has more than 3 lines
function hasMoreThan3Lines(content) {
  if (content.includes('\n')) {
    return content.split('\n').length > 3;
  } else {
    // Estimate 100 characters per line for single-line content
    const approxLines = Math.ceil(content.length / 100);
    return approxLines > 3;
  }
}

// Helper function: get first three lines of comment
function getFirstThreeLines(content) {
  if (content.includes('\n')) {
    return content.split('\n').slice(0, 3).join('\n');
  } else {
    // Return first approx 300 characters as three lines
    return content.slice(0, 300);
  }
}

// New helper to show rating as emoji stars
function getStars(rating) {
  return "⭐".repeat(rating)
}
</script>
