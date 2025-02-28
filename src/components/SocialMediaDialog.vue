<template>
  <Dialog v-model:visible="dialogVisible" :header="courseData?.title" :modal="true" class="p-fluid">
    <div class="p-4">
      <h3 class="text-xl mb-4">وسائل التواصل</h3>
      <div v-if="courseData?.socials?.length" class="space-y-4">
        <div v-for="social in courseData.socials" :key="social.id"
          class="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <i :class="['las', social.socialIcon, 'text-2xl mr-3']"></i>
          <div>
            <div class="font-semibold">
              {{ getSocialMediaName(social.socialMediaCode) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <template v-if="isNumber(social.value)">
                <a :href="`tel:${social.value}`">{{ social.value }}</a>
              </template>
              <template v-else-if="isLink(social.value)">
                <a :href="social.value" target="_blank" rel="noopener noreferrer">{{ social.value }}</a>
              </template>
              <template v-else>
                {{ social.value }}
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-600 dark:text-gray-400">
        لا توجد وسائل تواصل متاحة
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Dialog } from 'primevue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  courseData: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const dialogVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  dialogVisible.value = newValue;
});

watch(() => dialogVisible.value, (newValue) => {
  emit('update:modelValue', newValue);
});

const getSocialMediaName = (code) => {
  const socialMedia = {
    WA: 'WhatsApp',
    FB: 'Facebook',
    TW: 'Twitter',
    IG: 'Instagram',
    TG: 'Telegram'
  };
  return socialMedia[code] || code;
};

const isNumber = (val) => /^(\+|00)?[0-9]+$/.test(val);
const isLink = (val) => {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
};
</script>
