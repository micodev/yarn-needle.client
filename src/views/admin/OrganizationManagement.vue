<template>
  <div>
    <h1>Organization Management</h1>
    <!-- ...existing code... -->
    <div v-if="organizationStore.loading">Loading organizations...</div>
    <div v-if="organizationStore.error">{{ organizationStore.error }}</div>
    <!-- Replaced list with cards view -->
    <div v-if="organizationStore.organizations && organizationStore.organizations.length" class="cards-container">
      <div v-for="org in organizationStore.organizations" :key="org.id" class="card">
        <img v-if="org.logo" :src="org.logo" alt="Logo" class="card-logo" />
        <h2 class="card-title">{{ org.name }}</h2>
      </div>
    </div>
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
