import { ref } from 'vue';

const courses = ref([]);
const isLoading = ref(false);

async function fetchCourses() {
  isLoading.value = true;
  // Mimic fetch delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  const generatedCourses = [
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
      id: 6,
      title: "تصاميم الأزياء المعاصرة",
      description: "أساليب مبتكرة لتطوير مهارات تصميم الأزياء",
      image: "https://images.unsplash.com/photo-1575936123452-5451252c0fdf",
      originalPrice: "499",
      rating: 4.6,
      students: 765,
      duration: 12,
      level: 'intermediate',
      currency: "ريال سعودي",
      lessonCount: 6,
      category: 'design',
      type: 'online',
      discount: 10,
    },
    {
      id: 7,
      title: "فن حياكة الدانتيل",
      description: "تعلم الأنماط المعقدة والراقية في حياكة الدانتيل",
      image: "https://images.unsplash.com/photo-1542156822-6924c91bd78c",
      originalPrice: "350",
      rating: 4.9,
      students: 412,
      duration: 9,
      level: 'advanced',
      currency: "ريال سعودي",
      lessonCount: 5,
      category: 'needlework',
      type: 'onsite',
    }
  ];
  const dynamicCourses = [];
  for (const course of [generatedCourses]) {
    dynamicCourses.push(course);
  }
  courses.value = dynamicCourses;
  isLoading.value = false;
}

export function useCoursesStore() {
  return { courses, isLoading, fetchCourses };
}
