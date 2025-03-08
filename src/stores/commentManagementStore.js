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
		async fetchComments(page = 1) {
			this.loading = true;
			this.error = null;
			try {
				const response = await this.$axios.get(API_URL + "/comments?page=" + page);
				if (response.data && response.data.success) {
					this.comments = response.data.data.map(comment => ({
						id: comment.id,
						userName: comment.name,
						userAvatar: comment.avatar || '', // fallback if missing
						content: comment.text,
						rating: comment.rating,
						course: comment.course || '',
						deletedAt: comment.deletedAt || null,

					}));
					this.pagination = response.data.pagination;  // use API pagination
				} else {
					this.error = response.data.message || 'Failed to load comments. Please try again later.';
				}
			} catch (error) {
				this.error = 'Failed to load comments. Please try again later.';
				console.error('Fetching comments failed:', error);
			} finally {
				this.loading = false;
			}
		},
		async hideComment(commentId) {
			try {
				  await this.$axios.post(`${API_URL}/hide/${commentId}`);

					const comment = this.comments.find(c => c.id === commentId);
					if (comment) {
						comment.deletedAt = new Date().toISOString();
          }

			} catch (error) {
				this.error = 'Failed to hide comment.';
				console.error('Hiding comment failed:', error);
			}
		}
	}
})
