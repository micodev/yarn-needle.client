<template>
  <div class="org-chart p-4 sm:p-8 bg-[var(--p-surface-100)] min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Level 1 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">المشرف العام للمنصة</div>
      </div>

      <!-- Arrow -->
      <div class="arrow-container">
        <div class="arrow-down"></div>
      </div>

      <!-- Level 2 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">المشرف العام للملتقى</div>
      </div>

      <!-- Arrow -->
      <div class="arrow-container">
        <div class="arrow-down"></div>
      </div>

      <!-- Level 3 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">قائد الملتقى</div>
      </div>

      <!-- Arrow -->
      <div class="arrow-container">
        <div class="arrow-down"></div>
      </div>

      <!-- Level 4 -->
      <div class="flex justify-center mb-16">
        <div class="chart-box">نائب قائد الملتقى</div>
      </div>

      <!-- Arrow down and horizontal arrows for Level 5 -->
      <div class="relative">
        <div class="arrow-container">
          <div class="arrow-down"></div>
        </div>
        <div class="arrow-horizontal-container">
          <div class="arrow-horizontal"></div>
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

.arrow-container {
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -0.5rem auto 0.75rem;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid var(--p-primary-color);
  position: relative;
}

.arrow-down::before {
  content: '';
  position: absolute;
  top: -25px;
  left: -2px;
  width: 4px;
  height: 20px;
  background-color: var(--p-primary-color);
}

.arrow-horizontal-container {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 4px;
  margin: 0 auto;
}

.arrow-horizontal {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: var(--p-primary-color);
}

.arrow-horizontal::after {
  content: '';
  position: absolute;
  right: -10px;
  top: -8px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid var(--p-primary-color);
}

.arrow-horizontal::before {
  content: '';
  position: absolute;
  left: -10px;
  top: -8px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 15px solid var(--p-primary-color);
}

/* Remove the old connector-line styles */
.connector-line {
  display: none;
}

@media (min-width: 640px) {
  .arrow-container {
    height: 2.5rem;
    margin: -0.75rem auto 1rem;
  }

  .arrow-down {
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 18px solid var(--p-primary-color);
  }

  .arrow-down::before {
    top: -30px;
    height: 25px;
  }
}

.org-chart {
  direction: rtl;
  overflow-x: hidden;
}
</style>
