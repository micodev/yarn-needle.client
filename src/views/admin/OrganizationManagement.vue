<template>
  <div>
    <h1>Organization Management</h1>
    <!-- ...existing code... -->
    <div v-if="loading">Loading organizations...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="organizations && organizations.length">
      <li v-for="org in organizations" :key="org.id">{{ org.name }}</li>
    </ul>
    <!-- ...existing code... -->
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useOrganizationStore } from '@/stores/organizationStore'

export default {
  name: 'OrganizationManagement',
  setup() {
    const organizationStore = useOrganizationStore()

    onMounted(() => {
      organizationStore.fetchOrganizations()
    })

    return {
      organizations: organizationStore.organizations,
      loading: organizationStore.loading,
      error: organizationStore.error
    }
  }
}
</script>
