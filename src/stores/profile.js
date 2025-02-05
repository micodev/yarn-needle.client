import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: {

    },
    isLoading: false,
    error: null
  }),

  getters: {
    getProfile: (state) => state.profile,
    isProfileLoading: (state) => state.isLoading
  },

  actions: {
    async fetchProfile() {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.get('/api/auth/profile')
        this.profile = response.data
        return this.profile
      } catch (error) {
        this.error = error.message || 'Failed to fetch profile'
        console.error('Error fetching profile:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async submitProfile(profileData) {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.post('/api/auth/profile', profileData)
        this.profile = response.data
        return this.profile
      } catch (error) {
        this.error = error.message || 'Failed to submit profile'
        console.error('Error submitting profile:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.profile = null
      this.error = null
      this.isLoading = false
    }
  }
})
