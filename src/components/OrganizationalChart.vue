<template>
  <div class="org-chart p-4 sm:p-8 bg-[var(--p-card-background)] min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Level 1 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">المشرف العام للمنصة</div>
      </div>

      <!-- Vertical Line -->
      <div class="connector-line vertical"></div>

      <!-- Level 2 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">المشرف العام للملتقى</div>
      </div>

      <!-- Vertical Line -->
      <div class="connector-line vertical"></div>

      <!-- Level 3 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">قائد الملتقى</div>
      </div>

      <!-- Vertical Line -->
      <div class="connector-line vertical"></div>

      <!-- Level 4 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">نائب قائد الملتقى</div>
      </div>

      <!-- Vertical Line and Horizontal Line for Level 5 -->
      <div class="relative">
        <div class="connector-line vertical"></div>
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div class="connector-line horizontal"></div>
        </div>
      </div>

      <!-- Level 5 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 justify-items-center max-w-6xl mx-auto mt-8">
        <div class="chart-box">مشرف موهبة</div>
        <div class="chart-box">مشرف معد</div>
        <div class="chart-box">مشرف مقدم</div>
        <div class="chart-box">مشرف إحصاء</div>
        <div class="chart-box">مبادر</div>
        <div class="chart-box">مدرب موهبة</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-box {
  background-color: var(--p-primary-color);
  color: var(--p-button-text-primary-color);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  text-align: center;
  min-width: 150px;
  max-width: 100%;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  margin: 0.5rem;
}

@media (min-width: 640px) {
  .chart-box {
    min-width: 200px;
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }
}

.chart-box:hover {
  background-color: var(--p-primary-hover-color);
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.connector-line {
  background-color: var(--p-primary-color);
  position: relative;
  border-radius: 999px;
}

.connector-line.vertical {
  width: 3px;
  height: 1.5rem;
  margin: -0.5rem auto 0.75rem;
}

@media (min-width: 640px) {
  .connector-line.vertical {
    height: 2rem;
    margin: -0.75rem auto 1rem;
  }
}

.connector-line.horizontal {
  width: 90%;
  height: 3px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .connector-line.horizontal {
    width: 80%;
  }
}

.org-chart {
  direction: rtl;
  overflow-x: hidden;
}
</style>
