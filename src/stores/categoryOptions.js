import { defineStore } from 'pinia'

export const useCategoryOptionsStore = defineStore('categoryOptions', {
  state: () => ({
    categories: [],
    selectedCategoryId: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getCategories: (state) => state.categories,
    getCategoryById: (state) => (id) => state.categories.find(c => c.id === id),
    getCategoryByCode: (state) => (code) => state.categories.find(c => c.code === code),
  },

  actions: {
    async fetchCategories() {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.get('/api/meta/subhobbies')
        this.categories = response.data.map(category => ({
          id: category.Id,
          code: category.Code,
          name: category.Name
        }))
      } catch (error) {
        this.error = error.message || 'Failed to fetch categories'
        console.error('Error fetching categories:', error)
      } finally {
        this.isLoading = false
      }
    },

    

    reset() {
      this.categories = []
      this.subhobbies = []
      this.selectedCategoryId = null
      this.error = null
      this.isLoading = false
    }
  }
})


