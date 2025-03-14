<template>
  <div class="payment-form">
    <div v-if="orderStore.isLoading" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">جاري المعالجة...</p>
    </div>

    <div v-if="orderStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      {{ orderStore.error }}
    </div>

    <div v-if="orderStore.redirectUrl" class="mt-4">
      <div class="rounded-lg overflow-hidden shadow-lg">
        <iframe
          :src="orderStore.redirectUrl"
          width="100%"
          height="600"
          frameborder="0"
          class="w-full"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from '@/stores/orderStore'
import { onMounted, ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL
const BASE_URL = import.meta.env.VITE_BASE_URL

// Listen for messages from payment iframe
window.addEventListener('message', (event) => {
  // Check if the message is from our API
  if (event.origin === API_URL || event.origin === 'https://localhost:44350') {
       window.location.href = '/#/my-courses'
  }
})

export default {
  name: 'PaymentForm',
  setup() {
    const orderStore = useOrderStore()

    return {
      orderStore
    }
  }
}
</script>
