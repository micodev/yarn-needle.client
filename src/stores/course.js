import { defineStore } from 'pinia';

// Change to explicit named export
const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [],
    plans: [],
    loading: false,
    error: null
  }),

  getters: {
    paddedCourses: (state) => {
      const longestDescription = Math.max(...state.courses.map(course => course.description.length));
      return state.courses.map(course => ({
        ...course,
        description: course.description + ' '.repeat(longestDescription - course.description.length)
      }));
    }
  },

  actions: {
    async fetchCourses() {
      this.loading = true;
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.courses = [
          {
            title: "دورة المونتاج المتقدم",
            description: "تعلم أدوات و تقنيات تعلم أدوات و تقنيات  تعلم أدوات و تقنيات تعلم أدوات و تقنيات تعلم أدوات و تقنيات تعلم أدوات و تقنيات المونتاج الحديثة",
            image: "https://placehold.co/300x200",
            originalPrice: "200",
            currency: "ريال سعودي"
          },
          {
            title: "دورة التصوير الفوتوغرافي",
            description: "اكتشف أسرار التصوير باحترافية",
            image: "https://placehold.co/300x200",
            originalPrice: "150",
            discountedPrice: "105",
            discount: 30,
            currency: "ريال سعودي"
          },
          {
            title: "دورة كتابة المحتوى",
            description: "تعلم كتابة المحتوى بشكل احترافي",
            image: "https://placehold.co/300x200",
            originalPrice: "100",
            discountedPrice: "70",
            discount: 30,
            currency: "ريال سعودي"
          }
        ];
      } catch (err) {
        this.error = 'Failed to fetch courses';
      } finally {
        this.loading = false;
      }
    },

    async fetchPlans() {
      this.loading = true;
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.plans = [
          {
            title: "العضوية التجريبية",
            description: [
              "تقدم فترة تجريبية مجانية أو بخصم كبير لجذب العملاء الجدد.",
              "تشجيعهم على تجربة الخدمة.",
              "تسليط الضوء على الميزات الأساسية خلال هذه الفترة."
            ],
            price: "0",
            iconClass: "pi pi-user text-gray-500"
          },
          // ... rest of the plans data
        ];
      } catch (err) {
        this.error = 'Failed to fetch plans';
      } finally {
        this.loading = false;
      }
    }
  }
});

export { useCourseStore };  // Add explicit export
