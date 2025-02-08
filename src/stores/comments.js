import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [],
    newComment: { rating: 0, text: "" },
    loading: false,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      limit: 10
    }
  }),

  getters: {
    displayedComments: (state) => state.comments,
    showMoreButton: (state) => state.pagination.currentPage < state.pagination.totalPages
  },

  actions: {
    async fetchComments(courseId) {
      this.loading = true;
      try {
        const response = this.$axios.get(`api/comments/${courseId}`, {
          params: {
            page: this.pagination.currentPage,
            limit: this.pagination.limit
          }
        });
        this.comments = response.data.items || [];
        this.pagination.totalPages = Math.ceil(response.data.total / this.pagination.limit);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        this.loading = false;
      }
    },

    addComment() {
      if (this.newComment.rating && this.newComment.text) {
        this.loading = true;
        setTimeout(() => {
          this.comments.push({
            id: this.comments.length + 1,
            name: "مستخدم جديد",
            avatar: "https://placehold.co/40x40",
            ...this.newComment
          });
          this.newComment.rating = 0;
          this.newComment.text = "";
          this.loading = false;
        }, 1000);
      }
    },

    showMoreComments() {
      if (this.pagination.currentPage < this.pagination.totalPages) {
        this.pagination.currentPage++;
        this.fetchComments();
      }
    }
  }
});
