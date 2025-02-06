import { defineStore } from 'pinia'

export const useLevelOptionsStore = defineStore('levelOptions', {
  state: () => ({
    levels: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchLevels() {
      this.loading = true
      this.error = null
      try {
        const response = await this.$axios.get('/api/meta/course-levels')
        this.levels = response.data.map(level => ({
          name: level.name,
          value: level.code
        }))
      } catch (err) {
        this.error = err.message || 'Failed to fetch levels'
        console.error('Error fetching levels:', err)
      } finally {
        this.loading = false
      }
    },

    async addLevel(level) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.levels.push(level)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async updateLevel(index, newLevel) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.levels[index] = newLevel
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteLevel(index) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.levels.splice(index, 1)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.levels = []
      this.error = null
      this.loading = false
    }
  },

  getters: {
    getLevels: (state) => state.levels,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
})
