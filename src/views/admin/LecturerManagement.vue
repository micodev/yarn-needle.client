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
          v-else
          :value="lecturerStore.lecturers"
          stripedRows
          class="w-full"
          responsiveLayout="scroll"
        >
          <Column field="id" header="الرقم التعريفي"></Column>
          <Column header="الاسم">
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
          <Column field="about" header="نبذة تعريفية"></Column>
          <Column field="courseCount" header="الدورات"></Column>
          <Column header="التقييم">
            <template #body="{data}">
              <div class="flex items-center gap-1">
                {{ data.lecutrerRate || 'غير متاح' }}/5
                <Rating :modelValue="data.lecutrerRate || 0" readonly :cancel="false" />
              </div>
            </template>
          </Column>
          <Column header="الحالة">
            <template #body="{data}">
              <Tag
                :value="data.status === 'active' ? 'نشط' : 'غير نشط'"
                :severity="data.status === 'active' ? 'success' : 'danger'"
              />
            </template>
          </Column>
          <Column header="الإجراءات">
            <template #body="{data}">
              <div class="flex gap-2">
                <Button icon="pi pi-pencil" severity="info" text @click="editLecturer(data)" />
                <Button icon="pi pi-list" text @click="viewCourses(data.id)" />
                <Button icon="pi pi-trash" severity="danger" text @click="deleteLecturer(data.id)" />
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

    <!-- Modal for adding/editing lecturer will be implemented with Dialog component -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLecturerStore } from '../../stores/lecturerStore';
import { useRoute, useRouter } from 'vue-router';
// PrimeVue components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';
import Rating from 'primevue/rating';
import Paginator from 'primevue/paginator';

const lecturerStore = useLecturerStore();
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const defaultAvatar = 'https://randomuser.me/api/portraits/lego/1.jpg'; // صورة افتراضية احتياطية

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

// إضافة محاضر جديد
function addNewLecturer() {
  // سيتم التنفيذ حسب تصميم واجهة المستخدم
  console.log('إضافة محاضر جديد');
}

// تعديل بيانات محاضر
function editLecturer(lecturer) {
  // سيتم التنفيذ حسب تصميم واجهة المستخدم
  console.log('تعديل المحاضر:', lecturer);
}

// عرض دورات محاضر معين
function viewCourses(lecturerId) {
  // الانتقال إلى صفحة الدورات مع تصفية حسب المحاضر
  router.push(`/admin/courses?lecturerId=${lecturerId}`);
}

// حذف محاضر
async function deleteLecturer(lecturerId) {
  if (confirm('هل أنت متأكد من رغبتك في حذف هذا المحاضر؟')) {
    const success = await lecturerStore.deleteLecturer(lecturerId);
    if (success) {
      // إذا كنا في صفحة لم تعد موجودة بعد الحذف، انتقل إلى الصفحة الأخيرة
      if (lecturerStore.lecturers.length === 0 && lecturerStore.pagination.currentPage > 1) {
        updateRouteQuery({ page: lecturerStore.pagination.currentPage - 1 });
      }
    }
  }
}
</script>
