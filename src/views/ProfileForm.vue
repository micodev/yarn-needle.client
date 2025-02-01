<style scoped>
.card {
  background-color: var(--p-surface-0);
  border: 1px solid var(--p-content-border-color);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

:deep(.text-gray-900) {
  color: var(--p-text-color);
}

:deep(.text-gray-700) {
  color: var(--p-text-muted-color);
}

:deep(.border-gray-200) {
  border-color: var(--p-content-border-color);
}

:deep(.dark\:bg-gray-800) {
  background-color: var(--p-surface-800);
}
</style>
