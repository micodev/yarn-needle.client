import { ref, computed } from 'vue';
import { useCourseStore } from '@/stores/course';

const courseStore = useCourseStore();
const course = computed(() => courseStore.course);

// Use a reactive count for displayed comments instead of fixed refs.
export const newComment = ref({ rating: 0, text: "" });
export const displayedCount = ref(2);
export const displayedComments = computed(() => course.value.comments.slice(0, displayedCount.value));
export const showMoreButton = computed(() => displayedCount.value < course.value.comments.length);

export function addComment() {
  if (newComment.value.rating && newComment.value.text) {
    courseStore.addComment({
      rating: newComment.value.rating,
      text: newComment.value.text
    });
    newComment.value.rating = 0;
    newComment.value.text = "";
    // Optionally, update displayedCount to reveal the new comment immediately:
    if (displayedCount.value < course.value.comments.length) {
      displayedCount.value = course.value.comments.length;
    }
  }
}

export function showMoreComments() {
  displayedCount.value += 2;
}

export function updateDisplayedComments() {
  if (displayedCount.value > course.value.comments.length) {
    displayedCount.value = course.value.comments.length;
  }
}

// ...existing code if any...
