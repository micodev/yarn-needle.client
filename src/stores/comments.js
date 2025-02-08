import { defineStore } from 'pinia';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [],
    newComment: { rating: 0, text: "" },
    loading: false,
    pagination: {
      currentPage: 1,
      limit: 10,
      hasMore: true
    }
  }),

  getters: {
    displayedComments: (state) => state.comments,
    showMoreButton: (state) => state.pagination.hasMore
  },

  actions: {
    async fetchComments(courseId) {
      this.loading = true;
      try {
        const response = await this.$axios.get(`api/course/comments/${courseId}`, {
          params: {
            page: this.pagination.currentPage,
            limit: this.pagination.limit
          }
        });
        this.comments = response.data || [];
        // Update hasMore based on response length
        this.pagination.hasMore = response.data.length >= this.pagination.limit;
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        this.loading = false;
      }
    },

    async addComment(courseId) {
      if (this.newComment.rating && this.newComment.text) {
        this.loading = true;
        try {
          const response = await this.$axios.post(`api/course/comment/${courseId}`, {
            text: this.newComment.text,
            rate: this.newComment.rating
          });

          if (response.data) {
            // Reset the form
            this.newComment.rating = 0;
            this.newComment.text = "";

            // Reset pagination to first page and fetch fresh comments
            this.pagination.currentPage = 1;
            await this.fetchComments(courseId);
          }
        } catch (error) {
          console.error('Error adding comment:', error);
        } finally {
          this.loading = false;
        }
      }
    },

    showMoreComments() {
      if (this.pagination.hasMore) {
        this.pagination.currentPage++;
        this.fetchComments();
      }
    }
  }
});
