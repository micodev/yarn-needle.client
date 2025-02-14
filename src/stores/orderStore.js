import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    isLoading: false,
    error: null,
    redirectUrl: null
  }),

  actions: {
    async createOrder(courseId, note = null) {
      this.isLoading = true
      this.error = null
      this.redirectUrl = null

      try {
        const response = await this.$axios.post('/api/order/create', {
          courseId: courseId,
          note: note
        })
        if (response.status === 201 || response.status === 200) {
          this.redirectUrl = response.data.redirectUrl
          return response.data
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create order'
        throw error
      } finally {
        this.isLoading = false
      }
    }
  },
  
  persist: true // Add this line to enable persistence
})
