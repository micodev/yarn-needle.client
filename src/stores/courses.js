import { ref } from 'vue';

const courses = ref([]);
const isLoading = ref(false);

async function fetchCourses() {
  isLoading.value = true;
  // Mimic fetch delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  courses.value = [
    {
      id: 1,
      title: "التطريز اليدوي للمبتدئين",
      description: "تعلم أساسيات التطريز اليدوي خطوة بخطوة",
      image: "https://images.unsplash.com/photo-1738230077816-fbab6232c545",
      originalPrice: "299",
      rating: 4.8,
      students: 1234,
      duration: 10,
      level: 'beginner',
      currency: "ريال سعودي",
      lessonCount: 4,
      category: 'drawing',
      type: 'onsite',
    },
    {
      id: 2,
      title: "الخياطة المتقدمة",
      // ...existing code...
      discount: 25,
    },
    {
      id: 3,
      title: "تصميم الأزياء الرقمي",
      // ...existing code...
    },
    {
      id: 4,
      title: "الكروشيه للمحترفين",
      // ...existing code...
    },
    {
      id: 5,
      title: "تصميم الأنماط والنقوش",
      // ...existing code...
    }
  ];
  isLoading.value = false;
}

export function useCoursesStore() {
  return { courses, isLoading, fetchCourses };
}
