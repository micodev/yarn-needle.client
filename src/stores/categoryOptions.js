import { defineStore } from 'pinia'

const categoryTemplates = [
  { name: 'جميع المجالات', value: null, code: 'ALL' },
  { name: 'كتابة سيناريو', value: 'scenario', code: 'SCEN' },
  { name: 'كتابة شعر', value: 'poetry', code: 'POET' },
  { name: 'تصميم صور', value: 'design', code: 'DSGN' },
  { name: 'رسم', value: 'drawing', code: 'DRAW' },
  { name: 'تعليق صوتي', value: 'voice', code: 'VOIC' }
]

function generateCategories(count = 6) {
  const categories = []
  for (let i = 0; i < count; i++) {
    const template = categoryTemplates[i % categoryTemplates.length]
    categories.push({
      id: i + 1,
      name: template.name,
      value: template.value,
      code: template.code
    })
  }
  return categories
}

export const useCategoryOptionsStore = defineStore('categoryOptions', {
  state: () => ({
    categories: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCategories(count = 6) {
      this.loading = true
      try {
        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(generateCategories(count))
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
        const newId = Math.max(...this.categories.map(c => c.id)) + 1
        this.categories.push({ ...category, id: newId })
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async updateCategory(id, newCategory) {
      this.loading = true
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const index = this.categories.findIndex(c => c.id === id)
        if (index !== -1) {
          this.categories[index] = { ...newCategory, id }
        }
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
