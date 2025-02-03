import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false
  }),

  actions: {
    async register(credentials) {
      try {
        const response = await axios.post('/api/Auth/register', credentials)
        return { success: true, message: response.data.message }
      } catch (error) {
        return { success: false, errors: error.response.data }
      }
    },

    async login(credentials) {
      try {
        const response = await axios.post('/api/Auth/login', credentials)
        this.token = response.data.token
        this.refreshToken = response.data.refreshToken
        this.isAuthenticated = true
        await this.getMe() // Fetch user data after successful login
        return { success: true }
      } catch (error) {
        return { success: false, errors: error.response.data }
      }
    },

    async getMe() {
      try {
        const response = await axios.post('/api/Auth/me', {}, {
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
        const response = await axios.post('/api/Auth/refresh-token', {
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
      try {
        const response = await axios.post('/api/Auth/forgot-password', email)
        return { success: true, message: response.data.message }
      } catch (error) {
        return { success: false, errors: error.response.data }
      }
    },

    async resetPassword(token, newPassword) {
      try {
        const response = await axios.post('/api/Auth/reset-password', {
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
    }
  },

  persist: {
    paths: ['token', 'refreshToken', 'isAuthenticated']
  }
})
