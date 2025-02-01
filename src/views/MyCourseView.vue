<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Banner Section -->
    <div class="relative h-[150px] sm:h-[200px] w-full">
      <img src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&h=300&fit=crop" alt="Banner" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white p-6 max-w-2xl">
          <h1 class="text-3xl font-bold mb-2">دوراتي</h1>
          <p class="text-lg">تابع تقدمك في الدورات المسجلة</p>
        </div>
      </div>
    </div>

    <!-- Course Cards Grid -->
    <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div v-if="myCourses.length > 0"
           class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="course in myCourses" :key="course.id"
             class="card p-0 rounded-lg shadow-md relative flex flex-col bg-white dark:bg-gray-800">
          <div class="relative aspect-video">
            <img :src="course.image" :alt="course.title"
                 class="w-full h-full object-cover rounded-t-lg"
                 loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 via-100% to-surface-0 to-80% opacity-100 dark:via-gray-100/[0.2] dark:to-gray-800">
            </div>
          </div>

          <div class="p-3 sm:p-4 flex flex-col flex-grow">
            <h3 class="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{{ course.title }}</h3>
            <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-4">{{ course.description }}</p>

            <div class="mt-auto">
              <div class="flex justify-between items-center mb-3 text-xs sm:text-sm">
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ course.completedLessons }}/{{ course.totalLessons }} درس</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ course.duration }} ساعات</span>
              </div>
              <div class="flex gap-2 flex-col sm:flex-row">
                <Button label="عرض التفاصيل" icon="pi pi-eye" class="w-full sm:flex-1" severity="primary" />
                <Button label="معلومات إضافية" icon="pi pi-info-circle" class="w-full sm:flex-1" severity="secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Courses Message -->
      <div v-else class="flex flex-col items-center justify-center py-8 sm:py-16 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <i class="pi pi-book text-4xl mb-4 text-gray-400"></i>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">لا توجد دورات</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4">
          لم يتم العثور على أي دورات مسجلة
        </p>
        <Button
          label="استكشف الدورات"
          icon="pi pi-search"
          @click="$router.push('/courses')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from 'primevue';

const generateCourses = (count) => {
  const courses = [];
  const titles = [
    "الجوانب الأربع لجودة الحياة",
    "التطريز اليدوي للمبتدئين",
    "أساسيات الخياطة",
    "فن النسيج التقليدي",
    "تصميم الأزياء المعاصرة"
  ];
  const descriptions = [
    "تعلم كيفية تحسين جودة حياتك من خلال فهم الجوانب الأربعة الرئيسية",
    "تعلم أساسيات التطريز اليدوي خطوة بخطوة",
    "دورة شاملة في أساسيات الخياطة",
    "اكتشف فنون النسيج التقليدي",
    "تعلم أحدث تقنيات تصميم الأزياء"
  ];
  const instructors = ["عبدالله الخليفة", "سارة أحمد", "نورة السعيد", "محمد العلي", "فاطمة الزهراء"];
  const images = [
    "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=500&h=300&fit=crop"
  ];

  for (let i = 0; i < count; i++) {
    courses.push({
      id: i + 1,
      title: titles[i % titles.length],
      description: descriptions[i % descriptions.length],
      image: images[i % images.length], // Use real images instead of placehold.co
      completedLessons: Math.floor(Math.random() * 15) + 1,
      totalLessons: 15,
      duration: Math.floor(Math.random() * 8) + 2,
      instructor: instructors[i % instructors.length],
    });
  }
  return courses;
};

const myCourses = ref(generateCourses(10)); // Generate 6 courses initially


</script>

<style scoped>
.card {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 100%;
}

.card:hover {
  transform: translateY(-5px);
}

@media (max-width: 640px) {
  .card:hover {
    transform: none;
  }

  .aspect-video {
    aspect-ratio: 16 / 9;
  }
}
</style>
