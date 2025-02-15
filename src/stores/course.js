import { defineStore } from 'pinia';

export const useCourseStore = defineStore('course', {
  state: () => ({
    course: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchCourse(courseId) {
      this.loading = true;
      try {
        const response = await this.$axios.get(`/api/course/${courseId}`);
        this.course = response.data;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching course:', error);
      } finally {
        this.loading = false;
      }
    },

    clearCourse() {
      this.course = null;
      this.error = null;
    }
  }
});
