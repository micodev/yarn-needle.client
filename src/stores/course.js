import { defineStore } from 'pinia'

export const useCourseStore = defineStore('course', {
  state: () => ({
    course: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchCourse(id) {
      this.loading = true
      this.error = null
      try {
        const response = await this.$axios.get(`/api/course/${id}`)
        this.course = response.data
      } catch (err) {
        this.error = err.message || 'Failed to fetch course'
        console.error('Error fetching course:', err)
      } finally {
        this.loading = false
      }
    },

    clearCourse() {
      this.course = null
      this.error = null
    }
  }
})
