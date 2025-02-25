import { defineStore } from 'pinia'

export const useSocialMediaStore = defineStore('socialMedia', {
  state: () => ({
    socialMedia: [],
    userSocialMedia: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getSocialMedia: (state) => state.socialMedia,
    getSocialMediaById: (state) => (id) => state.socialMedia.find(sm => sm.id === id),
    getUserSocialMedia: (state) => state.userSocialMedia
  },

  actions: {
    async fetchSocialMedia() {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.get('/api/meta/socialmedia')
        this.socialMedia = response.data.map(social => ({
          id: social.id,
          name: social.name,
          code: social.code,
          icon: social.icon || 'la-globe-africa-solid',
          // isActive: social.isActive
        }))
      } catch (error) {
        this.error = error.message || 'Failed to fetch social media links'
        console.error('Error fetching social media:', error)
      } finally {
        this.isLoading = false
      }
    },

    async updateUserSocialMedia(socialMediaList) {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.post('/api/profile/socialmedia', { socialMedia: socialMediaList })
        this.userSocialMedia = response.data
        return response.data
      } catch (error) {
        this.error = error.message || 'Failed to update social media'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchUserSocialMedia() {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.get('/api/profile/social-media')
        this.userSocialMedia = response.data
        return response.data
      } catch (error) {
        this.error = error.message || 'Failed to fetch user social media'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.socialMedia = []
      this.error = null
      this.isLoading = false
    }
  }
})
