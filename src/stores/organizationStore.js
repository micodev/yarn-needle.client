import { defineStore } from 'pinia'

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organizations: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchOrganizations() {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.get('/api/meta/organizations');
        // ...existing processing similar to commentManagementStore...
        this.organizations = response.data; // assuming direct array response
      } catch (error) {
        this.error = 'Failed to load organizations.';
        console.error('Fetching organizations failed:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
