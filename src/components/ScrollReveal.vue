<template>
  <div
    ref="elementRef"
    class="scroll-reveal"
    :class="{ visible: isVisible }"
    :style="{ transitionDelay: `${delay}ms` }"
  >
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
    rootMargin: '50px'
  }
);

onMounted(() => {
  if (elementRef.value) {
    observer.observe(elementRef.value);
  }
});

onUnmounted(() => {
  if (elementRef.value) {
    observer.unobserve(elementRef.value);
  }
  observer.disconnect();
});
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
</style>
