<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">تاريخ الطلبات</h1>
    </div>

    <div v-if="ordersStore.isLoading" class="flex justify-center items-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else :class="[
      'grid gap-4',
      {
        'grid-cols-1': ordersStore.sortedOrders.length === 1 || ordersStore.sortedOrders.length > 4,
        'grid-cols-2': ordersStore.sortedOrders.length === 2 || ordersStore.sortedOrders.length === 4,
        'grid-cols-3': ordersStore.sortedOrders.length === 3
      },
      {
        'md:grid-cols-2': ordersStore.sortedOrders.length > 2,
        'lg:grid-cols-3': ordersStore.sortedOrders.length > 3
      }
    ]">
      <Card v-for="order in ordersStore.sortedOrders" :key="order.id"
        class="bg-white dark:bg-gray-800 rounded-lg card-shadow p-5">
        <template #header>
          <div class="flex justify-between items-start mb-4">
            <span class="text-lg font-semibold">📌 طلب #{{ order.id }}</span>
            <span class="text-primary font-bold">{{ formatPrice(order.purchasePrice) }} ريال</span>
          </div>
        </template>

        <template #content>
          <div class="flex flex-col h-full">
            <div class="flex-1 space-y-4">
              <div class="flex items-start space-x-2">
                <span class="ml-2">🛒</span>
                <div>
                  <span class="font-medium">{{ order.orderType == "Course"?"دورة":"عضوية" }}:</span>
                  <span v-if="order.course" class="ml-1">{{ order.course.title }}</span>
                  <span v-if="order.membership" class="ml-1">{{ order.membership.name }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center space-x-2">
                  <span class="ml-2">📅</span>
                  <span>{{ formatDate(order.orderDate) }}</span>
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
                <Button v-if="order.orderState === 'قيد الانتظار'" label="اكمال الدفع"
                  class="p-button-primary w-full" />
              </div>
            </div>

            <div class="mt-auto pt-4">
              <div
                class="p-2 bg-gray-100 dark:bg-gray-700 rounded text-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2 copy-button-shadow"
                @click="copyOrderKey(order.orderKey)" tabindex="0" v-tooltip.focus.top="'تم النسخ'">
                <i class="pi pi-copy text-gray-600 dark:text-gray-400"></i>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ order.orderKey }}</span>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Card, Button, ProgressSpinner } from 'primevue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.fetchOrders()
})

// Keep utility functions
const formatDate = (date) => {
  return new Intl.DateTimeFormat('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'gregory'
  }).format(new Date(date))
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

<style scoped>
:deep(.text-gray-900) {
  color: var(--text-color);
}

:deep(.text-gray-600) {
  color: var(--text-secondary-color);
}

:deep(.bg-gray-100) {
  background-color: var(--surface-100);
}



:deep(.border-gray-200) {
  border-color: var(--surface-border);
}

.p-tooltip {
  direction: rtl;
}

.pi-copy {
  font-size: 0.875rem;
}

:deep(.p-card) {
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  transition: box-shadow 0.2s ease-in-out;
}

.card-shadow {
  box-shadow: inset 0 2px 8px -2px rgba(0, 0, 0, 0.15),
    inset 0 -2px 8px -2px rgba(0, 0, 0, 0.1);
}

:deep(.dark) .card-shadow {
  box-shadow: inset 0 1px 12px -2px rgba(255, 255, 255, 0.12),
    inset 0 -1px 12px -2px rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
}

.copy-button-shadow {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.12);
}

:deep(.dark) .copy-button-shadow {
  box-shadow: inset 0 2px 6px rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
}
</style>
