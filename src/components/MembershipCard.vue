<template>
  <div
    :class="[
      'plan-card p-6 rounded-lg shadow-inner flex flex-col justify-between h-full',
      IsSpecialMembership ? 'bg-primary-50 dark:bg-gray-800 border-2 border-primary transition-all duration-300 ease-in-out shadow-lg shadow-primary/50 hover:scale-110 hover:shadow-xl hover:shadow-primary/50' : ' border-primary-500 dark:bg-gray-800  hover:scale-105  transition-all duration-300 ease-in-out'
    ]">
    <div>
      <div class="flex items-center mb-4">
        <i :class="[plan.iconClass, IsSpecialMembership ? 'text-primary dark:text-primary-400' : '']" class="text-lg ml-3"></i>
        <h3 :class="['text-2xl font-bold', IsSpecialMembership ? 'text-primary dark:text-primary-300' : 'text-gray-900 dark:text-gray-100']">
          {{ plan.title }}
          <span v-if="IsSpecialMembership" class="text-sm font-normal bg-primary text-white px-2 py-1 rounded-full mr-2">مميز</span>
        </h3>
      </div>
      <ul class="text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
        <li v-for="(point, index) in plan.features" :key="index">{{ point }}</li>
      </ul>
    </div>
    <div class="mt-auto">
      <p :class="['text-lg font-bold mb-4', IsSpecialMembership ? 'text-primary dark:text-primary-300' : 'text-gray-900 dark:text-gray-100']">

        <SARSymbol  :value="plan.price" :showUnit="true" />
      </p>
      <Button
        :label="IsSpecialMembership ? 'إشترك الآن (العضوية المميزة)' : 'إشترك الآن'"
        icon="pi pi-arrow-left"
        :class="['h-10 w-full', IsSpecialMembership ? 'p-button-primary' : '']"
        :severity="IsSpecialMembership ? 'primary' : 'primary'"
        @click="subscribe"
      />
    </div>
  </div>
</template>

<script setup>
import { Button } from "primevue";
import SARSymbol from './SARSymbol.vue';
// Define props
const props = defineProps({
  plan: {
    type: Object,
    required: true
  },
  IsSpecialMembership: {
    type: Boolean,
    default: false
  }
});

// Define emits
const emit = defineEmits(['subscribe']);

// Handle subscription button click
const subscribe = () => {
  emit('subscribe', props.plan);
};
</script>
