import { defineStore } from 'pinia'

const API_URL = '/api/comment';
export const useCommentManagementStore = defineStore('commentManagement', {
	state: () => ({
		comments: [],
		loading: false,   // added loading state
		error: null       // added error state
	}),
	actions: {
		async fetchComments() {
			this.loading = true;
			this.error = null;
			try {
				// using axios like in userStore.js
				const response = await this.$axios.get(API_URL+"/comments");
				this.comments = response.data;
			} catch (error) {
				this.error = 'Failed to load comments. Please try again later.';
				console.error('Fetching comments failed:', error);
			} finally {
				this.loading = false;
			}
		}
	}
})
