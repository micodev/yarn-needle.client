import { defineStore } from 'pinia'

export const useLevelOptionsStore = defineStore('levelOptions', {
  state: () => ({
    levels: [
      { name: 'جميع المستويات', value: null },
      { name: 'مبتدئ', value: 'beginner' },
      { name: 'متوسط', value: 'intermediate' },
      { name: 'متقدم', value: 'advanced' }
    ],
    loading: false,
    error: null
  }),

  actions: {
    async fetchLevels() {
      this.loading = true
      try {
        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { name: 'جميع المستويات', value: null },
              { name: 'مبتدئ', value: 'beginner' },
              { name: 'متوسط', value: 'intermediate' },
              { name: 'متقدم', value: 'advanced' }
            ])
          }, 1000)
        })
        this.levels = response
      } catch (err) {
        this.error = err.message
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
    }
  },

  getters: {
    getLevels: (state) => state.levels,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
})
