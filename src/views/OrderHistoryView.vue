<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تاريخ الطلبات</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="order in orders"
        :key="order.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700"
      >
        <template #header>
          <div class="flex justify-between items-start mb-4">
            <span class="text-lg font-semibold">📌 طلب #{{ order.id }}</span>
            <span class="text-primary font-bold">{{ formatPrice(order.price) }} ريال</span>
          </div>
        </template>
        <template #title>
          <div class="flex items-start">
            <span class="mr-2">🛒</span>
            <div>
              <span class="font-medium">{{ order.type }}:</span>
              <span class="ml-1">{{ order.title }}</span>
            </div>
          </div>
        </template>
        <template #content>
          <div class="space-y-3">
            <div class="flex items-center">
              <span class="mr-2">📅</span>
              <span>{{ formatDate(order.date) }}</span>
            </div>

            <div class="flex items-center">
              <span class="mr-2">{{ getOrderStateEmoji(order.orderState) }}</span>
              <span class="font-medium">حالة الطلب:</span>
              <span :class="getOrderStateClass(order.orderState)" class="ml-2">
                {{ order.orderState }}
              </span>
            </div>

            <div class="flex items-center">
              <span class="mr-2">💳</span>
              <span class="font-medium">حالة الدفع:</span>
              <span :class="getPaymentStateClass(order.paymentState)" class="ml-2">
                {{ order.paymentState }}
              </span>
            </div>

            <div v-if="order.orderState === 'قيد الانتظار'" class="flex justify-end mt-4">
              <button class="bg-blue-500 text-white px-4 py-2 rounded">شراء</button>
            </div>
          </div>
        </template>
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
    type: 'دورة',
    title: 'تطوير الويب',
    date: new Date('2025-01-25'),
    orderState: 'مكتمل',
    paymentState: 'مصرح',
    price: 199.99
  },
  {
    id: '1025',
    type: 'عضوية',
    title: 'الخطة الذهبية',
    date: new Date('2025-01-24'),
    orderState: 'ملغى',
    paymentState: 'مرفوض',
    price: 449.99
  }
])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'gregory'
  }).format(date)
}

const formatPrice = (price) => {
  return price.toFixed(2)
}

const getOrderStateEmoji = (state) => {
  switch (state) {
    case 'مكتمل': return '✅'
    case 'قيد الانتظار': return '⏳'
    case 'فشل': return '❌'
    case 'ملغى': return '❌'
    default: return '❔'
  }
}

const getOrderStateClass = (state) => {
  switch (state) {
    case 'مكتمل': return 'text-green-500'
    case 'قيد الانتظار': return 'text-yellow-500'
    case 'فشل': return 'text-red-500'
    case 'ملغى': return 'text-red-500'
    default: return 'text-gray-500'
  }
}

const getPaymentStateClass = (state) => {
  switch (state) {
    case 'مصرح': return 'text-green-500'
    case 'معلق': return 'text-yellow-500'
    case 'قيد الانتظار': return 'text-yellow-500'
    case 'مرفوض': return 'text-red-500'
    default: return 'text-gray-500'
  }
}
</script>

