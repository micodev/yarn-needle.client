<template>
  <div>
    <!-- Render any order details or instructions here -->
    <form ref="paytabsForm" method="post" action="https://www.paytabs.com/express/">
      <input type="hidden" name="merchant_email" :value="merchantEmail" />
      <input type="hidden" name="secret_key" :value="secretKey" />
      <input type="hidden" name="site_url" :value="siteUrl" />
      <input type="hidden" name="return_url" :value="returnUrl" />
      <!-- Other required PayTabs fields -->
      <input type="text" name="cc_first_name" v-model="form.firstName" placeholder="First Name" />
      <input type="text" name="cc_last_name" v-model="form.lastName" placeholder="Last Name" />
      <input type="text" name="cc_phone_number" v-model="form.phoneNumber" placeholder="Phone Number" />
      <input type="text" name="billing_address" v-model="form.billingAddress" placeholder="Billing Address" />
      <input type="text" name="city" v-model="form.city" placeholder="City" />
      <input type="text" name="state" v-model="form.state" placeholder="State" />
      <input type="text" name="postal_code" v-model="form.postalCode" placeholder="Postal Code" />
      <input type="text" name="country" v-model="form.country" placeholder="Country" />
      <input type="text" name="email" v-model="form.email" placeholder="Email" />
      <input type="text" name="amount" v-model="form.amount" placeholder="Payment Amount" />
      <input type="text" name="currency" v-model="form.currency" placeholder="USD" />
      <input type="hidden" name="title" :value="form.title" />
      <input type="hidden" name="quantity" :value="form.quantity" />
      <!-- Payment completion callback -->
      <input type="hidden" name="ip_merchant" :value="paymentCallbackUrl" />
      <button type="submit">Pay Now</button>
    </form>
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
