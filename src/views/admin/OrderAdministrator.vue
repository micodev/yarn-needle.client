<template>
  <div class="order-administrator">
    <h1>Order Administrator</h1>
    <div class="admin-panel">
      <div class="filters">
        <div class="search-box">
          <input type="text" placeholder="Search by order ID or customer..." v-model="searchQuery" />
        </div>
        <div class="filter-options">
          <select v-model="paymentStateFilter" @change="loadOrders">
            <option value="">All Payment Statuses</option>
            <option value="pending">Pending</option>
            <option value="authorized">Authorized</option>
            <option value="declined">Declined</option>
          </select>

          <div class="date-range">
            <input type="date" v-model="startDateInput" @change="updateStartDate" />
            <span>to</span>
            <input type="date" v-model="endDateInput" @change="updateEndDate" />
            <button @click="loadOrders" class="apply-filters">Apply Filters</button>
          </div>
        </div>
      </div>

      <div v-if="ordersStore.isLoading" class="loading">
        Loading orders...
      </div>

      <div v-else-if="ordersStore.error" class="error">
        {{ ordersStore.error }}
      </div>

      <table v-else class="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Type</th>
            <th>Title</th>
            <th>Date</th>
            <th>Total</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in ordersStore.dashboardOrders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ order.type }}</td>
            <td>{{ order.title }}</td>
            <td>{{ formatDate(order.date) }}</td>
            <td>${{ order.price?.toFixed(2) }}</td>
            <td>
              <span class="status-badge" :class="order.orderState">{{ order.orderState }}</span>
            </td>
            <td>
              <span class="status-badge" :class="order.paymentState">{{ order.paymentState }}</span>
            </td>
            <td class="actions">
              <button @click="viewDetails(order.id)">Details</button>
              <button @click="updateStatus(order)" class="update">Update Status</button>
            </td>
          </tr>
          <tr v-if="ordersStore.dashboardOrders.length === 0">
            <td colspan="8" class="no-data">No orders found</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button
          :disabled="!ordersStore.hasPreviousPage"
          @click="changePage(ordersStore.currentPage - 1)"
        >
          Previous
        </button>
        <span>Page {{ ordersStore.currentPage }} of {{ ordersStore.totalPages }}</span>
        <button
          :disabled="!ordersStore.hasNextPage"
          @click="changePage(ordersStore.currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useOrdersStore } from '../../stores/orders'

const ordersStore = useOrdersStore()

// Filter states
const searchQuery = ref('')
const paymentStateFilter = ref('')
const startDateInput = ref('')
const endDateInput = ref('')
const startDate = ref(null)
const endDate = ref(null)
const pageSize = ref(10)

// Convert string date inputs to Date objects
function updateStartDate() {
  startDate.value = startDateInput.value ? new Date(startDateInput.value) : null
}

function updateEndDate() {
  endDate.value = endDateInput.value ? new Date(endDateInput.value) : null
}

// Load orders with current filters
function loadOrders() {
  ordersStore.fetchDashboardOrders(
    paymentStateFilter.value || null,
    startDate.value,
    endDate.value,
    ordersStore.currentPage,
    pageSize.value
  )
}

// Change page and reload orders
function changePage(newPage) {
  ordersStore.fetchDashboardOrders(
    paymentStateFilter.value || null,
    startDate.value,
    endDate.value,
    newPage,
    pageSize.value
  )
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

function viewDetails(orderId) {
  console.log('Viewing details for order:', orderId)
}

function updateStatus(order) {
  console.log('Updating status for order:', order.id)
}

// Load orders on component mount
onMounted(() => {
  loadOrders()
})

// Watch for search query changes to filter locally
watch(searchQuery, (newVal) => {
  // Local filtering for search query
  // Implement if API doesn't support search filtering
})
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

.loading, .error, .no-data {
  padding: 20px;
  text-align: center;
  margin: 20px 0;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.apply-filters {
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
