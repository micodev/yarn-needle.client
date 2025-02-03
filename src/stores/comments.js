import { ref, computed } from 'vue';
import { useCourseStore } from '@/stores/course';

const courseStore = useCourseStore();
const course = computed(() => courseStore.course);

export const newComment = ref({
  rating: 0,
  text: ""
});

export const displayedComments = ref(course.value.comments.slice(0, 2));
export const showMoreButton = ref(course.value.comments.length > 2);

export function addComment() {
  if (newComment.value.rating && newComment.value.text) {
    courseStore.addComment({
      rating: newComment.value.rating,
      text: newComment.value.text
    });
    newComment.value.rating = 0;
    newComment.value.text = "";
    updateDisplayedComments();
  }
}

export function showMoreComments() {
  const currentLength = displayedComments.value.length;
  const newLength = currentLength + 2;
  displayedComments.value = course.value.comments.slice(0, newLength);
  showMoreButton.value = newLength < course.value.comments.length;
}

export function updateDisplayedComments() {
  displayedComments.value = course.value.comments.slice(0, displayedComments.value.length);
  showMoreButton.value = displayedComments.value.length < course.value.comments.length;
}

// ...existing code if any...
