<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" header="Drawer">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </Drawer>
    <!-- <Button icon="pi pi-arrow-right" @click="visible = true" /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

// import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
const visible = ref(false)
</script>
