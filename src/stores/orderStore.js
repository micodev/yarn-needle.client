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

        const { success, message, data, single , errors } = response.data
       console.log( success, message, data,single, errors)
        if (!success) {
          throw new Error(errors[0] || message || 'فشل في إنشاء الطلب')
        }

        if (single?.paymentUrl) {
          this.redirectUrl = single.paymentUrl
          return single
        }

        throw new Error('تنسيق الاستجابة غير صالح')
      } catch (error) {
        // if error.response then show response.data.errors (join as string with  \n)
        if (error.response) {
          this.error = error.response.data.errors.join('\n') || 'فشل في إنشاء الطلب'
        } else
        {
          this.error = error.message || 'فشل في إنشاء الطلب'
        }
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async subscribeMembership(membershipCode, note = null) {
      this.isLoading = true
      this.error = null
      this.redirectUrl = null

      try {
        const response = await this.$axios.post('/api/order/create-membership', {
          membershipCode: membershipCode,
          note: note
        })

        const { success, message, data, single, errors } = response.data
        console.log(success, message, data, single, errors)
        if (!success) {
          throw new Error(errors[0] || message || 'فشل في الاشتراك بالعضوية')
        }

        if (single?.paymentUrl) {
          this.redirectUrl = single.paymentUrl
          return single
        }

        throw new Error('تنسيق الاستجابة غير صالح')
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.errors.join('\n') || 'فشل في الاشتراك بالعضوية'
        } else {
          this.error = error.message || 'فشل في الاشتراك بالعضوية'
        }
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async linkFreeMembership(membershipCode, note = null) {
      this.isLoading = true
      this.error = null
      this.redirectUrl = null

      try {
        const response = await this.$axios.post('/api/auth/link-free-membership', {
          membershipCode: membershipCode,
        })

        const { success, message, data, single, errors } = response.data
        console.log(success, message, data, single, errors)
        if (!success) {
          throw new Error(errors[0] || message || 'فشل في الاشتراك بالعضوية')
        }

        if (single?.paymentUrl) {
          this.redirectUrl = single.paymentUrl
          return single
        }

        throw new Error('تنسيق الاستجابة غير صالح')
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.errors.join('\n') || 'فشل في الاشتراك بالعضوية'
        } else {
          this.error = error.message || 'فشل في الاشتراك بالعضوية'
        }
        throw error
      } finally {
        this.isLoading = false
  },

  persist: true
})
