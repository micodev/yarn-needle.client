<template>

  <div class="hero-section flex flex-col md:flex-row items-center px-4 md:px-16">
    <div class="md:w-1/2 p-4">
      <img src="https://placehold.co/600x400" alt="Illustrative placeholder" class="w-full" />
    </div>
    <div class="text-center md:text-right md:w-1/2 p-4">
      <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">منصة خيط وإبرة <span class="block mt-1">نحيك مستقبلك.. بخيوط الموهبة</span></h1>
      <p class="text-lg mb-6 text-gray-700 dark:text-gray-300">اكتشف الدورات المتنوعة وابدأ رحلتك التعليمية معنا</p>
      <div class="flex justify-center md:justify-end gap-1">
        <Button label="استكشف جميع الدورات" class="h-10 mb-6 flex-auto" @click="router.push('/courses')" />

      </div>
    </div>
  </div>
  <FeaturesSection />
  <LatestCoursesSection />
  <MembershipSection />
</template>

<script setup>
import { Button } from "primevue";
import { useRouter } from 'vue-router';
import FeaturesSection from '../components/FeaturesSection.vue';
import LatestCoursesSection from '../components/LatestCoursesSection.vue';
import MembershipSection from '../components/MembershipSection.vue';
const router = useRouter();
</script>

<style scoped>
</style>
