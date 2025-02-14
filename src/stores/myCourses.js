import { defineStore } from 'pinia'

export const useMyCourseStore = defineStore('myCourses', {
  state: () => ({
    courses: [],
    loading: false,
    error: null
  }),

  getters: {
    hasCourses: (state) => state.courses.length > 0
  },

  actions: {
    async fetchMyCourses() {
      this.loading = true
      this.error = null
      try {
        const response = await this.$axios.get('/api/course/my-courses')
        this.courses = response.data
      } catch (err) {
        this.error = err.message || 'Failed to fetch courses'
        console.error('Error fetching courses:', err)
      } finally {
        this.loading = false
      }
    }
  }
})
