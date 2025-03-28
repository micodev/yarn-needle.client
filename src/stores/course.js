// import { defineStore } from 'pinia';

// export const useCourseStore = defineStore('course', {
//   state: () => ({
//     course: null,
//     loading: false,
//     error: null
//   }),

//   actions: {
//     async fetchCourse(courseId) {
//       this.loading = true;
//       try {
//         const response = await this.$axios.get(`/api/course/${courseId}`);
//         this.course = response.data;
//       } catch (error) {
//         this.error = error.message;
//         console.error('Error fetching course:', error);
//       } finally {
//         this.loading = false;
//       }
//     },

//     clearCourse() {
//       this.course = null;
//       this.error = null;
//     },

//     async enrollCourse(courseId) {
//       this.loading = true;
//       try {
//         const response = await this.$axios.post(`/api/course/enroll/${courseId}`);
//         // Update the course data with the new enrollment status
//         if (this.course && this.course.id === courseId) {
//           this.course = response.data;
//         }
//         return response.data;
//       } catch (error) {
//         this.error = error.message;
//         console.error('Error enrolling in course:', error);
//         throw error;
//       } finally {
//         this.loading = false;
//       }
//     }
//   }
// });
