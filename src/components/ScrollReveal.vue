<template>
  <div ref="elementRef" class="scroll-reveal" :class="{ visible: isVisible }">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const elementRef = ref(null);
const isVisible = ref(false);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

onMounted(() => {
  if (elementRef.value) {
    observer.observe(elementRef.value);
  }
});

onUnmounted(() => {
  observer.disconnect();
});
</script>
