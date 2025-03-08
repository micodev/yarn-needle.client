import { defineStore } from 'pinia'

const API_URL = '/api/comment';
export const useCommentManagementStore = defineStore('commentManagement', {
	state: () => ({
		comments: [],
		loading: false,   // added loading state
		error: null,      // added error state
		pagination: {}    // added pagination state
	}),
	actions: {
		async fetchComments() {
			this.loading = true;
			this.error = null;
			try {
				const response = await this.$axios.get(API_URL+"/comments");
				// Check if response is successful and set comments and pagination accordingly
				if (response.data && response.data.success) {
					this.comments = response.data.data;
					this.pagination = response.data.pagination;  // update pagination
				} else {
					this.error = response.data.message || 'Failed to load comments. Please try again later.';
				}
			} catch (error) {
				this.error = 'Failed to load comments. Please try again later.';
				console.error('Fetching comments failed:', error);
			} finally {
				this.loading = false;
			}
		}
	}
})
