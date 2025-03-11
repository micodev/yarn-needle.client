<template>
  <div class="p-5 rtl" dir="rtl">
    <h1 class="text-2xl font-bold mb-4">إدارة المحاضرين</h1>
    <Card class="shadow-md">
      <template #content>
        <div class="flex justify-between mb-5">
          <Button label="إضافة محاضر جديد" icon="pi pi-plus" severity="success" @click="addNewLecturer" />
          <span class="p-input-icon-left w-72">
            <i class="pi pi-search" />
            <InputText
              v-model="searchQuery"
              placeholder="البحث عن محاضرين..."
              class="w-full"
              @input="handleSearch"
            />
          </span>
        </div>

        <ProgressSpinner v-if="lecturerStore.loading" class="mx-auto my-5" />
        <Message v-else-if="lecturerStore.hasError" severity="error" :text="lecturerStore.error" class="w-full mb-3" />
        <DataTable
        showGridlines
          v-else
          :value="lecturerStore.lecturers"
          stripedRows
          class="w-full"
          responsiveLayout="scroll"
        >
          <Column field="id" header="الرقم التعريفي" class="text-center"></Column>
          <Column header="الاسم" header-class="w-100">

            <template #body="{data}">
              <div class="flex items-center">
                <Avatar :image="data.profilePicture || defaultAvatar" :alt="data.name" class="ml-2" size="normal" />
                <div>
                  <div class="font-semibold">{{ data.name }}</div>
                  <div class="text-sm text-gray-500">{{ data.email }}</div>
                </div>
              </div>
            </template>
          </Column>
          <Column header="نبذة تعريفية" class="justify-center">
            <template #body="{data}">
              <Button
                label="عرض النبذة"
                severity="primary"
                @click="showAboutDialog(data)"
                class="p-button-sm"
              />
            </template>
          </Column>
          <Column field="courseCount" header="الدورات" headerClass="text-center"></Column>
          <Column header="التقييم" headerClass="text-center">
            <template #body="{data}">
              <div class="flex items-center gap-1">
                {{ data.lecutrerRate || 'غير متاح' }}/5
                <Rating :modelValue="data.lecutrerRate || 0" readonly :cancel="false" />
              </div>
            </template>
          </Column>
        </DataTable>

        <!-- Pagination controls -->
        <Paginator
          v-if="lecturerStore.pagination.totalPages > 1"
          :rows="10"
          :totalRecords="lecturerStore.pagination.totalItems"
          :first="(lecturerStore.pagination.currentPage - 1) * 10"
          @page="onPageChange($event)"
          class="mt-5"
        />
      </template>
    </Card>

    <!-- Dialog for showing about information -->
    <Dialog
      v-model:visible="aboutDialogVisible"
      :header="selectedLecturer?.name || 'نبذة تعريفية'"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="p-4">
        <div v-if="selectedLecturer" class="mb-4">
          <div class="flex items-center mb-4">
            <Avatar :image="selectedLecturer.profilePicture || defaultAvatar" :alt="selectedLecturer.name" class="ml-3" size="xlarge" />
            <div>
              <h2 class="text-xl font-bold">{{ selectedLecturer.name }}</h2>
              <p class="text-gray-600">{{ selectedLecturer.email }}</p>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">النبذة التعريفية</h3>
            <p class="whitespace-pre-line">{{ selectedLecturer.about || 'لا توجد معلومات متاحة' }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="إغلاق" @click="aboutDialogVisible = false" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLecturerStore } from '../../stores/lecturerStore';
import { useRoute, useRouter } from 'vue-router';
// PrimeVue components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Avatar from 'primevue/avatar';
import Rating from 'primevue/rating';
import DataTable from 'primevue/datatable';
import Paginator from 'primevue/paginator';
import Dialog from 'primevue/dialog';

const lecturerStore = useLecturerStore();
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const defaultAvatar = 'https://randomuser.me/api/portraits/lego/1.jpg'; // صورة افتراضية احتياطية

// Dialog related refs
const aboutDialogVisible = ref(false);
const selectedLecturer = ref(null);

// تهيئة البيانات
onMounted(async () => {
  // الحصول على رقم الصفحة من الرابط أو استخدام الصفحة الأولى افتراضياً
  const page = route.query.page ? parseInt(route.query.page) : 1;
  const search = route.query.search || '';

  if (search) {
    searchQuery.value = search;
  }

  await lecturerStore.fetchLecturers(page, 10, search);
});

// مراقبة تغييرات الرابط لتحديث البيانات
watch(
  () => route.query,
  async (query) => {
    const page = query.page ? parseInt(query.page) : 1;
    const search = query.search || '';

    if (search !== searchQuery.value) {
      searchQuery.value = search;
    }

    await lecturerStore.fetchLecturers(page, 10, search);
  }
);

// معالجة البحث مع تأخير
let searchTimeout;
function handleSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    updateRouteQuery({ page: 1, search: searchQuery.value });
  }, 500);
}

// تحديث معلمات الرابط
function updateRouteQuery(query) {
  router.push({
    query: {
      ...route.query,
      ...query
    }
  });
}

// Handle PrimeVue paginator event
function onPageChange(event) {
  const page = Math.floor(event.first / event.rows) + 1;
  updateRouteQuery({ page });
}

// Show about dialog
function showAboutDialog(lecturer) {
  selectedLecturer.value = lecturer;
  aboutDialogVisible.value = true;
}

// إضافة محاضر جديد
function addNewLecturer() {
  // سيتم التنفيذ حسب تصميم واجهة المستخدم
  console.log('إضافة محاضر جديد');
}


</script>
