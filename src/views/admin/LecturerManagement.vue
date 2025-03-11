<template>
  <div class="p-5 rtl" dir="rtl">
    <h1 class="text-2xl font-bold mb-4">إدارة المحاضرين</h1>
    <Card class="shadow-md">
      <template #content>
        <div class="flex justify-between mb-5">
          <Button
            label="إضافة محاضر جديد"
            icon="pi pi-plus"
            severity="success"
            class="rounded-lg p-1 text-sm h-8"
            @click="addNewLecturer"
          />
          <InputGroup class="w-72">
            <InputGroupAddon>
              <i class="pi pi-search text-gray-500"></i>
            </InputGroupAddon>
            <InputText
              v-model="searchQuery"
              placeholder="البحث عن محاضرين..."
              class="w-full rounded-lg border border-gray-300 p-1 h-8"
              @input="handleSearch"
            />
          </InputGroup>
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
          <Column field="id" header="ت" headerClass="text-center" bodyClass="text-center" style="width: auto;"></Column>

          <!-- Updated profile column using the provided template snippet -->
          <Column header="الصورة" headerClass="text-center">
            <template #body="slotProps">
              <div class="flex justify-center">
                <img
                  v-if="slotProps.data.profilePicture"
                  :src="slotProps.data.profilePicture"
                  class="w-12 h-12 rounded-full object-cover"
                  :alt="slotProps.data.name"
                />
                <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <i class="pi pi-user text-gray-500"></i>
                </div>
              </div>
            </template>
          </Column>

          <Column header="الاسم">
            <template #body="{ data }">
              <div>
                <div class="font-semibold">{{ data.name }}</div>
                <div class="text-sm text-gray-500">{{ data.email }}</div>
              </div>
            </template>
          </Column>
          <Column header="نبذة تعريفية" class="justify-center">
            <template #body="{data}">
              <div class="flex justify-center">
                <Button
                  label="عرض النبذة"
                  severity="primary"
                  @click="showAboutDialog(data)"
                  class="p-button-sm"
                />
              </div>
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
          <!-- New: Upload Image column -->
          <Column header="تحميل صورة" headerClass="text-center">
            <template #body="{ data }">
              <label :for="'upload_' + data.id" class="cursor-pointer">
                <i class="pi pi-upload text-xl"></i>
              </label>
              <input type="file" :id="'upload_' + data.id" style="display:none" @change="handleImageUpload($event, data)" />
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
          <!-- updated profile display to match table -->
          <div class="flex items-center mb-4">
            <div class="flex justify-center">
              <img
                v-if="selectedLecturer.profilePicture"
                :src="selectedLecturer.profilePicture"
                class="w-12 h-12 rounded-full object-cover ml-2"
                :alt="selectedLecturer.name"
              />
              <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <i class="pi pi-user text-gray-500"></i>
              </div>
            </div>
            <!-- increased margin class "ml-5" -->
            <div class="ml-5">
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

    <!-- New Create Lecturer Dialog -->
    <Dialog
      v-model:visible="createLecturerDialogVisible"
      header="إضافة محاضر جديد"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="p-4">
        <div class="mb-3">
          <label class="block mb-1">الاسم</label>
          <InputText v-model="createLecturerData.name" placeholder="الاسم" class="w-full" />
        </div>
        <div class="mb-3">
          <label class="block mb-1">نبذة تعريفية</label>
          <textarea v-model="createLecturerData.about" placeholder="نبذة تعريفية" class="w-full p-inputtext" rows="3"></textarea>
        </div>
        <!-- Email input removed as only Name and About are required -->
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <Button label="إلغاء" severity="secondary" @click="createLecturerDialogVisible = false" />
          <Button label="إضافة" severity="success" @click="submitCreateLecturer" />
        </div>
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
import Rating from 'primevue/rating';
import DataTable from 'primevue/datatable';
import Paginator from 'primevue/paginator';
import Dialog from 'primevue/dialog';
// New imports for InputGroup components:
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const lecturerStore = useLecturerStore();
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');

// Dialog related refs
const aboutDialogVisible = ref(false);
const selectedLecturer = ref(null);

// NEW: Create Lecturer dialog controls and form data updated to only include name and about
const createLecturerDialogVisible = ref(false);
const createLecturerData = ref({ name: '', about: '' });

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

// Modify addNewLecturer to open the create lecturer dialog instead of logging to console
function addNewLecturer() {
  createLecturerDialogVisible.value = true;
}

// New: Submit create lecturer function
async function submitCreateLecturer() {
  const newLecturer = await lecturerStore.createLecturer(createLecturerData.value);
  if (newLecturer) {
    createLecturerDialogVisible.value = false;
    // Reset the form data
    createLecturerData.value = { name: '', about: '' };
  } else {
    console.error("Creation failed.");
  }
}

// New: Handle image upload for a lecturer
async function handleImageUpload(event, lecturer) {
  const file = event.target.files[0];
  if (!file) return;
  const result = await lecturerStore.uploadLecturerImage(lecturer.id, file);
  if(result && result.imageUrl) {
    lecturer.profilePicture = result.imageUrl;
  } else {
    console.error("Image upload failed");
  }
}

</script>

<style>
  .p-datatable-column-title,.p-datatable-column-body {
    width: 100%;
    text-align: center;
  }
  /* New: Ensure the Avatar image displays with proper dimensions */

</style>
