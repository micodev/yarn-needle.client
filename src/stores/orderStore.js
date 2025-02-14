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

        const { success, message, data, errors } = response.data

        if (!success) {
          throw new Error(errors?.[0] || message || 'فشل في إنشاء الطلب')
        }

        if (data?.paymentUrl) {
          this.redirectUrl = data.paymentUrl
          return data
        }

        throw new Error('تنسيق الاستجابة غير صالح')
      } catch (error) {
        this.error = error.message || 'فشل في إنشاء الطلب'
        throw error
      } finally {
        this.isLoading = false
      }
    }
  },

  persist: true
})
