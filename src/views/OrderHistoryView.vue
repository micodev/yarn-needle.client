<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تاريخ الطلبات</h1>
    </div>

    <div :class="[
      'grid gap-4',
      {
        'grid-cols-1': filteredOrders.length === 1 || filteredOrders.length > 4,
        'grid-cols-2': filteredOrders.length === 2 || filteredOrders.length === 4,
        'grid-cols-3': filteredOrders.length === 3
      },
      {
        'md:grid-cols-2': filteredOrders.length > 2,
        'lg:grid-cols-3': filteredOrders.length > 3
      }
    ]">
      <Card
        v-for="order in filteredOrders"
        :key="order.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700"
      >
        <template #header>
          <div class="flex justify-between items-start mb-4">
            <span class="text-lg font-semibold">📌 طلب #{{ order.id }}</span>
            <span class="text-primary font-bold">{{ formatPrice(order.price) }} ريال</span>
          </div>
        </template>

        <template #content>
          <div class="flex flex-col h-full">
            <div class="flex-1 space-y-4">
              <div class="flex items-start space-x-2">
                <span class="ml-2">🛒</span>
                <div>
                  <span class="font-medium">{{ order.type }}:</span>
                  <span class="ml-1">{{ order.title }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center space-x-2">
                  <span class="ml-2">📅</span>
                  <span>{{ formatDate(order.date) }}</span>
                </div>

                <div class="flex items-center space-x-2">
                  <span class="ml-2">{{ getOrderStateEmoji(order.orderState) }}</span>
                  <span class="font-medium">حالة الطلب:</span>
                  <span :class="getOrderStateClass(order.orderState)" class="ml-2">
                    {{ order.orderState }}
                  </span>
                </div>

                <div class="flex items-center space-x-2">
                  <span class="ml-2">💳</span>
                  <span class="font-medium">حالة الدفع:</span>
                  <span :class="getPaymentStateClass(order.paymentState)" class="ml-2">
                    {{ order.paymentState }}
                  </span>
                </div>
              </div>

              <div class="mt-4 mb-2 min-h-[40px]">
                <Button v-if="order.orderState === 'قيد الانتظار'" label="اكمال الدفع" class="p-button-primary w-full" />
              </div>
            </div>

            <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded text-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ order.key }}</span>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Card, Button } from 'primevue'

const orders = ref([
  {
    id: '1024',
    key: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'دورة',
    title: 'تطوير الويب',
    date: new Date('2025-01-25'),
    orderState: 'مكتمل',
    paymentState: 'مصرح',
    price: 199.99
  },
  {
    id: '1025',
    key: 'b2c3d4e5-f678-90ab-cdef-1234567890ab',
    type: 'عضوية',
    title: 'الخطة الذهبية',
    date: new Date('2025-01-24'),
    orderState: 'ملغى',
    paymentState: 'مرفوض',
    price: 449.99
  },
  {
    id: '1026',
    key: 'c3d4e5f6-7890-abcd-ef12-34567890abcd',
    type: 'دورة',
    title: 'تصميم الجرافيك',
    date: new Date('2025-01-23'),
    orderState: 'قيد الانتظار',
    paymentState: 'قيد الانتظار',
    price: 299.99
  }
])

// Custom computed property for filtered orders
const filteredOrders = computed(() => {
  return orders.value.slice(0, 6) // Example: limit to 6 orders
  // You can add more filtering logic here
})

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

