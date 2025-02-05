import { defineStore } from 'pinia'

export const useMembershipStore = defineStore('membership', {
  state: () => ({
    memberships: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getMemberships: (state) => state.memberships,
    getMembershipById: (state) => (id) => state.memberships.find(m => m.id === id)
  },

  actions: {
    async fetchMemberships() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await this.$axios.get('/api/meta/memberships')
        this.memberships = response.data.map(membership => ({
          id: membership.id,
          name: membership.name,
          code: membership.code,
          description: membership.description,
          price: membership.price
        }))
      } catch (error) {
        this.error = error.message || 'Failed to fetch memberships'
        console.error('Error fetching memberships:', error)
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.memberships = []
      this.error = null
      this.isLoading = false
    }
  }
})
