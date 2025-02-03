import { defineStore } from 'pinia'

export const useCategoryOptionsStore = defineStore('categoryOptions', {
  state: () => ({
    categories: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(['Programming', 'Design', 'Business', 'Marketing'])
          }, 1000)
        })
        this.categories = response
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async addCategory(category) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.categories.push(category)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async updateCategory(index, newCategory) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.categories[index] = newCategory
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteCategory(index) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.categories.splice(index, 1)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getCategories: (state) => state.categories,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
})
