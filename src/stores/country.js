import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    isLoading: false,
    error: null
  }),

  getters: {
    getCountries: (state) => state.countries,
    getCountryById: (state) => (id) => state.countries.find(c => c.id === id),
    getCountryByCode: (state) => (code) => state.countries.find(c => c.code === code)
  },

  actions: {
    async fetchCountries() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await this.$axios.get('/api/countries')
        this.countries = response.data.map(country => ({
          id: country.id,
          code: country.code,
          name: country.name,
          dialCode: country.dialCode
        }))
      } catch (error) {
        this.error = error.message || 'Failed to fetch countries'
        console.error('Error fetching countries:', error)
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.countries = []
      this.error = null
      this.isLoading = false
    }
  }
})