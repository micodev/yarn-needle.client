<template>
  <div class="payment-form">
    <div v-if="loading" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Processing...</p>
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      {{ error }}
    </div>

    <form @submit.prevent="submitPayment" v-if="!loading" class="space-y-6">
      <div class="form-group">
        <label for="cartId" class="block text-sm font-medium text-gray-700">Cart ID</label>
        <input
          id="cartId"
          v-model="payment.cartId"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
        <input
          id="amount"
          v-model="payment.cartAmount"
          type="number"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="transactionType" class="block text-sm font-medium text-gray-700">Transaction Type</label>
        <input
          id="transactionType"
          v-model="payment.tranType"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="transactionClass" class="block text-sm font-medium text-gray-700">Transaction Class</label>
        <input
          id="transactionClass"
          v-model="payment.tranClass"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
        <select
          id="currency"
          v-model="payment.cartCurrency"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="IQD">IQD</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div class="form-group">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <input
          id="description"
          v-model="payment.cartDescription"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Add these fields before the customer details section -->
      <div class="form-group">
        <label for="return" class="block text-sm font-medium text-gray-700">Return URL</label>
        <input
          id="return"
          v-model="payment.return"
          type="url"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="callback" class="block text-sm font-medium text-gray-700">Callback URL</label>
        <input
          id="callback"
          v-model="payment.callback"
          type="url"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Customer Details</h3>

        <div class="form-group">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            v-model="payment.customerDetails.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div class="form-group">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="payment.customerDetails.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        Proceed to Payment
      </button>
    </form>

    <div v-if="redirectUrl" class="mt-4">
      <div v-if="isFramed" class="rounded-lg overflow-hidden shadow-lg">
        <iframe
          :src="redirectUrl"
          width="100%"
          height="600"
          frameborder="0"
          class="w-full"
        ></iframe>
      </div>
      <div v-else class="text-center">
        <p class="text-gray-600 mb-4">Redirecting to payment page...</p>
        <button
          @click="redirectToPayment"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Click here if not redirected automatically
        </button>
      </div>
    </div>
  </div>
    <!-- Customer Details Form Section -->
    <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900">Customer Details</h3>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="form-group">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="payment.customerDetails.name"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="payment.customerDetails.email"
          type="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
        <input
          id="phone"
          v-model="payment.customerDetails.phone"
          type="tel"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="street" class="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          id="street"
          v-model="payment.customerDetails.street1"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
        <input
          id="city"
          v-model="payment.customerDetails.city"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="form-group">
        <label for="state" class="block text-sm font-medium text-gray-700">State</label>
        <input
          id="state"
          v-model="payment.customerDetails.state"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PaymentForm',
  data() {
    return {
      loading: false,
      error: null,
      redirectUrl: null,
      isFramed: false,
      payment: {
        profileId: 0,
        tranType: '',
        tranClass: '',
        cartId: '',
        cartDescription: '',
        cartCurrency: 'IQD',
        cartAmount: 0,
        callback: '',
        return: '',
        customerDetails: {
          name: '',
          email: '',
          phone: '',
          street1: '',
          city: '',
          state: '',
          country: 'IQ',
          ip: ''
        }
      }
    }
  },
  methods: {
    async submitPayment() {
      // Update validation
      if (!this.payment.cartId || !this.payment.cartDescription ||
          !this.payment.cartCurrency || !this.payment.cartAmount ||
          !this.payment.callback || !this.payment.return) {
        this.error = 'Please fill in all required fields';
        return;
      }

      try {
        this.loading = true
        this.error = null

        // Get client IP
        const ipResponse = await axios.get('https://api64.ipify.org/?format=json')
        this.payment.customerDetails.ip = ipResponse.data.ip

        const response = await axios.post('https://localhost:44350/api/payment/initiate', this.payment)

        if (response.data.redirect_url) {
          this.redirectUrl = response.data.redirect_url
          this.isFramed = !!response.data.framed

          if (!this.isFramed) {
            window.location.href = this.redirectUrl
          }
        }
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to process payment'
      } finally {
        this.loading = false
      }
    },

    redirectToPayment() {
      if (this.redirectUrl) {
        window.location.href = this.redirectUrl
      }
    }
  }
}
</script>
