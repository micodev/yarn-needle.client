<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Order History</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="order in orders"
        :key="order.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700"
      >
        <template #header>
          <div class="flex justify-between items-start mb-4">
            <span class="text-lg font-semibold">📌 Order #{{ order.id }}</span>
            <span class="text-primary font-bold">{{ formatPrice(order.price) }} SAR</span>
          </div>
        </template>
        <template #title>Simple Card</template>
        <template #content>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
          </p>
        </template>
        <div class="space-y-3">
          <div class="flex items-start">
            <span class="mr-2">🛒</span>
            <div>
              <span class="font-medium">{{ order.type }}:</span>
              <span class="ml-1">{{ order.title }}</span>
            </div>
          </div>

          <div class="flex items-center">
            <span class="mr-2">📅</span>
            <span>{{ formatDate(order.date) }}</span>
          </div>

          <div class="flex items-center">
            <span class="mr-2">{{ getOrderStateEmoji(order.orderState) }}</span>
            <span class="font-medium">Order State:</span>
            <span :class="getOrderStateClass(order.orderState)" class="ml-2">
              {{ order.orderState }}
            </span>
          </div>

          <div class="flex items-center">
            <span class="mr-2">💳</span>
            <span class="font-medium">Payment State:</span>
            <span :class="getPaymentStateClass(order.paymentState)" class="ml-2">
              {{ order.paymentState }}
            </span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Card } from 'primevue'

const orders = ref([
  {
    id: '1024',
    type: 'Course',
    title: 'Web Development',
    date: new Date('2025-01-25'),
    orderState: 'Completed',
    paymentState: 'Authorized',
    price: 199.99
  },
  {
    id: '1025',
    type: 'Membership',
    title: 'Gold Plan',
    date: new Date('2025-01-24'),
    orderState: 'Cancelled',
    paymentState: 'Declined',
    price: 449.99
  }
])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const formatPrice = (price) => {
  return price.toFixed(2)
}

const getOrderStateEmoji = (state) => {
  switch (state) {
    case 'Completed': return '✅'
    case 'Pending': return '⏳'
    case 'Failed': return '❌'
    case 'Cancelled': return '❌'
    default: return '❔'
  }
}

const getOrderStateClass = (state) => {
  switch (state) {
    case 'Completed': return 'text-green-500'
    case 'Pending': return 'text-yellow-500'
    case 'Failed': return 'text-red-500'
    case 'Cancelled': return 'text-red-500'
    default: return 'text-gray-500'
  }
}

const getPaymentStateClass = (state) => {
  switch (state) {
    case 'Authorized': return 'text-green-500'
    case 'Hold': return 'text-yellow-500'
    case 'Pending': return 'text-yellow-500'
    case 'Declined': return 'text-red-500'
    default: return 'text-gray-500'
  }
}
</script>

