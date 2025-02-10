import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])
  const isLoading = ref(false)

  const fetchOrders = async () => {
    isLoading.value = true
    try {
      const response = await fetch('/api/order')
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      orders.value = await response.json()
    } catch (error) {
      console.error('Error fetching orders:', error)
      orders.value = []
    } finally {
      isLoading.value = false
    }
  }

  // Computed property for sorted orders
  const sortedOrders = computed(() => {
    return [...orders.value].sort((a, b) => {
      if (a.orderState === 'قيد الانتظار' && b.orderState !== 'قيد الانتظار') return -1
      if (b.orderState === 'قيد الانتظار' && a.orderState !== 'قيد الانتظار') return 1
      return new Date(b.date) - new Date(a.date)
    })
  })

  return {
    orders,
    isLoading,
    fetchOrders,
    sortedOrders
  }
})
