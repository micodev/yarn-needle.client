import { defineStore } from 'pinia'

export const useCourseAdminStore = defineStore('courseAdmin', {
	state: () => ({
		course: null, // holds a single course
		courses: [],  // added to hold multiple courses
		loading: false,
		error: null,
        pagination: null,
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
			 await this.$axios.delete(`/api/CourseAdminstrator/${id}`)

			} catch (err) {
				this.error = err.message
			} finally {
				this.loading = false
			}
		},
        async fetchAllCourses(queryParams) {
            this.loading = true
            this.error = null
            try {
                const response = await this.$axios.get('/api/CourseAdminstrator', { params: queryParams })
                if(response.data && response.data.success) {
                    this.courses = response.data.data
                    this.pagination = response.data.pagination
                } else {
                    this.error = response.data.message || 'Error fetching courses'
                }
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        }
	}
})
