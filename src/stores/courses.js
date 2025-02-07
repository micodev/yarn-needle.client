import { defineStore } from 'pinia';

export const useCoursesStore = defineStore('courses', {
	state: () => ({
		courses: [],
		isLoading: false,
		error: null,
		currentPage: 1,
		hasMore: true,
		limit: 2,
		currentFilters: null
	}),
	getters: {
		getCourses: (state) => state.courses,
		getCourseById: (state) => (id) => state.courses.find(c => c.id === id)
	},
	actions: {
		resetPagination() {
			this.currentPage = 1;
			this.hasMore = true;
			this.courses = [];
		},
		async fetchCourses(page = 1) {
			if (this.isLoading || !this.hasMore) return;

			this.isLoading = true;
			this.error = null;
			try {
				const response = await this.$axios.get('/api/course', {
					params: {
						page: page,
						limit: this.limit
					}
				});

				if (page === 1) {
					this.courses = response.data;
				} else {
					this.courses = [...this.courses, ...response.data];
				}

				this.hasMore = response.data.length === this.limit;
				this.currentPage = page;
			} catch (error) {
				this.error = error.message || 'Failed to fetch courses';
				console.error('Error fetching courses:', error);
			} finally {
				this.isLoading = false;
			}
		},
		async fetchFilteredCourses({ search, sort, level, category, courseType, lessonRange, priceRange, durationMin, durationMax, page = 1 }) {
			if (page === 1) {
				this.resetPagination();
			}

			if (this.isLoading || (page > 1 && !this.hasMore)) return;

			this.isLoading = true;
			this.error = null;
			try {
				const params = {
					page,
					limit: this.limit,
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

				// Store current filters for subsequent paginated requests
				if (page === 1) {
					this.currentFilters = { search, sort, level, category, courseType, lessonRange, priceRange, durationMin, durationMax };
				}

				const response = await this.$axios.get('/api/course', { params });

				if (page === 1) {
					this.courses = response.data;
				} else {
					this.courses = [...this.courses, ...response.data];
				}

				this.hasMore = response.data.length === this.limit;
				this.currentPage = page;
			} catch (error) {
				this.error = error.message || 'Failed to fetch filtered courses';
				console.error('Error fetching filtered courses:', error);
			} finally {
				this.isLoading = false;
			}
		},
		async loadMore() {
			if (!this.currentFilters) {
				return this.fetchCourses(this.currentPage + 1);
			}
			return this.fetchFilteredCourses({
				...this.currentFilters,
				page: this.currentPage + 1
			});
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
