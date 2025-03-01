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
        <Dropdown
          v-model="filterRole"
          :options="roleOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All Roles"
          class="w-48"
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
        <Column header="Full Name" sortable :sortField="getFullName">
          <template #body="slotProps">
            {{ getFullName(slotProps.data) }}
          </template>
        </Column>
        <Column field="email" header="Email" sortable />
        <Column header="Role" sortable :sortField="getRoleName">
          <template #body="slotProps">
            {{ getRoleName(slotProps.data) }}
          </template>
        </Column>
        <Column header="Membership">
          <template #body="slotProps">
            {{ getActiveMembership(slotProps.data) }}
          </template>
        </Column>
        <Column header="Created At" sortable :sortField="formatDate">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.createdAt) }}
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
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';

// Initialize the store
const userStore = useUserStore();

// State variables
const searchQuery = ref('');
const filterRole = ref('');
const showDeleteModal = ref(false);
const selectedUser = ref(null);

// Role filter options
const roleOptions = [
  { label: 'All Roles', value: '' },
  { label: 'Admin', value: 'M' },
  { label: 'User', value: 'U' },
  { label: 'Lecturer', value: 'L' }
];

// Fetch users on component mount
onMounted(async () => {
  await userStore.fetchUsers();
});

// Computed properties
const filteredUsers = computed(() => {
  return userStore.users.filter(user => {
    const fullName = getFullName(user);
    const matchesSearch =
      user.userName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      fullName.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesRole = filterRole.value === '' || user.roleCode === filterRole.value;

    return matchesSearch && matchesRole;
  });
});

// Helper functions
function getFullName(user) {
  if (!user.hasProfile || !user.profile) return 'N/A';

  const { firstName, secondName, thirdName } = user.profile;
  return [firstName, secondName, thirdName].filter(Boolean).join(' ');
}

function getRoleName(user) {
  if (!user.roleCodeNavigation) return user.roleCode || 'N/A';
  return `${user.roleCodeNavigation.name} (${user.roleCode})`;
}

function getActiveMembership(user) {
  if (!user.membershipUsers || user.membershipUsers.length === 0) return 'None';

  const activeMembership = user.membershipUsers.find(m => m.stateCode === 'ACTIVE');
  if (activeMembership) {
    return activeMembership.membershipCodeNavigation?.name || activeMembership.membershipCode;
  }

  return 'None';
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
