<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تاريخ الطلبات</h1>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else :class="[
      'grid gap-4',
      {
        'grid-cols-1': sortedOrders.length === 1 || sortedOrders.length > 4,
        'grid-cols-2': sortedOrders.length === 2 || sortedOrders.length === 4,
        'grid-cols-3': sortedOrders.length === 3
      },
      {
        'md:grid-cols-2': sortedOrders.length > 2,
        'lg:grid-cols-3': sortedOrders.length > 3
      }
    ]">
      <Card
        v-for="order in sortedOrders"
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
              <div
                class="p-2 bg-gray-100 dark:bg-gray-700 rounded text-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
                @click="copyOrderKey(order.key)"
                v-tooltip.click.top="'تم النسخ'"
              >
                <i class="pi pi-copy text-gray-600 dark:text-gray-400"></i>
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
import { ref, computed, onMounted } from 'vue'
import { Card, Button, ProgressSpinner } from 'primevue'

const orders = ref([])
const isLoading = ref(true)

const generateOrders = (count) => {
  const orderTypes = ['دورة', 'عضوية']
  const titles = ['تطوير الويب', 'تصميم الجرافيك', 'التسويق الرقمي', 'الذكاء الاصطناعي', 'علوم البيانات']
  const states = ['مكتمل', 'قيد الانتظار', 'ملغى']
  const paymentStates = ['مصرح', 'قيد الانتظار', 'مرفوض']

  return Array.from({ length: count }, (_, index) => ({
    id: (1020 + index).toString(),
    key: `order-${crypto.randomUUID()}`,
    type: orderTypes[Math.floor(Math.random() * orderTypes.length)],
    title: titles[Math.floor(Math.random() * titles.length)],
    date: new Date(2025, 0, 25 - index),
    orderState: states[Math.floor(Math.random() * states.length)],
    paymentState: paymentStates[Math.floor(Math.random() * paymentStates.length)],
    price: Math.floor(Math.random() * 500 + 100)
  }))
}

// Sort orders to show pending first
const sortedOrders = computed(() => {
  return [...orders.value].sort((a, b) => {
    if (a.orderState === 'قيد الانتظار' && b.orderState !== 'قيد الانتظار') return -1
    if (b.orderState === 'قيد الانتظار' && a.orderState !== 'قيد الانتظار') return 1
    return new Date(b.date) - new Date(a.date) // Secondary sort by date
  })
})

// Initialize orders with loading state
onMounted(async () => {
  isLoading.value = true
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    orders.value = generateOrders(15)
  } finally {
    isLoading.value = false
  }
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

const copyOrderKey = async (key) => {
  try {
    await navigator.clipboard.writeText(key)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style>
.p-tooltip {
  direction: rtl;
}

.pi-copy {
  font-size: 0.875rem;
}
</style>

