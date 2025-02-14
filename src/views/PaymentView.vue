<template>
  <div class="payment-form">
    <div v-if="orderStore.isLoading" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Processing...</p>
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
import { useOrderStore } from '../stores/orderStore'

window.addEventListener('message', (event) => {
  if (event.origin === 'https://localhost:44350') {
       window.location.href = '/yarn-needle.client/#/my-courses'
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
