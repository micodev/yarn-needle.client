import { ref, computed } from 'vue';

// Initialize comments with static data moved from course.js
export const comments = ref([
  {
    id: 1,
    name: "محمد أحمد",
    avatar: "https://placehold.co/40x40",
    rating: 4,
    text: "دورة ممتازة ومفيدة جداً."
  },
  {
    id: 2,
    name: "سارة علي",
    avatar: "https://placehold.co/40x40",
    rating: 5,
    text: "استفدت كثيراً من هذه الدورة."
  },
  {
    id: 3,
    name: "سارة علي",
    avatar: "https://placehold.co/40x40",
    rating: 5,
    text: "استفدت كثيراً من هذه الدورة."
  }
])

export const newComment = ref({ rating: 0, text: "" });
export const displayedCount = ref(2);
export const displayedComments = computed(() => comments.value.slice(0, displayedCount.value));
export const showMoreButton = computed(() => displayedCount.value < comments.value.length);

export function addComment() {
  if (newComment.value.rating && newComment.value.text) {
    comments.value.push({
      id: comments.value.length + 1,
      name: "مستخدم جديد",
      avatar: "https://placehold.co/40x40",
      ...newComment.value
    });
    newComment.value.rating = 0;
    newComment.value.text = "";
    if (displayedCount.value < comments.value.length) {
      displayedCount.value = comments.value.length;
    }
  }
}

export function showMoreComments() {
  displayedCount.value += 2;
}

export function updateDisplayedComments() {
  if (displayedCount.value > comments.value.length) {
    displayedCount.value = comments.value.length;
  }
}

// ...existing code if any...
