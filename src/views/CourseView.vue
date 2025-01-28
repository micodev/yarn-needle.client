<template>
  <div class="flex flex-col md:flex-row bg-white dark:bg-gray-900 text-black dark:text-white p-4 md:p-8 h-full">
    <div class="flex-1 flex justify-center items-center ml-2 h-64 md:h-3/4 w-full md:w-3/4">
      <div class="relative rounded overflow-hidden w-full h-full">
        <img :src="course.image" alt="Course Thumbnail" class="w-full h-full object-cover rounded">
        <div class="absolute inset-0 right-2 top-2">
          <span class="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-1 px-2 rounded">{{
            course.subscriptionStatus }}</span>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col justify-center h-auto md:h-3/4 w-full md:w-3/4 overflow-hidden mt-4 md:mt-0">
      <h1 class="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ course.title }}</h1>
      <div class="text-gray-700 dark:text-gray-300 mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 gap-x-4">
        <div class="flex items-center">
          <i class="pi pi-book ml-2"></i>
          <p>{{ course.lessons }} درس</p>
        </div>
        <div class="flex items-center">
          <i class="pi pi-user ml-2"></i>
          <p>{{ course.level }}</p>
        </div>
        <div class="flex items-center">
          <i class="pi pi-clock ml-2"></i>
          <p>{{ course.duration }} ساعات</p>
        </div>
      </div>
      <div class="flex items-center mb-8">
        <img :src="course.instructorImage" alt="Instructor" class="rounded-full ml-2 w-10 h-10 md:w-12 md:h-12">
        <p class="text-lg text-gray-900 dark:text-gray-100">تقديم {{ course.instructor }}</p>
      </div>
      <h2 class="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">سجل بهذه الدورة واحصل على:</h2>
      <ul class="list-disc list-inside mb-8 text-gray-900 dark:text-gray-100">
        <li v-for="award in course.awards" :key="award">{{ award }}</li>
      </ul>
      <p v-if="!course.purchased" class="text-lg md:text-xl mb-2 text-gray-900 dark:text-gray-100">امتلك الدورة بـ</p>
      <p v-else class="text-lg md:text-xl mb-2 text-transparent">.</p>
      <Button :label="course.purchased ? 'ابدأ الآن' : course.price"
        :icon="course.purchased ? 'pi pi-arrow-left' : ''" />
    </div>
  </div>
  <div class="flex flex-col md:flex-row bg-white dark:bg-gray-900 text-black dark:text-white p-4 md:p-8 h-full mt-4 md:mt-8">
    <div class="w-full md:w-3/4 p-4">
      <h2 class="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">محتوى الدورة</h2>
      <p class="text-gray-700 dark:text-gray-300">{{ course.content }}</p>
      <Fieldset legend="محاور الدورة" :toggleable="true" :collapsed="true">
        <ul class="list-disc list-inside mb-8 text-gray-900 dark:text-gray-100">
          <li v-for="topic in course.topics" :key="topic">{{ topic }}</li>
        </ul>
      </Fieldset>
      <Fieldset legend="نتائج الدورة" :toggleable="true" :collapsed="true">
        <ul class="list-disc list-inside mb-8 text-gray-900 dark:text-gray-100">
          <li v-for="result in course.results" :key="result">{{ result }}</li>
        </ul>
      </Fieldset>
      <Fieldset legend="الفئة المستهدفة" :toggleable="true" :collapsed="true">
        <ul class="list-disc list-inside mb-8 text-gray-900 dark:text-gray-100">
          <li v-for="audience in course.targetAudience" :key="audience">{{ audience }}</li>
        </ul>
      </Fieldset>
      <Fieldset legend="التقييمات والتعليقات" :toggleable="true" :collapsed="true">
        <div v-for="comment in displayedComments" :key="comment.id" class="mb-4">
          <div class="flex items-center mb-2">
            <img :src="comment.avatar" alt="User Avatar" class="rounded-full w-8 h-8 ml-2">
            <div>
              <p class="text-lg text-gray-900 dark:text-gray-100">{{ comment.name }}</p>
              <Rating :model-value="comment.rating" readonly :stars="5" cancel="false" />
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300">{{ comment.text }}</p>
        </div>
        <div class="flex justify-center my-4 relative">
          <hr class="w-full border-t border-gray-300 dark:border-gray-700 absolute top-1/2">
          <Button v-if="showMoreButton" label="عرض المزيد" severity="primary" size="small" class="w-1/2 md:w-1/4" @click="showMoreComments" />
        </div>
        <div class="mt-4 flex flex-col space-y-4 justify-center">
          <h3 class="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">أضف تقييمك وتعليقك</h3>
          <Rating v-model="newComment.rating" :stars="5" cancel="false" />
          <Textarea v-model="newComment.text" class="w-full mt-2 p-2 border rounded" placeholder="اكتب تعليقك هنا..." />
          <Button label="إرسال" class="mt-2 w-full md:w-1/2" @click="addComment" />
        </div>
      </Fieldset>
    </div>
    <div class="w-full md:w-1/4 p-4">
      <div class="mb-4">
        <h3 class="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">الجهة الراعية</h3>
        <div class="flex space-x-2 gap-2">
          <img v-for="(logo, index) in course.sponsorLogos" :key="index" :src="logo" alt="Sponsor Logo"
            class="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain">
        </div>
      </div>
      <div>
        <h3 class="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">معلومات المدرب</h3>
        <div class="flex items-center mb-2">
          <img :src="course.instructorImage" alt="Instructor" class="rounded-full w-10 h-10 md:w-12 md:h-12 ml-2">
          <div>
            <p class="text-lg text-gray-900 dark:text-gray-100">{{ course.instructor }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">مدرب</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button, Fieldset, Rating ,Textarea} from 'primevue';

const course = ref({
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
  purchased: false, // Change this to true to test the "ابدأ الآن" button
  content: "هذه الدورة تشمل الجانب البيولوجي والنفسي والاجتماعي والمعنوي. فهم هذه الجوانب الأربع واتصالهم ببعض، يساعدك في استيعاب كيف وقعت في مشكلة ما، وكيفية إخراج نفسك منها. تحتوي هذه الدورة على تقنيات وتمارين للاهتمام بالجوانب الأربع لتعزيز جودة حياتك الشخصية والمهنية و مساعدة نفسك على التعافي بأكثر الطرق توازناً",
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
      id: 2,
      name: "سارة علي",
      avatar: "https://placehold.co/40x40",
      rating: 5,
      text: "استفدت كثيراً من هذه الدورة."
    }
  ]
});

const newComment = ref({
  rating: 0,
  text: ""
});

const displayedComments = ref(course.value.comments.slice(0, 2));
const showMoreButton = ref(course.value.comments.length > 2);

const addComment = () => {
  if (newComment.value.rating && newComment.value.text) {
    course.value.comments.push({
      id: course.value.comments.length + 1,
      name: "مستخدم جديد",
      avatar: "https://placehold.co/40x40",
      rating: newComment.value.rating,
      text: newComment.value.text
    });
    newComment.value.rating = 0;
    newComment.value.text = "";
    updateDisplayedComments();
  }
};

const showMoreComments = () => {
  const currentLength = displayedComments.value.length;
  const newLength = currentLength + 2;
  displayedComments.value = course.value.comments.slice(0, newLength);
  showMoreButton.value = newLength < course.value.comments.length;
};

const updateDisplayedComments = () => {
  displayedComments.value = course.value.comments.slice(0, displayedComments.value.length);
  showMoreButton.value = displayedComments.value.length < course.value.comments.length;
};
</script>

<style scoped>
/* Add any additional styles for mobile responsiveness if needed */
</style>


