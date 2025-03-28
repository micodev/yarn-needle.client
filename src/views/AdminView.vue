<template>
  <div class="p-8 min-h-screen font-['Tajawal']" dir="rtl">
    <div class="mb-10 text-right border-r-4 border-indigo-600 pr-5">
      <h1 class="mb-2 text-3xl font-bold text-indigo-600">لوحة التحكم الإدارية</h1>
      <p class="dark:text-white text-primary text-lg">أهلاً بك في نظام إدارة المنصة</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link to="/admin/users" class="no-underline">
        <div class="rounded-xl dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center border-t-4 border-transparent hover:border-indigo-600 bg-white dark:bg-blend-darken">
          <div class=" w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-md   bg-primary text-white">
            <v-icon name="fa-users" class="w-7 h-7" />
          </div>
          <div class="w-full">
            <h2 class="text-xl font-semibold mb-3">إدارة المستخدمين</h2>
            <p class="dark:text-white text-primary">إدارة المستخدمين والصلاحيات</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/courses" class="no-underline">
        <div class="rounded-xl dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center border-t-4 border-transparent hover:border-indigo-600 bg-white dark:bg-blend-darken">
          <div class=" w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-md   bg-primary text-white">
            <v-icon name="fa-book" class="w-7 h-7" />
          </div>
          <div class="w-full">
            <h2 class="text-xl font-semibold mb-3">إدارة الدورات</h2>
            <p class="dark:text-white text-primary">إنشاء وتعديل وحذف الدورات التدريبية</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/orders" class="no-underline">
        <div class="rounded-xl dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center border-t-4 border-transparent hover:border-indigo-600 bg-white dark:bg-blend-darken">
          <div class=" w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-md   bg-primary text-white">
            <v-icon name="fa-shopping-cart" class="w-7 h-7" />
          </div>
          <div class="w-full">
            <h2 class="text-xl font-semibold mb-3">إدارة الطلبات</h2>
            <p class="dark:text-white text-primary">مراجعة ومعالجة طلبات الشراء</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/lecturers" class="no-underline">
        <div class="rounded-xl dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center border-t-4 border-transparent hover:border-indigo-600 bg-white dark:bg-blend-darken">
          <div class=" w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-md   bg-primary text-white">
            <v-icon name="fa-chalkboard-teacher" class="w-7 h-7" />
          </div>
          <div class="w-full">
            <h2 class="text-xl font-semibold mb-3">إدارة المحاضرين</h2>
            <p class="dark:text-white text-primary">إدارة محاضرين ومدربي الدورات</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/comments" class="no-underline">
        <div class="rounded-xl dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center border-t-4 border-transparent hover:border-indigo-600 bg-white dark:bg-blend-darken">
          <div class=" w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-md   bg-primary text-white">
            <v-icon name="fa-comments" class="w-7 h-7" />
          </div>
          <div class="w-full">
            <h2 class="text-xl font-semibold mb-3">إدارة التعليقات</h2>
            <p class="dark:text-white text-primary">مراقبة وإدارة تعليقات المستخدمين</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/organization" class="no-underline">
        <div class="rounded-xl dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center border-t-4 border-transparent hover:border-indigo-600 bg-white dark:bg-blend-darken">
          <div class=" w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-md   bg-primary text-white">
            <v-icon name="fa-building" class="w-7 h-7" />
          </div>
          <div class="w-full">
            <h2 class="text-xl font-semibold mb-3">إدارة المؤسسات</h2>
            <p class="dark:text-white text-primary">إدارة معلومات المؤسسات الراعية للدورات</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  // Check if user has admin permissions
  if (!authStore.isAdmin) {
    // Redirect non-admin users
    router.push('/');
  }

  // Add Tajawal font for Arabic
  if (!document.getElementById('arabic-font')) {
    const font = document.createElement('link');
    font.id = 'arabic-font';
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
    document.head.appendChild(font);
  }
});
</script>
