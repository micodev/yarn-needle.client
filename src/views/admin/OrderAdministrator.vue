<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-4">مسؤول الطلبات</h1>
    <div class="bg-white rounded-lg shadow-md p-5">
      <div class="mb-5">
        <div class="flex flex-wrap gap-4 items-center">
          <InputText
            v-model="searchQuery"
            placeholder="البحث بمعرف الطلب أو العميل..."
            class="flex-1 p-2.5 border border-gray-300 rounded-md"
          />
          <Dropdown
            v-model="paymentStateFilter"
            :options="paymentStatusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="جميع حالات الدفع"
            class="w-48"
            @change="loadOrders"
          />

          <Calendar
            v-model="startDate"
            dateFormat="yy-mm-dd"
            placeholder="تاريخ البدء"
            class="w-40"
          />
          <span>إلى</span>
          <Calendar
            v-model="endDate"
            dateFormat="yy-mm-dd"
            placeholder="تاريخ الانتهاء"
            class="w-40"
          />
          <Button
            label="تطبيق المرشحات"
            @click="loadOrders"
          />
        </div>
      </div>

      <div v-if="ordersStore.isLoading" class="text-center py-5">
        <ProgressSpinner />
        <div>جاري تحميل الطلبات...</div>
      </div>

      <div v-else-if="ordersStore.error" class="p-4 rounded-md border my-5 text-center">
        {{ ordersStore.error }}
      </div>

      <DataTable
        v-else
        :value="ordersStore.dashboardOrders"
        class="p-datatable-sm"
        responsiveLayout="scroll"
        :paginator="false"
        stripedRows
        :emptyMessage="'لم يتم العثور على طلبات'"
      >
        <Column field="id" header="رقم الطلب">
          <template #body="slotProps">
            #{{ slotProps.data.id }}
          </template>
        </Column>
        <Column field="orderType" header="نوع الطلب" />
        <Column header="العنوان">
          <template #body="slotProps">
            {{ getOrderTitle(slotProps.data) }}
          </template>
        </Column>
        <Column header="التاريخ">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.orderDate) }}
          </template>
        </Column>
        <Column header="السعر">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.purchasePrice) }}
          </template>
        </Column>
        <Column header="حالة الطلب">
          <template #body="slotProps">
            <Tag :severity="getStatusSeverity(slotProps.data.orderState)" :value="slotProps.data.orderState" />
          </template>
        </Column>
        <Column header="حالة الدفع">
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
  { label: 'جميع حالات الدفع', value: '' },
  { label: 'قيد الانتظار', value: 'pending' },
  { label: 'مصرح به', value: 'authorized' },
  { label: 'مرفوض', value: 'declined' }
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
  if (!dateString) return 'غير متاح';
  return new Date(dateString).toLocaleDateString();
}

function formatPrice(price) {
  if (price == null) return 'غير متاح';
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
