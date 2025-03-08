<template>
  <div class="max-w-7xl mx-auto p-5">
    <h1 class="text-2xl mb-5">إدارة التعليقات</h1>
    <div class="rounded-lg p-5 shadow-md">
      <!-- Removed search and filter controls -->

      <div class="flex flex-col gap-4">
        <div
          v-for="comment in commentStore.comments"
          :key="comment.id"
          class="rounded-md p-4 shadow-sm"
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
            {{ comment.content }}
            <span v-if="comment.deletedAt" class="ml-2 inline-block rounded px-2 py-0.5 text-xs">مخفى</span>
          </div>

          <div class="flex gap-2.5">
            <button
              @click="hideComment(comment.id)"
              class="px-3 py-1.5 rounded text-sm hover:bg-opacity-90 transition"
            >
              إخفاء
            </button>
          </div>
        </div>

        <div v-if="commentStore.comments.length === 0" class="text-center py-5">
          لا توجد تعليقات تطابق معايير البحث
        </div>
      </div>

      <div class="mt-5 flex justify-center items-center gap-2.5">
        <button
          :disabled="currentPage === 1"
          @click="gotoPage(currentPage - 1)"
          class="px-4 py-2 border rounded disabled:cursor-not-allowed"
        >
          السابق
        </button>
        <span>الصفحة {{ currentPage }} من {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="gotoPage(currentPage + 1)"
          class="px-4 py-2 border rounded disabled:cursor-not-allowed"
        >
          التالي
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

// Removed searchQuery, courseFilter, statusFilter, uniqueCourses and formatDate

const currentPage = computed(() => commentStore.pagination.pageIndex || 1)
const totalPages = computed(() => commentStore.pagination.totalPages || 1)

function gotoPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    commentStore.fetchComments(page)
  }
}

// Added hide operation: call the store action to hide a comment by id.
const hideComment = (commentId) => {
  commentStore.hideComment(commentId)
}
</script>
