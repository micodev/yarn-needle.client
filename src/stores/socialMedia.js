import { defineStore } from 'pinia'

export const useSocialMediaStore = defineStore('socialMedia', {
  state: () => ({
    socialMedia: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getSocialMedia: (state) => state.socialMedia,
    getSocialMediaById: (state) => (id) => state.socialMedia.find(sm => sm.id === id)
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
          icon: social.icon || 'pi pi-globe',
          isActive: social.isActive
        }))
      } catch (error) {
        this.error = error.message || 'Failed to fetch social media links'
        console.error('Error fetching social media:', error)
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
