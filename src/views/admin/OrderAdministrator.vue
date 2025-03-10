<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-4">Order Administrator</h1>
    <div class="bg-white rounded-lg shadow-md p-5">
      <div class="mb-5">
        <div class="mb-3">
          <InputText
            v-model="searchQuery"
            placeholder="Search by order ID or customer..."
            class="w-full p-2.5 border border-gray-300 rounded-md"
          />
        </div>
        <div class="flex flex-wrap gap-4 items-center">
          <Dropdown
            v-model="paymentStateFilter"
            :options="paymentStatusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="All Payment Statuses"
            class="w-48"
            @change="loadOrders"
          />

          <div class="flex items-center gap-2">
            <Calendar
              v-model="startDate"
              dateFormat="yy-mm-dd"
              placeholder="Start Date"
              class="w-40"
            />
            <span>to</span>
            <Calendar
              v-model="endDate"
              dateFormat="yy-mm-dd"
              placeholder="End Date"
              class="w-40"
            />
            <Button
              label="Apply Filters"
              @click="loadOrders"
              class="bg-green-500 hover:bg-green-600"
            />
          </div>
        </div>
      </div>

      <div v-if="ordersStore.isLoading" class="text-center py-5">
        <ProgressSpinner />
        <div>Loading orders...</div>
      </div>

      <div v-else-if="ordersStore.error" class="bg-red-100 text-red-800 p-4 rounded-md border border-red-300 my-5 text-center">
        {{ ordersStore.error }}
      </div>

      <DataTable
        v-else
        :value="ordersStore.dashboardOrders"
        class="p-datatable-sm"
        responsiveLayout="scroll"
        :paginator="false"
        stripedRows
        :emptyMessage="'No orders found'"
      >
        <Column field="id" header="Order ID">
          <template #body="slotProps">
            #{{ slotProps.data.id }}
          </template>
        </Column>
        <Column field="orderType" header="Order Type" />
        <Column header="Title">
          <template #body="slotProps">
            {{ getOrderTitle(slotProps.data) }}
          </template>
        </Column>
        <Column header="Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.orderDate) }}
          </template>
        </Column>
        <Column header="Price">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.purchasePrice) }}
          </template>
        </Column>
        <Column header="Order Status">
          <template #body="slotProps">
            <Tag :severity="getStatusSeverity(slotProps.data.orderState)" :value="slotProps.data.orderState" />
          </template>
        </Column>
        <Column header="Payment Status">
          <template #body="slotProps">
            <Tag :severity="getStatusSeverity(slotProps.data.paymentState)" :value="slotProps.data.paymentState" />
          </template>
        </Column>
      </DataTable>

      <Paginator
        v-if="ordersStore.dashboardOrders.length > 0"
        :rows="pageSize"
        :totalRecords="ordersStore.totalItems"
        :first="(ordersStore.currentPage - 1) * pageSize"
        @page="onPageChange($event)"
        class="mt-5"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useOrdersStore } from '../../stores/orders';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressSpinner from 'primevue/progressspinner';
import Paginator from 'primevue/paginator';
import Tag from 'primevue/tag';

const ordersStore = useOrdersStore();

// Filter states
const searchQuery = ref('');
const paymentStateFilter = ref('');
const startDate = ref(null);
const endDate = ref(null);
const pageSize = ref(10);

// Options for the payment status dropdown
const paymentStatusOptions = [
  { label: 'All Payment Statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Authorized', value: 'authorized' },
  { label: 'Declined', value: 'declined' }
];

// Load orders with current filters
function loadOrders() {
  ordersStore.fetchDashboardOrders(
    paymentStateFilter.value || null,
    startDate.value,
    endDate.value,
    ordersStore.currentPage,
    pageSize.value
  );
}

// Handle pagination
function onPageChange(event) {
  const newPage = Math.floor(event.first / event.rows) + 1;
  ordersStore.fetchDashboardOrders(
    paymentStateFilter.value || null,
    startDate.value,
    endDate.value,
    newPage,
    pageSize.value
  );
}

// Get title based on order type
function getOrderTitle(order) {
  if (order.orderType === 'Membership' && order.membership) {
    return order.membership.name;
  } else if (order.orderType === 'Course' && order.course) {
    return order.course.title;
  } else {
    return `${order.orderType} #${order.itemId}`;
  }
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
}

function formatPrice(price) {
  if (price == null) return 'N/A';
  return `${price.toFixed(2)} ريال`;
}

// Map status to PrimeVue Tag severity
function getStatusSeverity(status) {
  const statusMapping = {
    'تمت': 'success',
    'مصرح': 'success',
    'قيد الانتظار': 'warning',
    'ملغى': 'danger',
    'مرفوض': 'danger'
  };

  return statusMapping[status] || 'info';
}

// Load orders on component mount
onMounted(() => {
  loadOrders();
});
</script>
