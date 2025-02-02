import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])
  const isLoading = ref(false)

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

  // Mock API call to fetch orders
  const fetchOrders = async () => {
    isLoading.value = true
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      orders.value = generateOrders(15)
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
