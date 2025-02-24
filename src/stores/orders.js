import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchOrders() {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.get('/api/order')
        this.orders = response.data
      } catch (err) {
        this.error = err.message || 'Failed to fetch orders'
      } finally {
        this.isLoading = false
      }
    },
    async subscribeMembership(membershipId, note = '') {
      this.isLoading = true
      this.error = null

      try {
        const response = await this.$axios.post('/api/order/membership', {
          membershipId,
          note
        })
        await this.fetchOrders()
        return response.data
      } catch (err) {
        this.error = err.message || 'Failed to subscribe to membership'
        throw err
      } finally {
        this.isLoading = false
      }
    }
  },

  getters: {
    sortedOrders: (state) => {
      return [...state.orders].sort((a, b) => {
        if (a.orderState === 'قيد الانتظار' && b.orderState !== 'قيد الانتظار') return -1
        if (b.orderState === 'قيد الانتظار' && a.orderState !== 'قيد الانتظار') return 1
        return new Date(b.date) - new Date(a.date)
      })
    }
  }
})

/*
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

*/
