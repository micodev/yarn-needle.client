import { defineStore } from 'pinia'

/**
 * Capitalizes the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Factory function to create metadata stores with common functionality
 * @param {string} storeName - Name of the store (e.g., 'country', 'nationality')
 * @param {Object} config - Configuration object
 * @param {string} config.apiEndpoint - API endpoint to fetch data from
 * @param {string} config.itemName - Name of the item (e.g., 'country', 'nationality')
 * @param {string} config.itemNamePlural - Plural name of the item (e.g., 'countries', 'nationalities')
 * @param {Function} [config.mapResponse] - Optional function to map API response
 * @param {Object} [config.additionalState] - Optional additional state properties
 * @param {Object} [config.additionalGetters] - Optional additional getters
 * @param {Object} [config.additionalActions] - Optional additional actions
 * @returns {Function} - Pinia store
 */
export function createMetaStore(storeName, config) {
  const {
    apiEndpoint,
    itemName,
    itemNamePlural,
    mapResponse = (item) => item,
    additionalState = {},
    additionalGetters = {},
    additionalActions = {}
  } = config

  return defineStore(storeName, {
    state: () => ({
      [itemNamePlural]: [],
      isLoading: false,
      error: null,
      ...additionalState
    }),

    getters: {
      [`get${capitalize(itemNamePlural)}`]: (state) => 
        state[itemNamePlural],
      
      [`get${capitalize(itemName)}ById`]: (state) => (id) =>
        state[itemNamePlural].find(item => item.id === id),
      
      [`get${capitalize(itemName)}ByCode`]: (state) => (code) =>
        state[itemNamePlural].find(item => item.code === code),
      
      ...additionalGetters
    },

    actions: {
      async [`fetch${capitalize(itemNamePlural)}`]() {
        this.isLoading = true
        this.error = null

        try {
          const response = await this.$axios.get(apiEndpoint)
          this[itemNamePlural] = response.data.map(mapResponse)
        } catch (error) {
          this.error = error.message || `Failed to fetch ${itemNamePlural}`
          console.error(`Error fetching ${itemNamePlural}:`, error)
        } finally {
          this.isLoading = false
        }
      },

      reset() {
        this[itemNamePlural] = []
        this.error = null
        this.isLoading = false
        // Reset additional state - use structuredClone for deep cloning of objects/arrays
        Object.keys(additionalState).forEach(key => {
          const value = additionalState[key]
          // Deep clone objects and arrays to avoid shared state
          if (value !== null && typeof value === 'object') {
            // Use structuredClone if available (modern browsers/Node 17+), otherwise fallback to JSON
            this[key] = typeof structuredClone !== 'undefined' 
              ? structuredClone(value)
              : JSON.parse(JSON.stringify(value))
          } else {
            this[key] = value
          }
        })
      },

      ...additionalActions
    }
  })
}
