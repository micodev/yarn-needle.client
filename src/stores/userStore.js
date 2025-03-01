import { defineStore } from 'pinia';
import axios from 'axios';

// Base API URL - adjust this as needed for your environment
const API_URL = '/api/users';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(API_URL);
        this.users = response.data;
        return this.users;
      } catch (err) {
        this.error = 'Failed to load users. Please try again later.';
        console.error('Error fetching users:', err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async getUserById(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_URL}/${userId}`);
        this.currentUser = response.data;
        return this.currentUser;
      } catch (err) {
        this.error = `Failed to get user: ${err.message}`;
        console.error('Error fetching user details:', err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(userId) {
      try {
        await axios.delete(`${API_URL}/${userId}`);
        this.users = this.users.filter(user => user.id !== userId);
        return true;
      } catch (err) {
        this.error = `Failed to delete user: ${err.message}`;
        console.error('Error deleting user:', err);
        return false;
      }
    },

    async updateUser(userId, userData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);

        // Update the user in the users array
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
          this.users[index] = response.data;
        }

        return response.data;
      } catch (err) {
        this.error = `Failed to update user: ${err.message}`;
        console.error('Error updating user:', err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async createUser(userData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(API_URL, userData);
        this.users.push(response.data);
        return response.data;
      } catch (err) {
        this.error = `Failed to create user: ${err.message}`;
        console.error('Error creating user:', err);
        return null;
      } finally {
        this.loading = false;
      }
    }
  }
});
