import { defineStore } from 'pinia';

export const useCoursesStore = defineStore('courses', {
	state: () => ({
		courses: [],
		isLoading: false,
		error: null // added error property
	}),
	getters: {
		getCourses: (state) => state.courses,
		getCourseById: (state) => (id) => state.courses.find(c => c.id === id)
	},
	actions: {
		async fetchCourses() {
			this.isLoading = true;
			this.error = null;
			try {
				const response = await this.$axios.get('/api/course');
				this.courses = response.data;
			} catch (error) {
				this.error = error.message || 'Failed to fetch courses';
				console.error('Error fetching courses:', error);
			} finally {
				this.isLoading = false;
			}
		},
		reset() {
			this.courses = [];
			this.error = null;
			this.isLoading = false;
		}
	}
});
