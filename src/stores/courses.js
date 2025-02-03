import { ref } from 'vue';

const courses = ref([]);
const isLoading = ref(false);

function* generateCourses(count) {
  for (let i = 0; i < count; i++) {
    yield {
      id: i + 1,
      title: `Course ${i + 1}: ${
        i === 0 ? "التطريز اليدوي للمبتدئين" :
        i === 1 ? "تصاميم الأزياء المعاصرة" :
        i === 2 ? "فن حياكة الدانتيل" : `Custom Course ${i + 1}`
      }`,
      description: i === 0 ? "تعلم أساسيات التطريز اليدوي خطوة بخطوة" :
                   i === 1 ? "أساليب مبتكرة لتطوير مهارات تصميم الأزياء" :
                   i === 2 ? "تعلم الأنماط المعقدة والراقية في حياكة الدانتيل" :
                   `Description for custom course ${i + 1}`,
      image: i === 0 ? "https://images.unsplash.com/photo-1738230077816-fbab6232c545" :
             i === 1 ? "https://images.unsplash.com/photo-1575936123452-5451252c0fdf" :
             i === 2 ? "https://images.unsplash.com/photo-1542156822-6924c91bd78c" :
             "https://via.placeholder.com/150",
      originalPrice: i === 0 ? "299" : i === 1 ? "499" : i === 2 ? "350" : "100",
      rating: i === 0 ? 4.8 : i === 1 ? 4.6 : i === 2 ? 4.9 : 4.5,
      students: i === 0 ? 1234 : i === 1 ? 765 : i === 2 ? 412 : 100,
      duration: i === 0 ? 10 : i === 1 ? 12 : i === 2 ? 9 : 8,
      level: i === 0 ? 'beginner' : i === 1 ? 'intermediate' : i === 2 ? 'advanced' : 'beginner',
      currency: "ريال سعودي",
      lessonCount: i === 0 ? 4 : i === 1 ? 6 : i === 2 ? 5 : 4,
      category: i === 0 ? 'drawing' : i === 1 ? 'design' : i === 2 ? 'needlework' : 'general',
      type: i === 1 ? 'online' : 'onsite',
      ...(i === 1 && { discount: 10 })
    };
  }
}

async function fetchCourses() {
  isLoading.value = true;
  // Mimic fetch delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  const itemCount = 10; // Customize desired items length here
  courses.value = [];
  for (const course of generateCourses(itemCount)) {
    courses.value.push(course);
  }
  isLoading.value = false;
}

export function useCoursesStore() {
  return { courses, isLoading, fetchCourses };
}
