<template>
  <div class="org-chart p-8 bg-[var(--p-surface-0)] min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Level 1 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">المشرف العام للمنصة</div>
      </div>

      <!-- Vertical Line -->
      <div class="w-px h-8 bg-blue-600 mx-auto -mt-12 mb-4"></div>

      <!-- Level 2 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">المشرف العام للملتقى</div>
      </div>

      <!-- Vertical Line -->
      <div class="w-px h-8 bg-blue-600 mx-auto -mt-12 mb-4"></div>

      <!-- Level 3 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">قائد الملتقى</div>
      </div>

      <!-- Vertical Line -->
      <div class="w-px h-8 bg-blue-600 mx-auto -mt-12 mb-4"></div>

      <!-- Level 4 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">نائب قائد الملتقى</div>
      </div>

      <!-- Vertical Line and Horizontal Line for Level 5 -->
      <div class="relative">
        <div class="w-px h-8 bg-blue-600 mx-auto -mt-12 mb-4"></div>
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div class="w-[80%] h-px bg-blue-600 mx-auto"></div>
        </div>
      </div>

      <!-- Level 5 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto mt-8">
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
  @apply bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-center min-w-[200px]
         text-lg font-bold transition-transform duration-300 hover:scale-105;
}

.org-chart {
  direction: rtl;
}
</style>
