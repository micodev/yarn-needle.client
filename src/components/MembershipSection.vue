<template>
  <div class="membership-section py-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">إشتراكات العضوية</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">إشترك بعضويتك الآن وأحصل على وصول غير محدود</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
      <div v-if="membershipStore.isLoading" class="col-span-4 text-center">
        <i class="pi pi-spin pi-spinner text-3xl"></i>
      </div>
      <div v-else-if="membershipStore.error" class="col-span-4 text-center text-red-500">
        {{ membershipStore.error }}
      </div>
      <MembershipCard
        v-else
        v-for="(plan,index) in membershipStore.getMemberships"
        :key="plan.id"
        :plan="plan"
        :IsSpecialMembership="index == 1"
        @subscribe="handleSubscription"
      />
    </div>
  </div>

</template>

<script setup>
import { onMounted,ref } from "vue";
import { useToast } from 'primevue/usetoast';
import { useMembershipStore } from '@/stores/membership';
import { useAuthStore } from '@/stores/auth';
import MembershipCard from './MembershipCard.vue';

const membershipStore = useMembershipStore();
const authStore = useAuthStore();
const toast = useToast();
const selectedCourseId = ref(null);
const showPurchaseDialog = ref(false);
const purchaseType = ref('membership');

const handleSubscription = (plan) => {
  if (!authStore.hasProfile) {
    toast.add({
      severity: 'warn',
      summary: 'تنبيه',
      detail: 'يجب إكمال معلومات حسابك الشخصي قبل الاشتراك',
      life: 3000
    });
    return;
  }

  selectedCourseId.value = plan.code;
  showPurchaseDialog.value = true;
  purchaseType.value = 'membership';
};


onMounted(async () => {
  await membershipStore.fetchMemberships();
});
</script>
