<template>
  <div class="about-section min-h-screen">
    <!-- Hero Section -->
    <div class="hero-section relative py-20 px-4 bg-gradient-to-br from-rose-100 to-teal-50 dark:from-gray-800 dark:to-gray-900">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white opacity-0 transform translate-y-5 animate-[fadeIn_1s_ease-in_forwards]">
          خيط وإبرة
        </h1>
        <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          نحول شغفك بالخياطة إلى مهارة احترافية
        </p>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 px-4 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center transition-transform duration-300 hover:scale-105">
            <i class="pi pi-star text-3xl mb-4 text-rose-500"></i>
            <h3 class="text-xl font-bold mb-3">تعلم احترافي</h3>
            <p class="text-gray-600 dark:text-gray-400">دورات مصممة بعناية من قبل خبراء في مجال الخياطة</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center transition-transform duration-300 hover:scale-105">
            <i class="pi pi-users text-3xl mb-4 text-rose-500"></i>
            <h3 class="text-xl font-bold mb-3">مجتمع داعم</h3>
            <p class="text-gray-600 dark:text-gray-400">تواصل مع متعلمين آخرين وشارك تجاربك</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center transition-transform duration-300 hover:scale-105">
            <i class="pi pi-check-circle text-3xl mb-4 text-rose-500"></i>
            <h3 class="text-xl font-bold mb-3">شهادات معتمدة</h3>
            <p class="text-gray-600 dark:text-gray-400">احصل على شهادات تؤهلك للعمل في مجال الخياطة</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Vision & Mission -->
    <div class="py-16 px-4 bg-slate-50 dark:bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
            <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">رؤيتنا</h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              نسعى لنكون المنصة الرائدة في تعليم الخياطة والتصميم في العالم العربي
            </p>
          </div>
          <div class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
            <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">مهمتنا</h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              تمكين الأفراد من تحقيق أحلامهم في عالم الخياطة من خلال تعليم عالي الجودة
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="py-16 px-4 bg-rose-500 dark:bg-rose-600">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6 text-white">ابدأ رحلتك التعليمية اليوم</h2>
        <div class="space-x-4 rtl:space-x-reverse">
          <Button label="سجل الآن" severity="secondary" raised class="h-12 text-lg" />
          <Button label="تواصل معنا" text severity="secondary" class="h-12 text-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from 'primevue/button';
</script>
