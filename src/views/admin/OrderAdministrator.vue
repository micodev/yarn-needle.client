<template>
  <div class="order-administrator">
    <h1>Order Administrator</h1>
    <div class="admin-panel">
      <div class="filters">
        <div class="search-box">
          <input type="text" placeholder="Search by order ID or customer..." v-model="searchQuery" />
        </div>
        <div class="filter-options">
          <select v-model="statusFilter">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>

          <div class="date-range">
            <input type="date" v-model="startDate" />
            <span>to</span>
            <input type="date" v-model="endDate" />
          </div>
        </div>
      </div>

      <table class="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ order.customer }}</td>
            <td>{{ order.products }}</td>
            <td>{{ formatDate(order.date) }}</td>
            <td>${{ order.total.toFixed(2) }}</td>
            <td>
              <span class="status-badge" :class="order.status">{{ order.status }}</span>
            </td>
            <td class="actions">
              <button @click="viewDetails(order.id)">Details</button>
              <button @click="updateStatus(order)" class="update">Update Status</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrdersStore } from '../../stores/orders'

const ordersStore = useOrdersStore()
onMounted(() => {
  ordersStore.fetchDashboardOrders()
})

const orders = ref([
  { id: '10001', customer: 'John Smith', products: 'Vue.js Masterclass', date: '2023-06-15', total: 79.99, status: 'completed' },
  { id: '10002', customer: 'Jane Doe', products: 'UI/UX Design Principles', date: '2023-06-20', total: 89.99, status: 'pending' },
  { id: '10003', customer: 'Mike Johnson', products: 'Business Analytics', date: '2023-06-25', total: 99.99, status: 'cancelled' },
  { id: '10004', customer: 'Sarah Williams', products: 'Flutter Development', date: '2023-06-28', total: 129.99, status: 'refunded' },
])

const searchQuery = ref('')
const statusFilter = ref('')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    // Search filter
    const matchesSearch = searchQuery.value === '' ||
      order.id.includes(searchQuery.value) ||
      order.customer.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter.value === '' || order.status === statusFilter.value

    // Date filter
    let matchesDate = true
    if (startDate.value && endDate.value) {
      const orderDate = new Date(order.date)
      const start = new Date(startDate.value)
      const end = new Date(endDate.value)
      end.setHours(23, 59, 59) // Include the entire end day
      matchesDate = orderDate >= start && orderDate <= end
    }

    return matchesSearch && matchesStatus && matchesDate
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage) || 1
})

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

function viewDetails(orderId) {
  console.log('Viewing details for order:', orderId)
}

function updateStatus(order) {
  console.log('Updating status for order:', order.id)
}
</script>

<style scoped>
.order-administrator {
  padding: 20px;
}

.admin-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.search-box {
  margin-bottom: 10px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-options {
  display: flex;
  gap: 15px;
}

.filter-options select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-range input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.order-table th, .order-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.order-table th {
  background-color: #f8f9fa;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.completed {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.status-badge.refunded {
  background-color: #d1ecf1;
  color: #0c5460;
}

.actions button {
  margin-right: 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2196F3;
  color: white;
}

.actions button.update {
  background-color: #FF9800;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.pagination button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2196F3;
  color: white;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
