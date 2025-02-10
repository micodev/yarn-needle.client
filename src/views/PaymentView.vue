<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Details</h2>
      <form ref="paytabsForm" method="post" action="https://www.paytabs.com/express/" class="space-y-4">
        <!-- Hidden inputs -->
        <input type="hidden" name="merchant_email" :value="merchantEmail" />
        <input type="hidden" name="secret_key" :value="secretKey" />
        <input type="hidden" name="site_url" :value="siteUrl" />
        <input type="hidden" name="return_url" :value="returnUrl" />
        
        <!-- Form Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" name="cc_first_name" v-model="form.firstName" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" name="cc_last_name" v-model="form.lastName" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" v-model="form.email" 
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="text" name="cc_phone_number" v-model="form.phoneNumber" 
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Billing Address</label>
          <input type="text" name="billing_address" v-model="form.billingAddress" 
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">City</label>
            <input type="text" name="city" v-model="form.city" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">State</label>
            <input type="text" name="state" v-model="form.state" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Postal Code</label>
            <input type="text" name="postal_code" v-model="form.postalCode" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" name="country" v-model="form.country" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Amount</label>
            <input type="text" name="amount" v-model="form.amount" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Currency</label>
            <input type="text" name="currency" v-model="form.currency" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>

        <input type="hidden" name="title" :value="form.title" />
        <input type="hidden" name="quantity" :value="form.quantity" />
        <input type="hidden" name="ip_merchant" :value="paymentCallbackUrl" />

        <button type="submit" 
                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
          Pay Now
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayTabsForm",
  data() {
    return {
      merchantEmail: "your-merchant-email",
      secretKey: "your-secret-key",
      siteUrl: "https://example.com",
      returnUrl: "https://example.com/payment-complete", // or your own route
      paymentCallbackUrl: "https://example.com/api/payment/callback",
      form: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        billingAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        email: "",
        amount: "",
        currency: "USD",
        title: "Order Payment",
        quantity: 1
      }
    };
  }
};
</script>
