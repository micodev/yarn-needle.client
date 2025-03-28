import { defineStore } from 'pinia';

export const useCourseStore = defineStore('courseStore', {
  state: () => ({
    // Course data
    course: null,        // Single course details
    courses: [],         // Course listing
    recentCourses: [],   // For homepage/recommendations

    // UI states
    loading: false,
    error: null,

    // Pagination & filtering
    pagination: {
      currentPage: 1,
      hasMore: true,
      limit: 10,
      total: 0
    },
    currentFilters: null,

    // Admin access flag
    isAdminMode: false
  }),

  getters: {
    getCourses: (state) => state.courses,
    getCourseById: (state) => (id) => state.courses.find(c => c.id === id),
    getRecentCourses: (state) => state.recentCourses
  },

  actions: {

    async enrollCourse(courseId) {
      this.loading = true;
      try {
        const response = await this.$axios.post(`/api/course/enroll/${courseId}`);
        // Update the course data with the new enrollment status
        if (this.course && this.course.id === courseId) {
          this.course = response.data;
        }
        return response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error enrolling in course:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Course listing actions (user-facing)
    resetPagination() {
      this.pagination.currentPage = 1;
      this.pagination.hasMore = true;
      this.courses = [];
    },

    async fetchCourses(page = 1) {
      if (this.loading || !this.pagination.hasMore) return;

      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.get('/api/course', {
          params: {
            page,
            limit: this.pagination.limit
          }
        });

        if (page === 1) {
          this.courses = response.data;
        } else {
          this.courses = [...this.courses, ...response.data];
        }

        this.pagination.hasMore = response.data.length === this.pagination.limit;
        this.pagination.currentPage = page;
      } catch (error) {
        this.error = error.message || 'Failed to fetch courses';
        console.error('Error fetching courses:', error);
      } finally {
        this.loading = false;
      }
    },


    async fetchFilteredCourses({ search, sort, level, category, courseType, lessonRange, priceRange, durationMin, durationMax, page = 1 }) {
      if (page === 1) {
        this.resetPagination();
      }

      if (this.loading || (page > 1 && !this.pagination.hasMore)) return;

      this.loading = true;
      this.error = null;
      try {
        const params = {
          page,
          limit: this.pagination.limit,
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

        this.pagination.hasMore = response.data.length === this.pagination.limit;
        this.pagination.currentPage = page;
      } catch (error) {
        this.error = error.message || 'Failed to fetch filtered courses';
        console.error('Error fetching filtered courses:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchRecentCourses() {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.get('/api/course', {
          params: {
            limit: 4
          }
        });
        this.recentCourses = response.data;
      } catch (error) {
        this.error = error.message || 'Failed to fetch recent courses';
        console.error('Error fetching recent courses:', error);
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      if (!this.currentFilters) {
        return this.fetchCourses(this.pagination.currentPage + 1);
      }
      return this.fetchFilteredCourses({
        ...this.currentFilters,
        page: this.pagination.currentPage + 1
      });
    },

    // Course admin actions
    async fetchCourseById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.get(`/api/course/${id}`);
        this.course = response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching course:', error);
      } finally {
        this.loading = false;
      }
    },

    async createCourse(courseData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.post('/api/CourseAdminstrator', courseData);
        if (response.data && response.data.success) {
          this.course = response.data.data[0];
          return true;
        } else {
          this.error = response.data.message || 'Error creating course';
          return false;
        }
      } catch (err) {
        this.error = err.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async updateCourse(id, courseData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.put(`/api/CourseAdminstrator/${id}`, courseData);
        if (response.data && response.data.success) {
          this.course = response.data.data[0];
          return true;
        } else {
          this.error = response.data.message || 'Error updating course';
          return false;
        }
      } catch (err) {
        this.error = err.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deleteCourse(id) {
      this.loading = true;
      this.error = null;
      try {
        await this.$axios.delete(`/api/CourseAdminstrator/${id}`);
        return true;
      } catch (err) {
        this.error = err.message;
        return false;
      } finally {
        this.loading = false;
      }
    },

    async fetchAllAdminCourses(queryParams) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.get('/api/CourseAdminstrator', { params: queryParams });
        if (response.data && response.data.success) {
          this.courses = response.data.data;
          this.pagination = response.data.pagination;
        } else {
          this.error = response.data.message || 'Error fetching courses';
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // Toggle between admin and user mode
    setAdminMode(isAdmin) {
      this.isAdminMode = isAdmin;
    },

    // Reset store state
    reset() {
      this.courses = [];
      this.course = null;
      this.error = null;
      this.loading = false;
      this.pagination.currentPage = 1;
      this.pagination.hasMore = true;
      this.currentFilters = null;
    }
  }
});
