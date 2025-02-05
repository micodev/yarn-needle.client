import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getProfile: (state) => state.profile,
    isProfileLoading: (state) => state.isLoading
  },

  actions: {
    async fetchProfile() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await this.$axios.get('/auth/profile')
        this.profile = response.data
      } catch (error) {
        this.error = error.message || 'Failed to fetch profile'
        console.error('Error fetching profile:', error)
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.profile = null
      this.error = null
      this.isLoading = false
    }
  }
})

// Keep the existing availablePlans export
export const availablePlans = [
  {
    title: "العضوية البلاتينية",
    description: "أعلى مستوى من الميزات والخدمات مع دعم مخصص",
    price: "200",
    iconClass: "pi pi-star text-blue-500"
  },
  {
    title: "العضوية المهنية",
    description: "مثالية للمحترفين مع ميزات متقدمة",
    price: "150",
    iconClass: "pi pi-star text-purple-500"
  },
  {
    title: "عضوية الشركات",
    description: "حلول مخصصة للفرق والشركات",
    price: "300",
    iconClass: "pi pi-users text-green-500"
  }
];
