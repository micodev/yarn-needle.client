<template>
  <div class="membership-section py-8  pr-2">
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100">إشتراكات العضوية</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">إشترك بعضويتك الآن وأحصل على وصول غير محدود</p>
    </div>
    <div class="mobile-memberships-container overflow-x-auto pb-4 mt-12">
      <div class="flex md:flex-wrap md:gap-8 gap-4 relative md:justify-center nowrap">
        <div v-if="membershipStore.isLoading" class="w-full text-center">
          <i class="pi pi-spin pi-spinner text-3xl"></i>
        </div>
        <div v-else-if="membershipStore.error" class="w-full text-center text-red-500">
          {{ membershipStore.error }}
        </div>
        <div v-else v-for="(plan, index) in membershipStore.getMemberships" :key="plan.id"
          class="w-4/5 flex-shrink-0 md:flex-shrink md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
          <MembershipCard
            :plan="plan"
            :IsSpecialMembership="index == 1"
            @subscribe="handleSubscription"
          />
        </div>
      </div>
    </div>
  </div>

  <PurchaseConfirmDialog
      v-if="selectedCourseId"
      v-model="showPurchaseDialog"
      :course-id="selectedCourseId"
      :type="purchaseType"
      @purchase-success="handlePurchaseSuccess"
    />
</template>

<script setup>
import { onMounted,ref } from "vue";
import { useToast } from 'primevue/usetoast';
import { useMembershipStore } from '@/stores/membership';
import { useAuthStore } from '@/stores/auth';
import MembershipCard from './MembershipCard.vue';
import PurchaseConfirmDialog from './PurchaseConfirmDialog.vue';

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

const handlePurchaseSuccess = () => {
  // You can add success notification or refresh membership data if needed
};

onMounted(async () => {
  await membershipStore.fetchMemberships();
});
</script>

<style scoped>
.mobile-memberships-container {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

.mobile-memberships-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

@media (max-width: 768px) {
  .nowrap {
    flex-wrap: nowrap;
  }
}
</style>
