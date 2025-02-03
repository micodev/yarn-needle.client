import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false
  }),

  actions: {
    async register(credentials) {
      const toast = useToast()
      try {
        const response = await this.$axios.post('/api/Auth/register', credentials)
        toast.add({ severity: 'success', summary: 'نجاح', detail: response.data.message })
        return { success: true, message: response.data.message }
      } catch (error) {
        toast.add({ severity: 'error', summary: 'خطأ', detail: error.response.data })
        return { success: false, errors: error.response.data }
      }
    },

    async login(credentials) {
      const toast = useToast()
      try {
        const response = await this.$axios.post('/api/Auth/login', credentials)
        this.token = response.data.token
        this.refreshToken = response.data.refreshToken
        this.isAuthenticated = true
        await this.getMe() // Fetch user data after successful login
        toast.add({ severity: 'success', summary: 'نجاح', detail: 'تم تسجيل الدخول بنجاح' })
        return { success: true }
      } catch (error) {
        console.log(error.response)
        const errorData = error.response?.data
        let errors = {}

        if (errorData?.errors) {
          // Convert validation errors to flat array of messages
          errors = Object.entries(errorData.errors).reduce((acc, [field, messages]) => {
            acc[field] = Array.isArray(messages) ? messages[0] : messages
            return acc
          }, {})
        }
        //make error is readable string
        errors = Object.values(errors).join(',')
        toast.add({ severity: 'error', summary: 'خطأ', detail: errors || 'فشل تسجيل الدخول' })
        return {
          success: false,
          errors,
          message: errorData?.title || 'Login failed'
        }
      }
    },

    async getMe() {
      try {
        const response = await this.$axios.post('/api/Auth/me', {}, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = response.data.data
        return response.data
      } catch (error) {
        return { success: false, errors: error.response.data }
      }
    },

    async refreshToken() {
      try {
        const response = await this.$axios.post('/api/Auth/refresh-token', {
          token: this.token,
          refreshToken: this.refreshToken
        })
        this.token = response.data.Token
        this.refreshToken = response.data.RefreshToken
        return { success: true }
      } catch (error) {
        this.logout()
        return { success: false, errors: error.response.data }
      }
    },

    async forgotPassword(email) {
      const toast = useToast()
      try {
        const response = await this.$axios.post('/api/Auth/forgot-password', email)
        toast.add({ severity: 'success', summary: 'نجاح', detail: response.data.message })
        return { success: true, message: response.data.message }
      } catch (error) {
        toast.add({ severity: 'error', summary: 'خطأ', detail: error.response.data })
        return { success: false, errors: error.response.data }
      }
    },

    async resetPassword(token, newPassword) {
      const toast = useToast()
      try {
        const response = await this.$axios.post('/api/Auth/reset-password', {
          token,
          newPassword
        })
        toast.add({ severity: 'success', summary: 'نجاح', detail: response.data.message })
        return { success: true, message: response.data.message }
      } catch (error) {
        toast.add({ severity: 'error', summary: 'خطأ', detail: error.response.data })
        return { success: false, errors: error.response.data }
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.isAuthenticated = false
    }
  },

  persist: {
    paths: ['token', 'refreshToken', 'isAuthenticated']
  }
})
