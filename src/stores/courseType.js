import { defineStore } from 'pinia'

export const useCourseTypeStore = defineStore('courseType', {
  state: () => ({
    courseTypes: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getCourseTypes: (state) => state.courseTypes,
    getCourseTypeById: (state) => (id) => state.courseTypes.find(ct => ct.id === id),
    getCourseTypeByCode: (state) => (code) => state.courseTypes.find(ct => ct.code === code)
  },

  actions: {
    async fetchCourseTypes() {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.get('/api/meta/course-types')
        this.courseTypes = response.data.map(courseType => ({
          id: courseType.id,
          code: courseType.code,
          name: courseType.name
        }))

      } catch (error) {
        this.error = error.message || 'Failed to fetch course types'
        console.error('Error fetching course types:', error)
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.courseTypes = []
      this.error = null
      this.isLoading = false
    }
  }
})
