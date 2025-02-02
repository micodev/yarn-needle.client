import { defineStore } from 'pinia';

// Change to explicit named export
const useHomeStore = defineStore('course', {
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
      } catch {
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
          {
            title: "العضوية الفضية",
            description: [
              "الوصول إلى 5 دورات شهرياً",
              "دعم فني عبر البريد الإلكتروني",
              "شهادات إتمام معتمدة"
            ],
            price: "50",
            iconClass: "pi pi-star text-gray-500"
          },
          {
            title: "العضوية الذهبية",
            description: [
              "الوصول غير المحدود للدورات",
              "دعم فني على مدار الساعة",
              "شهادات احترافية معتمدة",
              "جلسات تدريب خاصة شهرياً"
            ],
            price: "100",
            iconClass: "pi pi-star text-yellow-600"
          },
          {
            title: "العضوية البلاتينية",
            description: [
              "جميع مميزات العضوية الذهبية",
              "جلسات تدريب فردية أسبوعية",
              "أولوية الوصول للدورات الجديدة",
              "محتوى حصري للأعضاء المميزين"
            ],
            price: "200",
            iconClass: "pi pi-star text-blue-500"
          }
        ];
      } catch {
        this.error = 'Failed to fetch plans';
      } finally {
        this.loading = false;
      }
    }
  }
});

export { useHomeStore };  // Add explicit export
