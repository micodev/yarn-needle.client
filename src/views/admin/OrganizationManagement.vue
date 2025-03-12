<template>
  <div>
    <h1>Organization Management</h1>
    <!-- ...existing code... -->
    <div v-if="organizationStore.loading">Loading organizations...</div>
    <div v-if="organizationStore.error">{{ organizationStore.error }}</div>
    <ul v-if="organizationStore.organizations && organizationStore.organizations.length">
      <li v-for="org in organizationStore.organizations" :key="org.id">{{ org.name }}</li>
    </ul>
    <!-- ...existing code... -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrganizationStore } from '@/stores/organizationStore'

const organizationStore = useOrganizationStore()
onMounted(() => {
  organizationStore.fetchOrganizations()
})
</script>
