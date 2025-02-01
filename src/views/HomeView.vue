<template>
  <div class="hero-section flex flex-col md:flex-row items-center py-16 px-4 md:px-16 bg-slate-50 dark:bg-gray-900">
    <div class="md:w-1/2 p-4">
      <img src="https://placehold.co/600x400" alt="Illustrative placeholder" class="w-full" />
    </div>
    <div class="text-center md:text-right md:w-1/2 p-4">
      <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">منصة خيط وإبرة <span class="block mt-1">حيث
          تبدأ مهاراتك في الازدهار</span></h1>
      <p class="text-xl mb-6 text-gray-700 dark:text-gray-300">اكتشف الدورات المتنوعة وابدأ رحلتك التعليمية معنا</p>
      <div class="flex justify-center md:justify-end gap-1">
        <Button label="استكشف جميع الدورات" class="h-10 mb-6 flex-auto" />
        <Button label="حول خيط وإبرة" severity="secondary" class="h-10 mb-6 flex px-5" />
      </div>
    </div>
  </div>
  <div class="features-section py-1 px-4 md:px-16 bg-slate-50 dark:bg-gray-900">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="feature text-center p-4">
        <i class="pi pi-search text-4xl mb-4 text-primary"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">اكتشف</h3>
        <p class="text-gray-700 dark:text-gray-300">استكشف مجموعة متنوعة من الدورات والتخصصات.</p>
      </div>
      <div class="feature text-center p-4">
        <i class="pi pi-check-circle text-4xl mb-4 text-primary"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">تحقق</h3>
        <p class="text-gray-700 dark:text-gray-300">تحقق من مهاراتك من خلال التقييمات.</p>
      </div>
      <div class="feature text-center p-4">
        <i class="pi pi-book text-4xl mb-4 text-primary"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">تعلّم</h3>
        <p class="text-gray-700 dark:text-gray-300">اكتسب المهارات مع المدربين المؤهلين.</p>
      </div>
      <div class="feature text-center p-4">
        <i class="pi pi-thumbs-up-fill text-4xl mb-4 text-primary"></i>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">احصل على الشهادة</h3>
        <p class="text-gray-700 dark:text-gray-300">احصل على الشهادات لتعزيز مسيرتك المهنية.</p>
      </div>
    </div>
  </div>
  <div class="latest-courses-section py-16 px-4 md:px-16 bg-slate-50 dark:bg-gray-900">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">أحدث الدورات التدريبية</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">دورات مصممة لتطوير مهاراتك في مجالات متعددة</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
      <div v-for="(course, index) in paddedCourses" :key="course.title"
        :class="['card p-0 rounded-lg shadow-md relative flex flex-col self-start h-full', 'bg-slate-50 dark:bg-gray-800' ]">
        <div class="relative">
          <img :src="course.image" alt="Course Image" class="w-full rounded" />
          <!-- gradient-->
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.5] via-20% to-surface-0 to-70% opacity-100 dark:via-gray-100/[0.2] dark:to-gray-800">
          </div>
          <div
            class="relative w-full flex flex-col justify-center items-center rounded-md p-2">
            <p class="text-xl font-bold mb-2 text-right text-gray-900 dark:text-gray-100">{{ course.title }}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">{{ course.description }}</p>
          </div>
          <div class="absolute top-2 px-2 w-full">
            <!-- flex-row space between items -->
            <div class="flex justify-between">
              <Button icon="pi pi-heart" severity="primary" variant="text" />
              <span v-if="course.discount"
                class="text-green-500 font-bold text-center content-center rounded-md px-2 bg-green-100 bg-opacity-50 dark:bg-green-900">{{
                  course.discount }}%</span>
            </div>
          </div>
        </div>
        <div class="flex justify-between p-4 flex-col mt-auto">
          <div class="flex flex-row justify-center mb-2">
            <p class=" text-black dark:text-white font-bold text-base align-middle ml-2" v-if="course.discount">{{ course.discountedPrice }} ريال سعودي</p>
            <p class=" text-black dark:text-white font-bold text-base" v-if="!course.discount">{{ course.originalPrice }} ريال سعودي</p>
            <p class="text-gray-500 dark:text-gray-400 line-through ml-2 content-center text-xs" v-if="course.discount">{{ course.originalPrice }} ريال سعودي</p>
          </div>
          <div class="flex flex-row gap-1">
            <Button label="شراء" class="h-8 flex-1" :severity="index == 1?'contrast':'primary'" />
            <Button label="تفاصيل" class="h-8 flex-1" severity="secondary" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">إشتراكات العضوية</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">إشترك بعضويتك الآن وأحصل على وصول غير محدود</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
      <div v-for="plan in plans" :key="plan.title"
        class="plan-card p-6 rounded-lg shadow-md shadow-inner bg-slate-100 dark:bg-gray-800 flex flex-col justify-between h-full">
        <div>
          <div class="flex items-center mb-4">
            <i :class="plan.iconClass" class="text-lg ml-3"></i>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ plan.title }}</h3>
          </div>
          <ul class="text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
            <li v-for="(point, index) in plan.description" :key="index">{{ point }}</li>
          </ul>
        </div>
        <div class="mt-auto">
          <p class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{{ plan.price }} ريال سعودي / الشهر</p>
          <Button label="إشترك الآن" icon="pi pi-arrow-left" class="h-10 w-full" />
        </div>
      </div>
    </div>
  </div>

  <!-- New Content Section -->


</template>

<script setup>
import { ref, computed } from "vue";
import { Button } from "primevue";

const courses = ref([
  {
    title: "دورة المونتاج المتقدم",
    description: "تعلم أدوات و تقنيات تعلم أدوات و تقنيات  تعلم أدوات و تقنيات تعلم أدوات و تقنيات تعلم أدوات و تقنيات تعلم أدوات و تقنيات المونتاج الحديثة",
    image: "https://placehold.co/300x200",
    originalPrice: "200",
    currency: "ريال سعودي"
  },
  {
    title: "دورة التصوير الفوتوغرافي",
    description: "اكتشف أسرار التصوير باحترافية",
    image: "https://placehold.co/300x200",
    originalPrice: "150",
    discountedPrice: "105",
    discount: 30,
    currency: "ريال سعودي"
  },
  {
    title: "دورة كتابة المحتوى",
    description: "تعلم كتابة المحتوى بشكل احترافي",
    image: "https://placehold.co/300x200",
    originalPrice: "100",
    discountedPrice: "70",
    discount: 30,
    currency: "ريال سعودي"
  }
]);

const longestDescriptionLength = computed(() => {
  return Math.max(...courses.value.map(course => course.description.length));
});

const paddedCourses = computed(() => {
  return courses.value.map(course => {
    const paddingLength = longestDescriptionLength.value - course.description.length;
    return {
      ...course,
      description: course.description + ' '.repeat(paddingLength)
    };
  });
});

const plans = ref([
  {
    title: "العضوية التجريبية",
    description: [
      "تقدم فترة تجريبية مجانية أو بخصم كبير لجذب العملاء الجدد.",
      "تشجيعهم على تجربة الخدمة.",
      "تسليط الضوء على الميزات الأساسية خلال هذه الفترة."
    ],
    price: "0",
    iconClass: "pi pi-user text-gray-500"
  },
  {
    title: "العضوية الفضية",
    description: [
      "هي الخطوة التالية بعد التجربة.",
      "تقدم ميزات أساسية بأسعار معقولة.",
      "التركيز على قيمة مقابل المال."
    ],
    price: "50",
    iconClass: "pi pi-star text-gray-500"
  },
  {
    title: "العضوية الذهبية",
    description: [
      "تقدم مجموعة أوسع من الميزات مقارنة بالعضوية الفضية.",
      "تناسب المستخدمين الذين يحتاجون إلى المزيد من الميزات والمرونة.",
      "التركيز على الميزات المميزة."
    ],
    price: "100",
    iconClass: "pi pi-star text-yellow-600"
  },
  {
    title: "العضوية البلاتينية",
    description: [
      "هي الخطة الأكثر شمولاً.",
      "تقدم أعلى مستوى من الميزات والخدمات.",
      "تسليط الضوء على الميزات الحصرية مثل الدعم المخصص أو الوصول إلى ميزات إضافية."
    ],
    price: "200",
    iconClass: "pi pi-star text-blue-500"
  }
]);
</script>
