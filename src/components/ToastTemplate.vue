<template>
  <div class="card flex justify-center">
    <Toast position="bottom-center" group="bc" @close="onClose">
      <template #message="slotProps">
        <div class="flex flex-col items-start flex-auto">
          <div class="font-bold text-xl">{{ slotProps.message.title }}</div>
          <div class="font-medium my-3">{{ slotProps.message.summary }}</div>
        </div>
      </template>
    </Toast>
  </div>
</template>

<script setup>
import { Toast } from 'primevue';
import { useToast } from 'primevue/usetoast';
import { ref, defineExpose } from 'vue';
const toast = useToast();
const visible = ref(false);

const showTemplate = (severity = 'error', summary = '', title = '') => {
  if (!visible.value) {
    toast.add({
      severity: severity,
      title: title,
      summary: summary,
      group: 'bc',
    });
    visible.value = true;
  }
};

const onClose = () => {
  visible.value = false;
};

// Expose the function to make it accessible from outside
defineExpose({
  showTemplate
});
</script>

<style>
@media (max-width: 768px) {
  /* Make toast smaller on small screens */
  .p-toast.p-component {
    width: 90% !important;
    max-width: 300px !important;
  }


  .p-toast .font-bold.text-xl {
    font-size: 1rem !important;
  }

  .p-toast .font-medium {
    font-size: 0.875rem !important;
  }
}
</style>
