<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Organization Management</h1>

    <!-- Add Organization Button -->
    <div class="mb-4">
      <Button label="Add Organization" icon="pi pi-plus" @click="dialogVisible = true" />
    </div>

    <div v-if="organizationStore.loading" class="text-blue-500">Loading organizations...</div>
    <div v-if="organizationStore.error" class="text-red-500">{{ organizationStore.error }}</div>
    <div v-if="organizationStore.organizations && organizationStore.organizations.length" class="flex flex-wrap gap-4">
      <Card v-for="org in organizationStore.organizations" :key="org.id" class="max-w-xs shadow-lg">

        <template #content>
          <img v-if="org.logo" :src="org.logo" alt="Logo" class="h-16 w-16 object-contain mx-auto"/>
          <div class="p-4">
            <h2 class="text-xl font-semibold">{{ org.name  }}</h2>
          </div>
        </template>

      </Card>
    </div>

    <!-- Organization Dialog -->
    <Dialog header="Add Organization" v-model:visible="dialogVisible" modal :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '90vw' }">
      <div class="p-5 flex flex-col gap-4">
        <!-- Updated form fields with Tailwind styling -->
        <div>
          <label class="block font-medium mb-1">Name</label>
          <InputText v-model="newOrganization.name" class="w-full" />
        </div>
        <div>
          <label class="block font-medium mb-1">Logo (Image File)</label>
          <input type="file" accept="image/*" @change="handleImageUpload" class="w-full" />
        </div>
        <div class="flex justify-end gap-2">
          <Button label="Cancel" class="p-button-secondary" @click="dialogVisible = false" />
          <Button label="Save" @click="handleAddOrganization" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useOrganizationStore } from '@/stores/organizationStore'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

const organizationStore = useOrganizationStore()
onMounted(async () => {
  await organizationStore.fetchOrganizations()
})

// Add organization dialog state and handling
const dialogVisible = ref(false)
const newOrganization = ref({ name: '', base64image: '' })

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      newOrganization.value.base64image = reader.result
    }
    reader.readAsDataURL(file)
  }
}

async function handleAddOrganization() {
	await organizationStore.createOrganization(newOrganization.value)
	newOrganization.value = { name: '', base64image: '' }
	dialogVisible.value = false
}
</script>
