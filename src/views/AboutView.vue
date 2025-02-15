<template>
  <div class="about-section py-16 px-4 md:px-16 bg-slate-50 dark:bg-gray-900">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">حول خيط وإبرة</h1>

      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">رؤيتنا</h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          نسعى في خيط وإبرة لتمكين الأفراد من تطوير مهاراتهم في مجال الخياطة والتصميم، وخلق فرص تعليمية متميزة تجمع بين التقنية الحديثة والخبرة العملية.
        </p>
      </div>

      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">مهمتنا</h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          توفير منصة تعليمية متكاملة تجمع بين أفضل المدربين والمحتوى التعليمي المميز، لنساعد طلابنا على تحقيق أهدافهم المهنية والإبداعية.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">لماذا نحن؟</h3>
          <ul class="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• خبراء متخصصون في مجال الخياطة</li>
            <li>• دورات عملية وتفاعلية</li>
            <li>• شهادات معتمدة</li>
            <li>• دعم مستمر للمتعلمين</li>
          </ul>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">قيمنا</h3>
          <ul class="text-gray-700 dark:text-gray-300 space-y-2">
            <li>• الجودة والتميز</li>
            <li>• الابتكار المستمر</li>
            <li>• التعلم مدى الحياة</li>
            <li>• خدمة المجتمع</li>
          </ul>
        </div>
      </div>

      <div class="text-center">
        <Button label="تواصل معنا" icon="pi pi-envelope" class="h-10" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from 'primevue/button';
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
