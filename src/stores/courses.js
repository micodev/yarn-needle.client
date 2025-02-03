import { ref } from 'vue';

const courses = ref([]);
const isLoading = ref(false);

async function fetchCourses() {
  isLoading.value = true;
  // Mimic fetch delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  courses.value = [
    // ...same data as in CoursesView.vue, e.g. { id:1, title:'...', ... }
  ];
  isLoading.value = false;
}

export function useCoursesStore() {
  return { courses, isLoading, fetchCourses };
}
