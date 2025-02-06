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
      this.error = null

      try {
        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            const mockCategories = [
              { Id: 1, Name: 'جميع المجالات', Code: 'ALL' },
              { Id: 2, Name: 'كتابة سيناريو', Code: 'SCEN' },
              { Id: 3, Name: 'كتابة شعر', Code: 'POET' },
              { Id: 4, Name: 'تصميم صور', Code: 'DSGN' },
              { Id: 5, Name: 'رسم', Code: 'DRAW' },
              { Id: 6, Name: 'تعليق صوتي', Code: 'VOIC' }
            ];
            resolve(mockCategories);
          }, 1000);
        });

        this.categories = response.map(cat => ({
          id: cat.Id,
          name: cat.Name,
          code: cat.Code,
          value: cat.Code.toLowerCase() // Derive value from code for consistency
        }));
      } catch (err) {
        this.error = err.message || 'Failed to fetch categories'
        console.error('Error fetching categories:', err)
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.categories = []
      this.error = null
      this.loading = false
    }
  },

  getters: {
    getCategories: (state) => state.categories,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
})
