import { ref, computed } from 'vue';
import axios from 'axios';

export const comments = ref([]);
export const newComment = ref({ rating: 0, text: "" });
export const loading = ref(false);
export const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  limit: 10
});

export async function fetchComments(courseId) {
  loading.value = true;
  try {
    const response = await axios.get(`api/comments/${courseId}`, {
      params: {
        page: pagination.value.currentPage,
        limit: pagination.value.limit
      }
    });
    comments.value = response.data.items || [];
    pagination.value.totalPages = Math.ceil(response.data.total / pagination.value.limit);
  } catch (error) {
    console.error('Error fetching comments:', error);
  } finally {
    loading.value = false;
  }
}

export const displayedComments = computed(() => comments.value);
export const showMoreButton = computed(() => pagination.value.currentPage < pagination.value.totalPages);

export function addComment() {
  if (newComment.value.rating && newComment.value.text) {
    loading.value = true;
    setTimeout(() => {
      comments.value.push({
        id: comments.value.length + 1,
        name: "مستخدم جديد",
        avatar: "https://placehold.co/40x40",
        ...newComment.value
      });
      newComment.value.rating = 0;
      newComment.value.text = "";

      loading.value = false;
    }, 1000); // mimic API delay
  }
}

export function showMoreComments() {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    pagination.value.currentPage++;
    fetchComments();
  }
}

export function updateDisplayedComments() {
  // This function can be removed if not needed anymore
}
