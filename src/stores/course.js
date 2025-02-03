import { defineStore } from 'pinia'

export const useCourseStore = defineStore('course', {
  state: () => ({
    course: {
      title: "الجوانب الأربع لجودة الحياة",
      image: "https://placehold.co/600x400",
      lessons: 18,
      level: "مبتدئ",
      duration: 6,
      instructor: "عبدالله الخليفة",
      instructorImage: "https://placehold.co/40x40",
      sponsorLogos: [
        "https://placehold.co/40x40", // Placeholder for sponsor logo 1
        "https://placehold.co/40x40"  // Placeholder for sponsor logo 2
      ],
      awards: [
        "مشاهدة غير محدودة للدورة",
        "شهادة إتمام الدورة",
        "التواصل مع المدرب"
      ],
      price: "SAR 183,263.4",
      subscriptionStatus: "غير مشمول بالاشتراك",
      purchased: false,
      content: "هذه الدورة تشمل الجانب البيولوجي والنفسي والاجتماعي والمعنوي. ...",
      topics: [
        "المحور الأول - الجانب البيولوجي",
        "الرياضة وتأثيرها",
        "التغذية وتأثيرها",
        "اتصال الأمعاء والدماغ",
        "النوم وتأثيره",
        "الإجهاد المزمن",
        "المحور الثاني - الجانب النفسي (ومراحل النمو)",
        "التعامل مع المشاعر",
        "الأفكار السلبية التلقائية وتاريخه",
        "إدارة الأفكار السلبية التلقائية",
        "المحور الثالث - الجانب الاجتماعي",
        "الشعور بالوحدة والقلق الاجتماعي",
        "التكنولوجيا وتأثيرها",
        "المحور الرابع - الجانب المعنوي",
        "التسامح",
        "ختام الجانب المعنوي"
      ],
      results: [
        "زيادة تحصيل الثقافي عن جودة الحياة",
        "تعلم كيفية الاهتمام بالصحة بشكل شمولي من أعماق جانب البيولوجي الى الجانب المعنوي",
        "فهم اتصال الجوانب الأربع ببعض وتأثير كل جانب على الآخر"
      ],
      targetAudience: [
        "كل شخص بالغ يسعى الى تطوير من جودة حياته وصحته"
      ],
      comments: [
        {
          id: 1,
          name: "محمد أحمد",
          avatar: "https://placehold.co/40x40",
          rating: 4,
          text: "دورة ممتازة ومفيدة جداً."
        },
        {
          id: 2,
          name: "سارة علي",
          avatar: "https://placehold.co/40x40",
          rating: 5,
          text: "استفدت كثيراً من هذه الدورة."
        },
        {
          id: 3,
          name: "سارة علي",
          avatar: "https://placehold.co/40x40",
          rating: 5,
          text: "استفدت كثيراً من هذه الدورة."
        }
      ]
    }
  }),
  actions: {
    addComment(commentData) {
      this.course.comments.push({
        id: this.course.comments.length + 1,
        name: "مستخدم جديد",
        avatar: "https://placehold.co/40x40",
        ...commentData
      })
    }
  }
})
