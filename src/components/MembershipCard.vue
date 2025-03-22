<template>
  <div
    :class="[
      'plan-card p-6 rounded-lg shadow-inner flex flex-col justify-between h-full',
      plan.code === 'GOLD' ? 'gold-membership bg-primary-50 dark:bg-gray-800  border-2 border-primary' : 'bg-slate-100 dark:bg-gray-800'
    ]">
    <div>
      <div class="flex items-center mb-4">
        <i :class="[plan.iconClass, plan.code === 'GOLD' ? 'text-primary dark:text-primary-400' : '']" class="text-lg ml-3"></i>
        <h3 :class="['text-2xl font-bold', plan.code === 'GOLD' ? 'text-primary dark:text-primary-300' : 'text-gray-900 dark:text-gray-100']">
          {{ plan.title }}
          <span v-if="plan.code === 'GOLD'" class="text-sm font-normal bg-primary text-white px-2 py-1 rounded-full mr-2">مميز</span>
        </h3>
      </div>
      <ul class="text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
        <li v-for="(point, index) in plan.features" :key="index">{{ point }}</li>
      </ul>
    </div>
    <div class="mt-auto">
      <p :class="['text-lg font-bold mb-4', plan.code === 'GOLD' ? 'text-primary dark:text-primary-300' : 'text-gray-900 dark:text-gray-100']">

        <SARSymbol  :value="plan.price" :showUnit="true" />
      </p>
      <Button
        :label="plan.code === 'GOLD' ? 'إشترك الآن (العضوية المميزة)' : 'إشترك الآن'"
        icon="pi pi-arrow-left"
        :class="['h-10 w-full', plan.code === 'GOLD' ? 'p-button-primary' : '']"
        :severity="plan.code === 'GOLD' ? 'primary' : 'primary'"
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
  }
});

// Define emits
const emit = defineEmits(['subscribe']);

// Handle subscription button click
const subscribe = () => {
  emit('subscribe', props.plan);
};
</script>

<style scoped>
.gold-membership {
  transform: scale(1.05);
  transition: all 0.3s ease;
  box-shadow: 0 0 15px var(--primary-color, rgba(59, 130, 246, 0.5));
}

.gold-membership:hover {
  transform: scale(1.07);
  box-shadow: 0 0 20px var(--primary-color, rgba(59, 130, 246, 0.7));
}
</style>
