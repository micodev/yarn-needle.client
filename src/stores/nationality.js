import { defineStore } from 'pinia'

export const useNationalityStore = defineStore('nationality', {
  state: () => ({
    nationalities: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getNationalities: (state) => state.nationalities,
    getNationalityById: (state) => (id) => state.nationalities.find(n => n.id === id),
    getNationalityByCode: (state) => (code) => state.nationalities.find(n => n.code === code)
  },

  actions: {
    async fetchNationalities() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await this.$axios.get('/api/meta/nationalities')
        this.nationalities = response.data.map(nationality => ({
          id: nationality.id,
          code: nationality.code,
          name: nationality.name
        }))
      } catch (error) {
        this.error = error.message || 'Failed to fetch nationalities'
        console.error('Error fetching nationalities:', error)
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.nationalities = []
      this.error = null
      this.isLoading = false
    }
  }
})
