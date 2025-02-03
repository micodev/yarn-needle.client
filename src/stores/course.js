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
        "https://placehold.co/40x40",
        "https://placehold.co/40x40"
      ],
      awards: [
        "مشاهدة غير محدودة للدورة",
        "شهادة إتمام الدورة",
        "التواصل مع المدرب"
      ],
      price: "SAR 183,263.4",
      subscriptionStatus: "غير مشمول بالاشتراك",
      purchased: false,
      content: "هذه الدورة تشمل الجانب البيولوجي والنفسي والاجتماعي والمعنوي...",
      topics: [
        "المحور الأول - الجانب البيولوجي",
        "الرياضة وتأثيرها",
        // ...rest of the topics
      ],
      results: [
        "زيادة تحصيل الثقافي عن جودة الحياة",
        "تعلم كيفية الاهتمام بالصحة بشكل شمولي من أعماق جانب البيولوجي الى الجانب المعنوي",
        "فهم اتصال الجوانب الأربع ببعض وتأثير كل جانب على الآخر"
      ],
      targetAudience: [
        "كل شخص بالغ يسعى الى تطوير من جودة حياته وصحته"
      ],
      comments: []
    }
  }),
  actions: {
    addComment(comment) {
      this.course.comments.push({
        id: this.course.comments.length + 1,
        name: "مستخدم جديد",
        avatar: "https://placehold.co/40x40",
        ...comment
      });
    }
  }
})
