import { defineStore } from 'pinia'

export const useCourseAdminStore = defineStore('courseAdmin', {
	state: () => ({
		course: null, // holds a single course
		loading: false,
		error: null,
	}),
	actions: {
		async fetchCourseById(id) {
			this.loading = true
			this.error = null
			try {
				const response = await this.$axios.get(`/api/CourseAdminstrator/${id}`)
				if(response.data && response.data.success) {
					this.course = response.data.data[0]
				} else {
					this.error = response.data.message || 'Error fetching course'
				}
			} catch (err) {
				this.error = err.message
			} finally {
				this.loading = false
			}
		},
		async createCourse(courseData) {
			this.loading = true
			this.error = null
			try {
				const response = await this.$axios.post('/api/CourseAdminstrator', courseData)
				if(response.data && response.data.success) {
					this.course = response.data.data[0]
				} else {
					this.error = response.data.message || 'Error creating course'
				}
			} catch (err) {
				this.error = err.message
			} finally {
				this.loading = false
			}
		},
		async updateCourse(id, courseData) {
			this.loading = true
			this.error = null
			try {
				const response = await this.$axios.put(`/api/CourseAdminstrator/${id}`, courseData)
				if(response.data && response.data.success) {
					this.course = response.data.data[0]
				} else {
					this.error = response.data.message || 'Error updating course'
				}
			} catch (err) {
				this.error = err.message
			} finally {
				this.loading = false
			}
		},
		async deleteCourse(id) {
			this.loading = true
			this.error = null
			try {
				const response = await this.$axios.delete(`/api/CourseAdminstrator/${id}`)
				if(response.data && response.data.success) {
					this.course = null
				} else {
					this.error = response.data.message || 'Error deleting course'
				}
			} catch (err) {
				this.error = err.message
			} finally {
				this.loading = false
			}
		}
	}
})
