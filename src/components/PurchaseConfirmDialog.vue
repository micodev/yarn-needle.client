<template>
  <Dialog
    v-model:visible="isVisible"
    :modal="true"
    :header="'تأكيد الشراء'"
    :style="{ width: '450px' }"
    :closable="false"
    position="center"
  >
    <div class="flex flex-column gap-3">
      <div class="confirmation-message text-right">
        <i class="pi pi-shopping-cart ml-2" style="font-size: 1.5rem"></i>
        <span>هل تريد المتابعة لإتمام عملية الشراء؟</span>
      </div>

      <div class="note-section">
        <label class="block text-right mb-2">الملاحظات (اختياري)</label>
        <Textarea
          v-model="note"
          rows="3"
          class="w-full"
          placeholder="اكتب ملاحظاتك هنا..."
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-content-end gap-2">
        <Button
          label="إلغاء"
          icon="pi pi-times"
          @click="handleClose"
          class="p-button-text"
        />
        <Button
          label="تأكيد الشراء"
          icon="pi pi-check"
          @click="handleConfirm"
          :loading="orderStore.isLoading"
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
}
</style>
