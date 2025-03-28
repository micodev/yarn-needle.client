<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-5">إدارة المستخدمين</h1>
    <div class=" rounded-lg shadow-md p-5 relative">
      <div class="flex gap-3 mb-5">
        <InputText
          v-model="searchQuery"
          placeholder="ابحث عن المستخدمين..."
          class="flex-1"
          type="text"
        />
      </div>

      <ProgressSpinner v-if="userStore.loading" class="flex justify-center my-8" />
      <Message v-else-if="userStore.error" severity="error">{{ userStore.error }}</Message>

      <DataTable
        v-else
        :value="filteredUsers"
        lazy
        @page="handlePageChange"
        :totalRecords="totalRecords"
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        tableClass="min-w-full"
        class="p-datatable-sm"
        emptyMessage="لم يتم العثور على مستخدمين يطابقون معايير البحث."
      >
        <Column header="الملف" style="width: 100px">
          <template #body="slotProps">
            <div class="flex justify-center">
              <img
                v-if="slotProps.data.profileImage"
                :src="slotProps.data.profileImage"
                class="w-12 h-12 rounded-full object-cover"
                :alt="getFullName(slotProps.data)"
              />
              <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <i class="pi pi-user text-gray-500"></i>
              </div>
            </div>
          </template>
        </Column>
        <Column header="الاسم الكامل" sortable :sortField="getFullName">
          <template #body="slotProps">
            <div class="text-right" dir="rtl">{{ getFullName(slotProps.data) }}</div>
          </template>
        </Column>
        <Column field="phoneNumber" header="الهاتف">
          <template #body="slotProps">
            {{ slotProps.data.phoneNumber || 'غير متاح' }}
          </template>
        </Column>
        <Column header="التعليم">
          <template #body="slotProps">
            <div v-if="slotProps.data.degree" class="text-right" dir="rtl">
              {{ slotProps.data.degree }} - {{ slotProps.data.fieldOfStudy || '' }}
            </div>
            <span v-else>غير متاح</span>
          </template>
        </Column>
        <Column header="الوظيفة">
          <template #body="slotProps">
            <div v-if="slotProps.data.jobTitle" class="text-right" dir="rtl">
              {{ slotProps.data.jobTitle }}
            </div>
            <span v-else>غير متاح</span>
          </template>
        </Column>
        <Column header="تاريخ الميلاد">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.birthDate) }}
          </template>
        </Column>
        <Column header="ملاحظة">
          <template #body="slotProps">
            <div v-if="slotProps.data.note">
              <Button icon="pi pi-eye" class="p-button-text" @click="viewNote(slotProps.data.note)" tooltip="عرض الملاحظة" />
            </div>
            <span v-else>غير متاح</span>
          </template>
        </Column>
        <Column header="حالة الملف">
          <template #body="slotProps">
            <Badge v-if="slotProps.data.hasProfile" value="مكتمل" severity="success" />
            <Badge v-else value="غير مكتمل" severity="warning" />
          </template>
        </Column>
        <Column header="العضوية">
          <template #body="slotProps">
            <Badge v-if="slotProps.data.hasMembership" value="نشط" severity="success" />
            <Badge v-else value="غير نشط" severity="secondary" />
          </template>
        </Column>
        <!-- Suspended Column with toggle switch -->
        <Column header="معلق">
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <ToggleSwitch
                v-model="slotProps.data.isSuspended"
                @change="handleToggleSuspended(slotProps)"
                :disabled="userStore.isSuspendedLoading"
              />
              <ProgressSpinner v-if="userStore.isSuspendedLoading" class="w-6 h-6" />
            </div>
          </template>
        </Column>
        <Column header="الدورات">
          <template #body="slotProps">
            <Badge v-if="slotProps.data.courseCount" :value="slotProps.data.courseCount" severity="info" />
            <span v-else>0</span>
          </template>
        </Column>
        <Column header="الهوية الحكومية">
          <template #body="slotProps">
            <span>{{ slotProps.data.governmentId || 'غير متاح' }}</span>
          </template>
        </Column>
        <Column header="الإجراءات">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button
                :disabled="!slotProps.data.governmentCardFile"
                icon="pi pi-id-card"
                @click="viewGovernmentCard(slotProps.data)"
                class="p-button-sm p-button-secondary"
                tooltip="عرض بطاقة الهوية"
              />
            </div>
          </template>
        </Column>
      </DataTable>

      <!-- Government Card Dialog -->
      <Dialog
        v-model:visible="showCardModal"
        header="بطاقة الهوية الحكومية"
        :style="{width: '600px'}"
        :modal="true"
      >
        <div class="p-4 flex flex-col items-center">
          <img
            v-if="selectedUser?.governmentCardFile"
            :src="selectedUser.governmentCardFile"
            alt="بطاقة الهوية الحكومية"
            class="max-w-full max-h-96 object-contain"
          />
          <p v-else class="text-red-500">لا تتوفر بطاقة الهوية</p>
          <p class="mt-3 font-semibold">رقم الهوية: {{ selectedUser?.governmentId || 'غير متاح' }}</p>
          <p v-if="selectedUser?.note" class="mt-2 text-gray-600">ملاحظات: {{ selectedUser.note }}</p>
        </div>
      </Dialog>
      <!-- New Note Dialog -->
      <Dialog
        v-model:visible="showNoteModal"
        header="الملاحظة"
        :style="{width: '400px'}"
        :modal="true"
      >
        <div class="p-4">
          <p>{{ selectedNote }}</p>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../../stores/userStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Badge from 'primevue/badge';
import ToggleSwitch from 'primevue/toggleswitch';

const userStore = useUserStore();

// State variables
const searchQuery = ref('');
const showCardModal = ref(false);
const selectedUser = ref(null);

// NEW reactive state for note dialog
const showNoteModal = ref(false);
const selectedNote = ref('');

// Fetch users on component mount
onMounted(async () => {
  await userStore.fetchUsers();
});

// Computed properties
const filteredUsers = computed(() => {
  return userStore.users.filter(user => {
    const fullName = getFullName(user);
    return fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (user.phoneNumber && user.phoneNumber.includes(searchQuery.value)) ||
      (user.governmentId && user.governmentId.includes(searchQuery.value)) ||
      (user.note && user.note.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });
});

// Add computed property for total records based on pagination data
const totalRecords = computed(() => userStore.pagination.totalPages * userStore.pagination.limit);

// New page handler that updates the current page and fetches users.
async function handlePageChange(event) {
  // event.page is 0-indexed; convert it to 1-indexed.
  userStore.pagination.currentPage = event.page + 1;
  await userStore.fetchUsers(false);
}

// Helper functions
function getFullName(user) {
  const { firstName, secondName, thirdName } = user;
  if (firstName) {
    return [firstName, secondName, thirdName].filter(Boolean).join(' ');
  }
  return 'غير متاح';
}


function formatDate(dateString) {
  if (!dateString) return 'غير متاح';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch  {
    return dateString;
  }
}

// Action method for viewing government card
function viewGovernmentCard(user) {
  selectedUser.value = user;
  showCardModal.value = true;
}

// NEW handler for displaying the note dialog.
function viewNote(note) {
  selectedNote.value = note;
  showNoteModal.value = true;
}

// New handler to replace the inline arrow function:
async function handleToggleSuspended(slotProps) {
  await userStore.changeSuspendedAction(slotProps.data.id, slotProps.data.isSuspended);
}
</script>
