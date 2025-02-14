<template>
  <Dialog
    v-model:visible="isVisible"
    :modal="true"
    :header="'تأكيد الشراء'"
    :style="{ width: 'auto' }"
    :closable="false"
    position="center"
    class="max-w-[90vw] sm:max-w-[500px] [&_.p-dialog-header]:bg-gray-50 [&_.p-dialog-header]:dark:bg-gray-800 [&_.p-dialog-header]:border-b [&_.p-dialog-header]:border-gray-200 [&_.p-dialog-header]:dark:border-gray-700 [&_.p-dialog-header]:px-4 [&_.p-dialog-header]:py-3 [&_.p-dialog-header]:rtl [&_.p-dialog-header-text]:text-xl [&_.p-dialog-header-text]:font-semibold [&_.p-dialog-header-text]:text-gray-800 [&_.p-dialog-header-text]:dark:text-gray-100 [&_.p-dialog]:rounded-xl [&_.p-dialog]:shadow-lg [&_.p-dialog]:bg-white [&_.p-dialog]:dark:bg-gray-900 [&_.p-dialog-content]:p-0"
  >
    <div class="flex flex-col gap-6 p-4">
      <div class="flex flex-col sm:flex-row items-center justify-center sm:justify-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <i class="pi pi-shopping-cart text-2xl text-primary dark:text-primary-400"></i>
        <span class="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-200 text-center sm:text-right">
          هل تريد المتابعة لإتمام عملية الشراء؟
        </span>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <label class="block text-right mb-3 text-gray-700 dark:text-gray-200 font-medium">
          الملاحظات (اختياري)
        </label>
        <Textarea
          v-model="note"
          rows="3"
          class="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:text-gray-100 text-base"
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
          class="p-button-text hover:bg-gray-100 dark:hover:bg-gray-700"
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
import { Dialog, Button, Textarea } from 'primevue'
import { useRouter } from 'vue-router'

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
const router = useRouter()

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
    const order = await orderStore.createOrder(props.courseId, note.value)
    handleClose()
    router.push(`/payment/${order.id}`)
  } catch (error) {
    console.error(error)
  }
}
</script>
