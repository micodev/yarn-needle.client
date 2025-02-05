<template>
  <div class="p-2 sm:p-4">
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <i class="pi pi-spinner animate-spin text-3xl"></i>
    </div>

    <template v-else>
      <!-- Collapsable Subscription Info Section -->
      <div :class="[
        'mb-4 sm:mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300',
        { 'hover:scale-105': !isSubscriptionExpanded }
      ]">
        <!-- Header with collapse button -->
        <div
          class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer hover:bg-white dark:hover:bg-gray-700"
          @click="toggleCollapse">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">معلومات العضوية</h2>
          <i :class="[
            'pi transition-transform duration-300',
            isSubscriptionExpanded ? 'pi-chevron-up rotate-0' : 'pi-chevron-up rotate-180'
          ]"></i>
        </div>

        <!-- Animated collapsable content -->
        <div ref="collapseContent" :style="collapseStyle"
          class="transition-all duration-300 ease-in-out overflow-hidden">
          <div ref="innerContent">
            <!-- User Profile Header -->
            <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div
                class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                <div
                  class="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <i class="pi pi-user text-3xl sm:text-4xl text-gray-600 dark:text-gray-300"></i>
                </div>
                <div class="text-center sm:text-right">
                  <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ form.firstName }} {{
                    form.secondName }}</h2>
                  <p class="text-gray-600 dark:text-gray-400">{{ form.civilianId }}</p>
                  <div class="mt-2 flex items-center justify-center sm:justify-start">
                    <i class="pi pi-clock text-green-500 ml-2"></i>
                    <span class="text-sm text-gray-500 dark:text-gray-400">تنتهي العضوية في: {{ expiryDate }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Plan -->
            <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h3 class="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">الخطة الحالية</h3>
              <div class="bg-white dark:bg-gray-700 rounded-lg p-3 sm:p-4 shadow-sm">
                <div class="flex items-center mb-4">
                  <i class="pi pi-star text-yellow-600 text-xl ml-3"></i>
                  <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ currentPlan.title || 'لا توجد خطةحالية'
                    }}</h4>
                </div>
                <ul class="text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
                  <li v-for="(feature, index) in currentPlanFeatures" :key="index" class="mb-2">
                    {{ feature }}
                  </li>
                </ul>
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                  <span class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    {{ currentPlan.price ? `${currentPlan.price} ريال سعودي / الشهر` : '' }}
                  </span>
                  <button
                    class="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center">
                    <i class="pi pi-refresh ml-2"></i>
                    تجديد العضوية
                  </button>
                </div>
              </div>
            </div>

            <!-- Available Plans -->
            <div class="p-4 sm:p-6 bg-white dark:bg-gray-800">
              <h3 class="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">الترقية إلى</h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="plan in availablePlans" :key="plan.title"
                  class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div class="flex items-center mb-4">
                    <i :class="plan.iconClass" class="text-lg ml-3"></i>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ plan.title }}</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mb-4">{{ plan.description }}</p>
                  <div class="mt-auto">
                    <p class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                      {{ plan.price }} ريال سعودي / الشهر
                    </p>
                    <button
                      class="w-full px-4 py-2 text-white border border-blue-600 rounded-lg hover:border-blue-700 transition-colors flex items-center justify-center">
                      <i class="pi pi-arrow-up ml-2"></i>
                      ترقية
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form class="flex flex-wrap -mx-2" @submit.prevent="handleSubmit">
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="firstName" v-model="form.firstName" class="w-full" required />
            <label>الاسم الأول <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="secondName" v-model="form.secondName" class="w-full" required />
            <label>الاسم الثاني <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="thirdName" v-model="form.thirdName" class="w-full" required />
            <label>الاسم الثالث <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <MultiSelect v-model="form.nationality" :options="nationalities" :loading="nationalityStore.isLoading"
              :maxItems="1" :selectionLimit="1" :filter="true" optionLabel="name" class="w-full nationality-select"
              :class="{ 'p-invalid': validationError }" placeholder="اختر الجنسية" aria-label="اختيار الجنسية" required>
              <template #option="slotProps">
                <div>
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>

              <template #dropdownicon>
                <i class="pi pi-globe" />
              </template>
              <template #filtericon>
                <i class="pi pi-search" />
              </template>
              <template #header>
                <div class="px-4 pt-2">الجنسيات المتاحة</div>
              </template>
            </MultiSelect>
            <label>الجنسية <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="phoneNumber" v-model="form.phoneNumber" class="w-full" required />
            <label>رقم الهاتف <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <MultiSelect :options="countries" v-model="form.country" :selectionLimit="1" optionLabel="name" filter
              :loading="countryStore.isLoading" placeholder="اختر البلد" class="w-full" required>
            </MultiSelect>
            <label>البلد <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <DatePicker v-model="form.birthDate" class="w-full" required />
            <label>تاريخ الميلاد <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="degree" v-model="form.degree" class="w-full" required />
            <label>الدرجة العلمية <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="fieldOfStudy" v-model="form.fieldOfStudy" class="w-full" required />
            <label>مجال الدراسة <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="jobTitle" v-model="form.jobTitle" class="w-full" required />
            <label>المسمى الوظيفي <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="civilianId" v-model="form.civilianId" class="w-full" required
              pattern="^[A-Za-z0-9]+$" maxlength="20" @input="validateCivilianId" />
            <label>الرقم المدني <span class="text-red-500">*</span></label>
          </IftaLabel>
          <small v-if="civilianIdError" class="text-red-500 block mt-1">{{ civilianIdError }}</small>
        </div>
        <div class="w-full sm:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="password" id="password" v-model="form.password" class="w-full"
              :placeholder="profileExists ? 'اترك فارغاً للاحتفاظ بكلمة المرور الحالية' : 'أدخل كلمة المرور'"
              :required="!profileExists" />
            <label>كلمة المرور <span v-if="!profileExists" class="text-red-500">*</span></label>
          </IftaLabel>
          <small v-if="passwordHint" class="text-gray-500 block mt-1">{{ passwordHint }}</small>
        </div>
        <div class="w-full px-2 mb-4">
          <IftaLabel>
            <FileUpload name="identity" severity="secondary" class="p-button-outlined w-full" url="./upload"
              accept="image/*" mode="basic" auto chooseLabel="إرفاق الهوية الوطنية" required />
            <label>الهوية الوطنية <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full px-2">
          <Button type="submit" label="إرسال" class="w-full" />
        </div>
      </form>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, reactive } from 'vue';
import { DatePicker, MultiSelect, InputText, Button, IftaLabel, FileUpload } from 'primevue';
import { useProfileStore } from '@/stores/profile';
import { useCountryStore } from '@/stores/country'; // Add this import
import { useNationalityStore } from '@/stores/nationality'; // Add this import
import { useMembershipStore } from '@/stores/membership'; // Add this import

const collapseContent = ref(null);
const innerContent = ref(null);
const contentHeight = ref('0px');
const isSubscriptionExpanded = ref(false);

const collapseStyle = computed(() => ({
  height: isSubscriptionExpanded.value ? `${contentHeight.value}` : '0px'
}));

const toggleCollapse = () => {
  isSubscriptionExpanded.value = !isSubscriptionExpanded.value;
  if (isSubscriptionExpanded.value) {
    contentHeight.value = `${innerContent.value.offsetHeight}px`;
  } else {
    contentHeight.value = '0px';
  }
};

onMounted(() => {
  // Set initial height after data is loaded
  nextTick(() => {
    if (innerContent.value) {
      contentHeight.value = `${innerContent.value.offsetHeight}px`;
    }
  });
});

// Listen for window resize to update height
onMounted(() => {
  window.addEventListener('resize', updateHeight);
  return () => window.removeEventListener('resize', updateHeight);
});

const updateHeight = () => {
  if (isSubscriptionExpanded.value && innerContent.value) {
    contentHeight.value = `${innerContent.value.offsetHeight}px`;
  }
};

const profileStore = useProfileStore();
const isLoading = computed(() => profileStore.isLoading);
// Change profileData to computed to always reflect store state
const profileData = computed(() => profileStore.getProfile || {});

// Add computed properties for current plan data with null checks
const currentPlan = computed(() => profileData.value?.currentPlan || {});
const currentPlanFeatures = computed(() => currentPlan.value?.features || []);

const form = reactive({
  firstName: '',
  secondName: '',
  thirdName: '',
  nationality: '',
  phoneNumber: '',
  country: '',
  birthDate: null,
  degree: '',
  fieldOfStudy: '',
  jobTitle: '',
  civilianId: '',
  expiryDate: '',
  password: ''
});

const profileExists = computed(() => profileStore.getProfile !== null);
const expiryDate = computed(() => form.expiryDate || '');
const passwordHint = computed(() => {
  if (profileExists.value && form.password) {
    return 'سيتم تحديث كلمة المرور';
  }
  return '';
});

const fetchData = async () => {
  try {
    await profileStore.fetchProfile();
    // Update form with profile data, using optional chaining
    Object.assign(form, profileStore.getProfile || {});
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

const countryStore = useCountryStore();
const countries = computed(() => countryStore.getCountries);

const nationalityStore = useNationalityStore(); // Add this line

// Replace the static nationalities with computed property
const nationalities = computed(() => nationalityStore.getNationalities); // Add this line

const membershipStore = useMembershipStore();
const availablePlans = computed(() => membershipStore.getMemberships);

onMounted(async () => {
  isLoading.value = true
  try {
    await countryStore.fetchCountries()
    await nationalityStore.fetchNationalities()
    await membershipStore.fetchMemberships()
    const data = await profileStore.fetchProfile()
    Object.assign(form, data || {})
  } catch (error) {
    console.error('Error in onMounted:', error)
  } finally {
    isLoading.value = false
  }
})

const civilianIdError = ref('');

const validateCivilianId = (event) => {
  const value = event.target.value;
  if (value && !/^[A-Za-z0-9]+$/.test(value)) {
    civilianIdError.value = 'الرقم المدني يجب أن يحتوي على أرقام وحروف فقط';
  } else {
    civilianIdError.value = '';
  }
};

const validationError = ref(false);

const handleSubmit = async () => {
  // Validate nationality
  if (!form.nationality) {
    validationError.value = true;
    return;
  }
  validationError.value = false;

  if (!form.firstName ||
    !form.secondName ||
    !form.thirdName ||
    !form.nationality ||
    !form.phoneNumber ||
    !form.country ||
    !form.birthDate ||
    !form.degree ||
    !form.fieldOfStudy ||
    !form.jobTitle ||
    !form.civilianId ||
    (!profileExists.value && !form.password)) {
    alert('الرجاء ملء جميع الحقول المطلوبة');
    return;
  }

  if (civilianIdError.value) {
    alert('الرجاء تصحيح الأخطاء قبل الإرسال');
    return;
  }

  try {
    const dataToSave = { ...form };

    // Only include password if it was changed
    if (!dataToSave.password) {
      delete dataToSave.password;
    }

    const updatedProfile = await profileStore.updateProfile(dataToSave);
    profileData.value = updatedProfile;
    form.password = ''; // Clear password input
    alert('تم حفظ البيانات بنجاح');
  } catch (error) {
    console.error('Error saving profile:', error);
    alert('حدث خطأ أثناء حفظ البيانات');
  }
};
</script>

<style scoped>
.space-x-reverse {
  --tw-space-x-reverse: 1;
}

@media (max-width: 640px) {
  .card {
    margin-bottom: 1rem;
  }

  .pi {
    font-size: 1.25rem;
  }

  .input-group {
    margin-bottom: 1rem;
  }
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
