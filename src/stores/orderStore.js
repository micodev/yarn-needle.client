import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    isLoading: false,
    error: null
  }),

  actions: {
    async createOrder(courseId, note = null) {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.post('/api/order/create', {
          courseId: courseId,
          note: note
        })
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create order'
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
