import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
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

    async updateProfile(profileData) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await this.$axios.put('/auth/profile', profileData)
        this.profile = response.data
        return this.profile
      } catch (error) {
        this.error = error.message || 'Failed to update profile'
        console.error('Error updating profile:', error)
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
