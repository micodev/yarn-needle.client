<template>
  <div class="card flex justify-center">
    <Toast position="bottom-center" group="bc" @close="onClose">
      <template #message="slotProps">
        <div class="flex flex-col items-start flex-auto">
          <div class="flex items-center gap-2">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
            />
            <span class="font-bold">Amy Elsner</span>
          </div>
          <div class="font-medium text-lg my-4">
            {{ slotProps.message.summary }}
          </div>
          <Button
            size="small"
            label="Reply"
            severity="success"
            @click="onReply()"
          ></Button>
        </div>
      </template>
    </Toast>

  </div>
</template>

<script setup>
import { Toast,Avatar,Button } from 'primevue';
import { useToast } from 'primevue/usetoast';
import { ref, defineExpose } from 'vue';
const toast = useToast();
const visible = ref(false);

const showTemplate = (severity = 'error', summary = '') => {
  if (!visible.value) {
    toast.add({
      severity: severity,
      summary: summary,
      group: 'bc',
    });
    visible.value = true;
  }
};

const onReply = () => {
  toast.removeGroup('bc');
  visible.value = false;
};

const onClose = () => {
  visible.value = false;
};

// Expose the function to make it accessible from outside
defineExpose({
  showTemplate
});
</script>
