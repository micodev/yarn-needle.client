<template>
  <span class="sar-symbol-wrapper" :class="{'inline-flex': inline, 'line-through': lineThrough}">
    <span v-if="showValue" class="sar-value">{{ value === 0 ? 'مجاني' : value }}</span>
    <svg v-if="value !== 0" class="sar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" :width="size" :height="size">
      <path class="sar-path" d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"/>
      <path class="sar-path" d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"/>
    </svg>
    <span v-if="showUnit && value !== 0" class="sar-unit">{{ unit }}</span>
  </span>
</template>

<script setup>
defineProps({
  value: {
    type: [Number, String],
    default: null
  },
  showValue: {
    type: Boolean,
    default: true
  },
  showUnit: {
    type: Boolean,
    default: false
  },
  unit: {
    type: String,
    default: '/ الشهر'
  },
  size: {
    type: Number,
    default: 16
  },
  inline: {
    type: Boolean,
    default: true
  },
  lineThrough: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.sar-symbol-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: inherit; /* Inherit text decoration from parent */
  position: relative; /* Add position relative for absolute positioning */
}

.sar-icon {
  fill: currentColor;
  vertical-align: middle;
}

.sar-path {
  fill: currentColor;
}

.inline-flex {
  display: inline-flex;
}

.line-through {
  text-decoration: none; /* Remove default line-through */
}

.line-through::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  z-index: 1; /* Ensure the line appears on top */
}
</style>
