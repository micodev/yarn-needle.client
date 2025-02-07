import { defineStore } from 'pinia';

export const useCoursesStore = defineStore('courses', {
	state: () => ({
		courses: [],
		isLoading: false,
		error: null,
		pagination: {
			currentPage: 1,
			totalPages: 1,
			pageSize: 12,
			totalItems: 0
		}
	}),
	getters: {
		getCourses: (state) => state.courses,
		getCourseById: (state) => (id) => state.courses.find(c => c.id === id)
	},
	actions: {
		async fetchCourses() {
			// Guard: prevent duplicate fetch calls if already loading
			if (this.isLoading) return;
			this.isLoading = true;
			this.error = null;
			try {
				const response = await this.$axios.get('/api/course', {
					params: {
						page: this.pagination.currentPage,
						pageSize: this.pagination.pageSize
					}
				});
				this.courses = response.data.items;
				this.pagination = {
					currentPage: response.data.currentPage,
					totalPages: response.data.totalPages,
					pageSize: response.data.pageSize,
					totalItems: response.data.totalItems
				};
			} catch (error) {
				this.error = error.message || 'Failed to fetch courses';
				console.error('Error fetching courses:', error);
			} finally {
				this.isLoading = false;
			}
		},
		async fetchFilteredCourses({ search, sort, level, category, courseType, lessonRange, priceRange, durationMin, durationMax, page }) {
			this.isLoading = true;
			this.error = null;
			try {
				const params = {
					search,
					sort,
					level,
					category,
					courseType,
					lessonRange,
					priceRange,
					durationMin,
					durationMax,
					page: page || this.pagination.currentPage,
					pageSize: this.pagination.pageSize
				};
				const response = await this.$axios.get('/api/course', { params });
				this.courses = response.data.items;
				this.pagination = {
					currentPage: response.data.currentPage,
					totalPages: response.data.totalPages,
					pageSize: response.data.pageSize,
					totalItems: response.data.totalItems
				};
			} catch (error) {
				this.error = error.message || 'Failed to fetch filtered courses';
				console.error('Error fetching filtered courses:', error);
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
