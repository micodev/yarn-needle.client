<template>
  <Toast />
  <Dialog
    v-model:visible="isVisible"
    :modal="true"
    :header="currentStep === 'confirm' ? 'تأكيد الشراء' : 'الدفع'"
    :style="{ width: currentStep === 'payment' ? '100vw' : 'auto' }"
    :closable="false"
    position="center"
    :breakpoints="{ '960px': '100vw' }"
    class="max-w-[100vw] h-screen md:h-auto sm:max-w-[500px] [&_.p-dialog-header]:bg-gray-50 [&_.p-dialog-header]:dark:bg-gray-800 [&_.p-dialog-header]:border-b [&_.p-dialog-header]:border-gray-200 [&_.p-dialog-header]:dark:border-gray-700 [&_.p-dialog-header]:px-4 [&_.p-dialog-header]:py-3 [&_.p-dialog-header]:rtl [&_.p-dialog-header-text]:text-xl [&_.p-dialog-header-text]:font-semibold [&_.p-dialog-header-text]:text-gray-800 [&_.p-dialog-header-text]:dark:text-gray-100 [&_.p-dialog]:rounded-xl [&_.p-dialog]:shadow-lg [&_.p-dialog]:bg-white [&_.p-dialog]:dark:bg-gray-900 [&_.p-dialog-content]:p-0"
  >
    <!-- Confirmation Step -->
    <div v-if="currentStep === 'confirm'" class="flex flex-col gap-6 p-4">
      <div class="flex flex-col sm:flex-row items-center justify-center sm:justify-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <i class="pi pi-shopping-cart text-2xl text-primary dark:text-primary-400"></i>
        <span class="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-200 text-center sm:text-right">
          {{ type === 'course' ? 'هل تريد المتابعة لإتمام عملية الشراء؟' : 'هل تريد المتابعة لإتمام عملية الاشتراك؟' }}
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

    <!-- Payment Step -->
    <div v-else-if="currentStep === 'payment'" class="payment-form p-4">
      <div v-if="orderStore.isLoading" class="text-center py-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-2 text-gray-600">جاري المعالجة...</p>
      </div>

      <div v-if="orderStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        {{ orderStore.error }}
      </div>

      <div v-if="orderStore.redirectUrl" class="mt-4">
        <div class="rounded-lg overflow-hidden shadow-lg">
          <iframe
            :src="orderStore.redirectUrl"
            width="100%"
            height="600"
            frameborder="0"
            class="w-full"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <template #footer>
      <div class="flex justify-end gap-3 px-4 pb-4">
        <Button
          v-if="currentStep === 'confirm'"
          label="إلغاء"
          icon="pi pi-times"
          @click="handleClose"
          class="p-button-text hover:bg-gray-100 dark:hover:bg-gray-700"
        />
        <Button
          v-if="currentStep === 'confirm'"
          label="تأكيد الشراء"
          icon="pi pi-check"
          @click="handleConfirm"
          :loading="orderStore.isLoading"
          class="p-button-primary shadow-sm hover:shadow-md transition-shadow duration-200"
          autofocus
        />
        <Button
          v-if="currentStep === 'payment'"
          label="إغلاق"
          icon="pi pi-times"
          @click="handleClose"
          class="p-button-text hover:bg-gray-100 dark:hover:bg-gray-700"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrderStore } from '../stores/orderStore'
import { Dialog, Button, Textarea, Toast, useToast } from 'primevue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  courseId: {
    type: [String, Number],
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['course', 'membership'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'purchase-success'])

const orderStore = useOrderStore()
const note = ref('')
const currentStep = ref('confirm')

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleClose = () => {
  isVisible.value = false
  note.value = ''
  currentStep.value = 'confirm'
  orderStore.$reset()
}

const toast = useToast()

const handleConfirm = async () => {
  try {
    if (props.type === 'course') {
      await orderStore.createOrder(props.courseId, note.value)
    } else {
      await orderStore.subscribeMembership(props.courseId, note.value)
    }
    currentStep.value = 'payment'
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'خطأ',
      detail: orderStore.error || 'حدث خطأ أثناء معالجة طلبك',
      life: 3000
    })
    console.error(error)
  }
}

// Handle payment success message
window.addEventListener('message', (event) => {
  if (event.origin === 'https://localhost:5034') {
    handleClose()
    emit('purchase-success')
  }
})
</script>
