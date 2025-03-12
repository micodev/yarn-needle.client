<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Organization Management</h1>
    <div v-if="organizationStore.loading" class="text-blue-500">Loading organizations...</div>
    <div v-if="organizationStore.error" class="text-red-500">{{ organizationStore.error }}</div>
    <div v-if="organizationStore.organizations && organizationStore.organizations.length" class="flex flex-wrap gap-4">
      <Card v-for="org in organizationStore.organizations" :key="org.id" class="max-w-xs shadow-lg">
        <template #header>
          <img v-if="org.logo" :src="org.logo" alt="Logo" class="h-16 w-16 object-contain mx-auto"/>
        </template>
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ org.name  }}</h2>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrganizationStore } from '@/stores/organizationStore'
import Card from 'primevue/card'

const organizationStore = useOrganizationStore()
onMounted(async () => {
  await organizationStore.fetchOrganizations()
})
</script>
