<template>
  <Dialog
    v-model:visible="isVisible"
    :modal="true"
    :header="'تأكيد الشراء'"
    :style="{ width: '500px' }"
    :closable="false"
    position="center"
    class="purchase-dialog"
  >
    <div class="flex flex-column gap-6 p-4">
      <div class="confirmation-message flex items-center justify-end gap-3 bg-gray-50 p-4 rounded-lg">
        <i class="pi pi-shopping-cart text-2xl text-primary"></i>
        <span class="text-lg font-medium text-gray-700">هل تريد المتابعة لإتمام عملية الشراء؟</span>
      </div>

      <div class="note-section bg-white p-4 rounded-lg border border-gray-200">
        <label class="block text-right mb-3 text-gray-700 font-medium">الملاحظات (اختياري)</label>
        <Textarea
          v-model="note"
          rows="3"
          class="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          placeholder="اكتب ملاحظاتك هنا..."
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3 px-4 pb-4">
        <Button
          label="إلغاء"
          icon="pi pi-times"
          @click="handleClose"
          class="p-button-text hover:bg-gray-100"
        />
        <Button
          label="تأكيد الشراء"
          icon="pi pi-check"
          @click="handleConfirm"
          :loading="orderStore.isLoading"
          class="p-button-primary shadow-sm hover:shadow-md transition-shadow duration-200"
          autofocus
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrderStore } from '../stores/orderStore'
import { Dialog, Button,Textarea } from 'primevue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  courseId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'purchase-success'])

const orderStore = useOrderStore()
const note = ref('')

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleClose = () => {
  isVisible.value = false
  note.value = ''
}

const handleConfirm = async () => {
  try {
    await orderStore.createOrder(props.courseId, note.value)
    emit('purchase-success')
    handleClose()
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.confirmation-message {
  font-size: 1.1rem;
}

:deep(.p-dialog-header) {
  direction: rtl;
  @apply bg-gray-50 border-b border-gray-200 px-4 py-3;
}

:deep(.p-dialog-header-text) {
  @apply text-xl font-semibold text-gray-800;
}

:deep(.p-dialog) {
  @apply rounded-xl shadow-lg;
}

:deep(.p-dialog-content) {
  @apply p-0;
}
</style>
