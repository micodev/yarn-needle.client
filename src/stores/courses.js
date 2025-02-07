import { defineStore } from 'pinia';

export const useCoursesStore = defineStore('courses', {
	state: () => ({
		courses: [],
		isLoading: false
	}),
	actions: {
		async fetchCourses() {
			this.isLoading = true;
			try {
				const response = await fetch('/api/course');
				if (!response.ok) throw new Error('Network response was not ok');
				this.courses = await response.json();
			} catch (error) {
				console.error('Error fetching courses:', error);
				this.courses = [];
			} finally {
				this.isLoading = false;
			}
		}
	}
});
