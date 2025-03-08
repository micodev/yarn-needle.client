<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-5">User Management</h1>
    <div class="bg-white rounded-lg shadow-md p-5 relative">
      <div class="flex gap-3 mb-5">
        <InputText
          v-model="searchQuery"
          placeholder="Search users..."
          class="flex-1"
          type="text"
        />
      </div>

      <ProgressSpinner v-if="userStore.loading" class="flex justify-center my-8" />
      <Message v-else-if="userStore.error" severity="error">{{ userStore.error }}</Message>

      <DataTable
        v-else
        :value="filteredUsers"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        tableClass="min-w-full"
        class="p-datatable-sm"
        emptyMessage="No users found matching your search criteria."
      >
        <Column field="id" header="ID" sortable />
        <Column field="userName" header="Username" sortable />
        <Column header="Profile" style="width: 100px">
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
        <Column header="Full Name" sortable :sortField="getFullName">
          <template #body="slotProps">
            <div class="text-right" dir="rtl">{{ getFullName(slotProps.data) }}</div>
          </template>
        </Column>
        <Column field="email" header="Email" sortable />
        <Column field="phoneNumber" header="Phone">
          <template #body="slotProps">
            {{ slotProps.data.phoneNumber || 'N/A' }}
          </template>
        </Column>
        <Column header="Education">
          <template #body="slotProps">
            <div v-if="slotProps.data.degree" class="text-right" dir="rtl">
              {{ slotProps.data.degree }} - {{ slotProps.data.fieldOfStudy || '' }}
            </div>
            <span v-else>N/A</span>
          </template>
        </Column>
        <Column header="Job Title">
          <template #body="slotProps">
            <div v-if="slotProps.data.jobTitle" class="text-right" dir="rtl">
              {{ slotProps.data.jobTitle }}
            </div>
            <span v-else>N/A</span>
          </template>
        </Column>
        <Column header="Birth Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.birthDate) }}
          </template>
        </Column>
        <Column header="Profile Status">
          <template #body="slotProps">
            <Badge v-if="slotProps.data.hasProfile" value="Completed" severity="success" />
            <Badge v-else value="Incomplete" severity="warning" />
          </template>
        </Column>
        <Column header="Membership">
          <template #body="slotProps">
            <Badge v-if="slotProps.data.hasMembership" value="Active" severity="success" />
            <Badge v-else value="Inactive" severity="secondary" />
          </template>
        </Column>
        <Column header="Courses">
          <template #body="slotProps">
            <Badge v-if="slotProps.data.courseCount" :value="slotProps.data.courseCount" severity="info" />
            <span v-else>0</span>
          </template>
        </Column>
        <Column header="Government ID">
          <template #body="slotProps">
            <span>{{ slotProps.data.governmentId || 'N/A' }}</span>
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button
                icon="pi pi-pencil"
                @click="editUser(slotProps.data)"
                class="p-button-sm p-button-info"
              />
              <Button
                icon="pi pi-trash"
                @click="confirmDeleteUser(slotProps.data)"
                class="p-button-sm p-button-danger"
              />
              <Button
                v-if="slotProps.data.governmentCardFile"
                icon="pi pi-id-card"
                @click="viewGovernmentCard(slotProps.data)"
                class="p-button-sm p-button-secondary"
                tooltip="View ID Card"
              />
            </div>
          </template>
        </Column>
      </DataTable>

      <!-- Delete Confirmation Dialog -->
      <Dialog
        v-model:visible="showDeleteModal"
        header="Confirm Deletion"
        :style="{width: '400px'}"
        :modal="true"
      >
        <div class="p-4">
          <p>Are you sure you want to delete user: {{ selectedUser?.userName }}?</p>
        </div>
        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            @click="cancelDelete"
            class="p-button-text"
          />
          <Button
            label="Delete"
            icon="pi pi-check"
            @click="deleteUser"
            class="p-button-danger"
          />
        </template>
      </Dialog>

      <!-- Government Card Dialog -->
      <Dialog
        v-model:visible="showCardModal"
        header="Government ID Card"
        :style="{width: '600px'}"
        :modal="true"
      >
        <div class="p-4 flex flex-col items-center">
          <img
            v-if="selectedUser?.governmentCardFile"
            :src="selectedUser.governmentCardFile"
            alt="Government ID Card"
            class="max-w-full max-h-96 object-contain"
          />
          <p v-else class="text-red-500">No ID card available</p>
          <p class="mt-3 font-semibold">ID Number: {{ selectedUser?.governmentId || 'N/A' }}</p>
          <p v-if="selectedUser?.note" class="mt-2 text-gray-600">Notes: {{ selectedUser.note }}</p>
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

const userStore = useUserStore();

// State variables
const searchQuery = ref('');
const showDeleteModal = ref(false);
const showCardModal = ref(false);
const selectedUser = ref(null);

// Fetch users on component mount
onMounted(async () => {
  await userStore.fetchUsers();
});

// Computed properties
const filteredUsers = computed(() => {
  return userStore.users.filter(user => {
    const fullName = getFullName(user);
    return user.userName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (user.phoneNumber && user.phoneNumber.includes(searchQuery.value)) ||
      (user.governmentId && user.governmentId.includes(searchQuery.value));
  });
});

// Helper functions
function getFullName(user) {
  const { firstName, secondName, thirdName } = user;
  if (firstName) {
    return [firstName, secondName, thirdName].filter(Boolean).join(' ');
  }
  return 'N/A';
}

function getRoleName(user) {
  if (!user.roleCodeNavigation) return user.roleCode || 'N/A';
  return `${user.roleCodeNavigation.name} (${user.roleCode})`;
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch  {
    return dateString;
  }
}

// Action methods
function editUser(user) {
  // Implement edit logic, e.g., navigate to edit form or open modal
  console.log('Editing user:', user);
}

function confirmDeleteUser(user) {
  selectedUser.value = user;
  showDeleteModal.value = true;
}

function viewGovernmentCard(user) {
  selectedUser.value = user;
  showCardModal.value = true;
}

async function deleteUser() {
  if (!selectedUser.value) return;

  const success = await userStore.deleteUser(selectedUser.value.id);
  if (success) {
    showDeleteModal.value = false;
    selectedUser.value = null;
  }
}

function cancelDelete() {
  showDeleteModal.value = false;
  selectedUser.value = null;
}
</script>
