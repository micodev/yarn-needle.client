import { defineStore } from 'pinia';
// Removed axios import

export const useLecturerStore = defineStore('lecturer', {
  state: () => ({
    lecturers: [],
    currentLecturer: null,
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0
    },
    loading: false,
    error: null,
    searchQuery: ''
  }),

  getters: {
    getLecturerById: (state) => (id) => {
      return state.lecturers.find(lecturer => lecturer.id === id);
    },
    getTotalPages: (state) => {
      return state.pagination.totalPages;
    },
    isLoading: (state) => {
      return state.loading;
    },
    hasError: (state) => {
      return state.error !== null;
    }
  },

  actions: {
    /**
     * Get all lecturers with optional search and pagination
     */
    async fetchLecturers(page = 1, pageSize = 10, search = '') {
      try {
        this.loading = true;
        this.error = null;

        const response = await this.$axios.get('/api/Lecturer', {
          params: {
            search,
            page,
            pageSize
          }
        });

        if (response.data.success) {
          this.lecturers = response.data.data;
          this.pagination.currentPage = page;
          this.pagination.pageSize = pageSize;
          this.pagination.totalItems = response.data.totalItems || 0;
          this.pagination.totalPages = response.data.totalPages || 0;
          this.searchQuery = search;
          return true;
        } else {
          this.error = response.data.message || 'Failed to fetch lecturers';
          return false;
        }
      } catch (error) {
        this.error = error.message || 'An error occurred while fetching lecturers';
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Get a specific lecturer by ID
     */
    async fetchLecturerById(id) {
      try {
        this.loading = true;
        this.error = null;

        const response = await this.$axios.get(`/api/Lecturer/${id}`);

        if (response.data.success) {
          this.currentLecturer = response.data.single;
          return this.currentLecturer;
        } else {
          this.error = response.data.message || 'Lecturer not found';
          return null;
        }
      } catch (error) {
        this.error = error.message || 'An error occurred while fetching the lecturer';
        return null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Create a new lecturer
     */
    async createLecturer(lecturer) {
      try {
        this.loading = true;
        this.error = null;

        // Build payload with only the required properties: Name and About
        const payload = {
          Name: lecturer.name,
          About: lecturer.about
        };

        const response = await this.$axios.post('/api/Lecturer', payload);

        if (response.data.success) {
          // Add the new lecturer to the collection if it's not already fetched
          if (this.lecturers.length > 0) {
            await this.fetchLecturers(this.pagination.currentPage, this.pagination.pageSize, this.searchQuery);
          }
          return response.data.single;
        } else {
          this.error = response.data.message || 'Failed to create lecturer';
          return null;
        }
      } catch (error) {
        this.error = error.message || 'An error occurred while creating the lecturer';
        return null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update an existing lecturer
     */
    async updateLecturer(id, lecturer) {
      try {
        this.loading = true;
        this.error = null;

        const response = await this.$axios.put(`/api/Lecturer/${id}`, lecturer);

        if (response.data.success) {
          // Update the lecturer in the collection
          const index = this.lecturers.findIndex(l => l.id === id);
          if (index !== -1) {
            this.lecturers[index] = response.data.single;
          }

          // Update currentLecturer if it's the same as the updated one
          if (this.currentLecturer && this.currentLecturer.id === id) {
            this.currentLecturer = response.data.single;
          }

          return response.data.single;
        } else {
          this.error = response.data.message || 'Failed to update lecturer';
          return null;
        }
      } catch (error) {
        this.error = error.message || 'An error occurred while updating the lecturer';
        return null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Delete a lecturer
     */
    async deleteLecturer(id) {
      try {
        this.loading = true;
        this.error = null;

        const response = await this.$axios.delete(`/api/Lecturer/${id}`);

        if (response.data.success) {
          // Remove the lecturer from the collection
          this.lecturers = this.lecturers.filter(l => l.id !== id);

          // Reset currentLecturer if it's the same as the deleted one
          if (this.currentLecturer && this.currentLecturer.id === id) {
            this.currentLecturer = null;
          }

          return true;
        } else {
          this.error = response.data.message || 'Failed to delete lecturer';
          return false;
        }
      } catch (error) {
        this.error = error.message || 'An error occurred while deleting the lecturer';
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Upload a lecturer's image using base64 string
     */
    async uploadLecturerImage(id, file) {
      var base64Image = null;
      if (file) {
        // Convert the file to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file);
        base64Image = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      try {
        this.loading = true;
        this.error = null;

        // Updated payload to use Id and Base64Image based on provided parameters
        const payload = {
          Id: id,
          Base64Image: base64Image
        };

        const response = await this.$axios.post(`/api/Lecturer/${id}/upload-image`, payload);

        if (response.data.success) {
          // After successful image upload, refresh the lecturer data
          if (this.currentLecturer && this.currentLecturer.id === id) {
            await this.fetchLecturerById(id);
          }

          // Also update in the lecturers array if present
          const index = this.lecturers.findIndex(l => l.id === id);
          if (index !== -1) {
            await this.fetchLecturers(this.pagination.currentPage, this.pagination.pageSize, this.searchQuery);
          }

          return true;
        } else {
          this.error = response.data.message || 'Failed to upload image';
          return false;
        }
      } catch (error) {
        this.error = error.message || 'An error occurred while uploading the image';
        return false;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update pagination settings
     */
    setPage(page) {
      if (page > 0 && (!this.pagination.totalPages || page <= this.pagination.totalPages)) {
        this.fetchLecturers(page, this.pagination.pageSize, this.searchQuery);
      }
    },

    /**
     * Update search query and reset pagination
     */
    search(query) {
      this.fetchLecturers(1, this.pagination.pageSize, query);
    },

    /**
     * Clear any error messages
     */
    clearError() {
      this.error = null;
    }
  }
});
