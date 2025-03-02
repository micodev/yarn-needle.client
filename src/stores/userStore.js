import { defineStore } from 'pinia';

// Base API URL - adjust this as needed for your environment
const API_URL = '/api/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    userOrders: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      limit: 10,
      hasMore: true
    },
    ordersPagination: {
      currentPage: 1,
      limit: 10,
      hasMore: true,
      total: 0
    },
    filters: {
      search: null,
      role: null,
      isSuspended: null
    }
  }),

  getters: {
    displayedUsers: (state) => state.users,
    showMoreButton: (state) => state.pagination.hasMore,
    displayedUserOrders: (state) => state.userOrders,
    showMoreOrdersButton: (state) => state.ordersPagination.hasMore
  },

  actions: {
    async fetchUsers(append = false) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.get(API_URL + "/users", {
          params: {
            page: this.pagination.currentPage,
            pageSize: this.pagination.limit,
            search: this.filters.search,
            role: this.filters.role,
            isSuspended: this.filters.isSuspended
          }
        });

        const { items, totalCount, currentPage, pageCount } = response.data;

        if (append) {
          this.users = [...this.users, ...(items || [])];
        } else {
          this.users = items || [];
        }

        // Update pagination info based on response
        this.pagination.hasMore = currentPage < pageCount;
        this.pagination.currentPage = currentPage;

        return this.users;
      } catch (err) {
        this.error = 'Failed to load users. Please try again later.';
        console.error('Error fetching users:', err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async showMoreUsers() {
      if (this.pagination.hasMore && !this.loading) {
        this.pagination.currentPage++;
        await this.fetchUsers(true);
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
      this.pagination.currentPage = 1; // Reset to first page when filters change
      return this.fetchUsers(false);
    },

    async getUserById(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$axios.get(`${API_URL}/${userId}`);
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

    async getUserOrders(userId, append = false, filters = {}) {
      this.loading = true;
      this.error = null;
      try {
        const params = {
          page: this.ordersPagination.currentPage,
          pageSize: this.ordersPagination.limit,
          orderStateCode: filters.orderStateCode,
          paymentStateCode: filters.paymentStateCode,
          isMembership: filters.isMembership,
          startDate: filters.startDate,
          endDate: filters.endDate
        };

        // Clean up undefined/null values
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        const response = await this.$axios.get(`${API_URL}/${userId}/orders`, { params });

        const { items, totalCount, currentPage, pageCount } = response.data;

        if (append) {
          this.userOrders = [...this.userOrders, ...(items || [])];
        } else {
          this.userOrders = items || [];
        }

        // Update pagination info
        this.ordersPagination.hasMore = currentPage < pageCount;
        this.ordersPagination.currentPage = currentPage;
        this.ordersPagination.total = totalCount;

        return this.userOrders;
      } catch (err) {
        this.error = `Failed to load user orders: ${err.message}`;
        console.error('Error fetching user orders:', err);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async showMoreUserOrders(userId, filters = {}) {
      if (this.ordersPagination.hasMore && !this.loading) {
        this.ordersPagination.currentPage++;
        await this.getUserOrders(userId, true, filters);
      }
    },

    async deleteUser(userId) {
      try {
        await this.$axios.delete(`${API_URL}/${userId}`);
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
        const response = await this.$axios.put(`${API_URL}/${userId}`, userData);

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
        const response = await this.$axios.post(API_URL, userData);
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
