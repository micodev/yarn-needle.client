import { defineStore } from 'pinia';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [],
    newComment: { rating: 0, text: "" },
    loading: false,
    pagination: {
      currentPage: 1,
      limit: 2,
      hasMore: true
    }
  }),

  getters: {
    displayedComments: (state) => state.comments,
    showMoreButton: (state) => state.pagination.hasMore
  },

  actions: {
    async fetchComments(courseId, append = false) {
      this.loading = true;
      try {
        const response = await this.$axios.get(`api/course/comments/${courseId}`, {
          params: {
            page: this.pagination.currentPage,
            limit: this.pagination.limit
          }
        });

        if (append) {
          this.comments = [...this.comments, ...(response.data || [])];
        } else {
          this.comments = response.data || [];
        }
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
          const response = await this.$axios.post(`api/course/comments/${courseId}`, {
            text: this.newComment.text,
            rating: this.newComment.rating
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

    async showMoreComments(courseId) {
      if (this.pagination.hasMore && !this.loading) {
        this.pagination.currentPage++;
        await this.fetchComments(courseId, true);
      }
    }
  }
});
