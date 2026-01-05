import { createMetaStore } from '../utils/metaStoreFactory'

export const useSocialMediaStore = createMetaStore('socialMedia', {
  apiEndpoint: '/api/meta/socialmedia',
  itemName: 'socialMedia',
  itemNamePlural: 'socialMedia',
  mapResponse: (social) => ({
    id: social.id,
    name: social.name,
    code: social.code,
    icon: social.icon || 'la-globe-africa-solid'
  }),
  additionalState: {
    userSocialMedia: []
  },
  additionalGetters: {
    getUserSocialMedia: (state) => state.userSocialMedia
  },
  additionalActions: {
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
    }
  }
})
