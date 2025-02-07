import { defineStore } from 'pinia';

export const useCoursesStore = defineStore('courses', {
	state: () => ({
		courses: [],
		isLoading: false,
		error: null,
		currentPage: 1,
		hasMore: true
	}),
	getters: {
		getCourses: (state) => state.courses,
		getCourseById: (state) => (id) => state.courses.find(c => c.id === id)
	},
	actions: {
		async fetchCourses(page = 1) {
			if (this.isLoading || !this.hasMore) return;

			this.isLoading = true;
			this.error = null;
			try {
				const response = await this.$axios.get('/api/course', {
					params: {
						page: page,
						limit: 12 // adjust limit as needed
					}
				});

				if (page === 1) {
					this.courses = response.data.courses;
				} else {
					this.courses = [...this.courses, ...response.data.courses];
				}

				this.hasMore = response.data.courses.length === 12; // if less than limit, no more pages
				this.currentPage = page;
			} catch (error) {
				this.error = error.message || 'Failed to fetch courses';
				console.error('Error fetching courses:', error);
			} finally {
				this.isLoading = false;
			}
		},
		async fetchFilteredCourses({ search, sort, level, category, courseType, lessonRange, priceRange, durationMin, durationMax }) {
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
					durationMax
				};
				const response = await this.$axios.get('/api/course', { params });
				this.courses = response.data;
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
			this.currentPage = 1;
			this.hasMore = true;
		}
	}
});
