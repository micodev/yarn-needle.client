import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    dashboardOrders: [], // new state property for dashboard orders
    isLoading: false,
    error: null,
    // Add new state for dashboard response data
    pagination: null,
    dashboardMessage: '',
    dashboardSuccess: false,
    dashboardErrors: []
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

    async fetchDashboardOrders(paymentStateCode = null, startDate = null, endDate = null, page = 1, pageSize = 10) {
      this.isLoading = true
      this.error = null
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (paymentStateCode) params.append('paymentStateCode', paymentStateCode);
        if (startDate) params.append('startDate', startDate.toISOString());
        if (endDate) params.append('endDate', endDate.toISOString());
        params.append('page', page.toString());
        params.append('pageSize', pageSize.toString());

        const response = await this.$axios.get(`/api/order/orders?${params.toString()}`);
        // Store all relevant parts of the response
        const { pagination, success, message, data, errors } = response.data
        this.dashboardOrders = data
        this.pagination = pagination
        this.dashboardMessage = message
        this.dashboardSuccess = success
        this.dashboardErrors = errors || []
      } catch (err) {
        this.error = err.message || 'Failed to fetch dashboard orders'
        this.dashboardSuccess = false
      } finally {
        this.isLoading = false
      }
    },
  },

  getters: {
    sortedOrders: (state) => {
      return [...state.orders].sort((a, b) => {
        if (a.orderState === 'قيد الانتظار' && b.orderState !== 'قيد الانتظار') return -1
        if (b.orderState === 'قيد الانتظار' && a.orderState !== 'قيد الانتظار') return 1
        return new Date(b.date) - new Date(a.date)
      })
    },

    // New getters for pagination
    currentPage: (state) => state.pagination?.pageIndex || 1,
    totalPages: (state) => state.pagination?.totalPages || 0,
    hasPreviousPage: (state) => state.pagination?.hasPreviousPage || false,
    hasNextPage: (state) => state.pagination?.hasNextPage || false
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
