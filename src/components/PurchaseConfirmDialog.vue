<template>
  <Dialog
    v-model:visible="isVisible"
    :modal="true"
    :header="'تأكيد الشراء'"
    :style="{ width: '500px' }"
    :closable="false"
    position="center"
    class="[&_.p-dialog-header]:bg-gray-50 [&_.p-dialog-header]:border-b [&_.p-dialog-header]:border-gray-200 [&_.p-dialog-header]:px-4 [&_.p-dialog-header]:py-3 [&_.p-dialog-header]:rtl [&_.p-dialog-header-text]:text-xl [&_.p-dialog-header-text]:font-semibold [&_.p-dialog-header-text]:text-gray-800 [&_.p-dialog]:rounded-xl [&_.p-dialog]:shadow-lg [&_.p-dialog-content]:p-0"
  >
    <div class="flex flex-col gap-6 p-4">
      <div class="flex items-center justify-end gap-3 bg-gray-50 p-4 rounded-lg">
        <i class="pi pi-shopping-cart text-2xl text-primary"></i>
        <span class="text-lg font-medium text-gray-700">هل تريد المتابعة لإتمام عملية الشراء؟</span>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200">
        <label class="block text-right mb-3 text-gray-700 font-medium">الملاحظات (اختياري)</label>
        <Textarea
          v-model="note"
          rows="3"
          class="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-base"
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
