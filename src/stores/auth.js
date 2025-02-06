import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false
  }),

  getters: {
    userInitials: (state) => {
      console.log('User:', state.user);
      if (state.user?.userName) {
        return state.user.userName.substring(0, 2).toUpperCase();
      }
      return '';
    }
  },

  actions: {
    async init() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.isAuthenticated = true
        await this.getMe()
      }
    },
    async register(credentials) {
      try {
        const response = await this.$axios.post('/api/Auth/register', credentials)
        return { success: true, message: response.data.message }
      } catch (error) {
        return { success: false, errors: error.response.data }
      }
    },

    async login(credentials) {
      try {
        const response = await this.$axios.post('/api/Auth/login', credentials)
        this.token = response.data.token
        localStorage.setItem('token', response.data.token)
        this.refreshToken = response.data.refreshToken
        this.isAuthenticated = true
        await this.getMe() // Fetch user data after successful login
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
        this.user = response.data.data[0]
        return response.data
      } catch (error) {
        if (error.response?.status === 401) {
          this.logout()
        }
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
        localStorage.setItem('token', response.data.Token)
        this.refreshToken = response.data.RefreshToken
        return { success: true }
      } catch (error) {
        this.logout()
        return { success: false, errors: error.response.data }
      }
    },

    async forgotPassword(email) {
      try {
        const response = await this.$axios.post('/api/Auth/forgot-password', email)
        return { success: true, message: response.data.message }
      } catch (error) {
        return { success: false, errors: error.response.data }
      }
    },

    async resetPassword(token, newPassword) {
      try {
        const response = await this.$axios.post('/api/Auth/reset-password', {
          token,
          newPassword
        })
        return { success: true, message: response.data.message }
      } catch (error) {
        return { success: false, errors: error.response.data }
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      // Optional: Redirect to login page if you have router instance
      // this.router.push('/login')
    },

    checkAuthStatus() {
      return this.isAuthenticated;
    }
  },

  persist: {
    paths: ['token', 'refreshToken', 'isAuthenticated']
  }
})
