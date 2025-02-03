import { defineStore } from 'pinia'

export const useCourseTypeOptionsStore = defineStore('courseTypeOptions', {
  state: () => ({
    courseTypes: [
      { name: 'جميع الأنواع', value: null, icon: '' },
      { name: 'حضوري', value: 'onsite', icon: '📍' },
      { name: 'عن بعد - مسجل', value: 'recorded', icon: '🌐' },
      { name: 'عن بعد - مباشر', value: 'live', icon: '🔴' }
    ],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCourseTypes() {
      this.loading = true
      try {
        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { name: 'جميع الأنواع', value: null, icon: '' },
              { name: 'حضوري', value: 'onsite', icon: '📍' },
              { name: 'عن بعد - مسجل', value: 'recorded', icon: '🌐' },
              { name: 'عن بعد - مباشر', value: 'live', icon: '🔴' }
            ])
          }, 1000)
        })
        this.courseTypes = response
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async addCourseType(courseType) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.courseTypes.push(courseType)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async updateCourseType(index, newCourseType) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.courseTypes[index] = newCourseType
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteCourseType(index) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.courseTypes.splice(index, 1)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getCourseTypes: (state) => state.courseTypes,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
})
