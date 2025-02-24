import { defineStore } from 'pinia'
import { useOrdersStore } from './orders'

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
          description: membership.description.split(','), // Assuming description comes as comma-separated string
          price: membership.price,
          features: JSON.parse(membership.features), // Assuming features come as JSON
          iconClass: membership.iconClass || 'pi pi-star' // Default icon if none provided
        }))
      } catch (error) {
        this.error = error.message || 'Failed to fetch memberships'
        console.error('Error fetching memberships:', error)
      } finally {
        this.isLoading = false
      }
    },

    async subscribeToPlan(membershipId, note = '') {
      const ordersStore = useOrdersStore()
      return await ordersStore.subscribeMembership(membershipId, note)
    },

    reset() {
      this.memberships = []
      this.error = null
      this.isLoading = false
    }
  }
})
