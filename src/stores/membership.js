import { defineStore } from 'pinia'
import { useOrderStore } from './orderStore'

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
          title: membership.name,
          code: membership.code,
          description: membership.description.split(','), // Assuming description comes as comma-separated string
          price: membership.price,
          features: membership.features, // Assuming features come as JSON
          iconClass: membership.iconClass || 'pi pi-star', // Default icon if none provided
          isCurrentPlan: membership.isCurrentPlan || false // Default to false if not provided
        }))
      } catch (error) {
        this.error = error.message || 'Failed to fetch memberships'
        console.error('Error fetching memberships:', error)
      } finally {
        this.isLoading = false
      }
    },

    async subscribeToPlan(code, note = '') {
      const ordersStore = useOrderStore()
      return await ordersStore.subscribeMembership(code, note)
    },

    reset() {
      this.memberships = []
      this.error = null
      this.isLoading = false
    }
  }
})
