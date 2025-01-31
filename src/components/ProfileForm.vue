<template>
  <div class="p-4">
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <i class="pi pi-spinner animate-spin text-3xl"></i>
    </div>

    <template v-else>
      <!-- Collapsable Subscription Info Section -->
      <div :class="[
        'mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300',
        { 'hover:scale-105': !isSubscriptionExpanded }
      ]">
        <!-- Header with collapse button -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
             @click="toggleCollapse">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">معلومات العضوية</h2>
          <i :class="[
            'pi transition-transform duration-300',
            isSubscriptionExpanded ? 'pi-chevron-up rotate-0' : 'pi-chevron-down rotate-180'
          ]"></i>
        </div>

        <!-- Animated collapsable content -->
        <div ref="collapseContent"
             :style="collapseStyle"
             class="transition-all duration-300 ease-in-out overflow-hidden">
          <div ref="innerContent">
            <!-- User Profile Header -->
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-4 space-x-reverse">
                <div class="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <i class="pi pi-user text-4xl text-gray-600 dark:text-gray-300"></i>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ form.firstName }} {{ form.secondName }}</h2>
                  <p class="text-gray-600 dark:text-gray-400">{{ form.civilianId }}</p>
                  <div class="mt-2 flex items-center">
                    <i class="pi pi-clock text-green-500 ml-2"></i>
                    <span class="text-sm text-gray-500 dark:text-gray-400">تنتهي العضوية في: {{ expiryDate }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Plan -->
            <div class="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">الخطة الحالية</h3>
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                <div class="flex items-center mb-4">
                  <i class="pi pi-star text-yellow-600 text-xl ml-3"></i>
                  <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ currentPlan.title }}</h4>
                </div>
                <ul class="text-gray-700 dark:text-gray-300 mb-4 list-disc list-inside">
                  <li v-for="(feature, index) in currentPlan.features" :key="index" class="mb-2">
                    {{ feature }}
                  </li>
                </ul>
                <div class="flex justify-between items-center mt-4">
                  <span class="text-lg font-bold text-gray-900 dark:text-white">
                    {{ currentPlan.price }} ريال سعودي / الشهر
                  </span>
                  <button class="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors flex items-center">
                    <i class="pi pi-refresh ml-2"></i>
                    تجديد العضوية
                  </button>
                </div>
              </div>
            </div>

            <!-- Available Plans -->
            <div class="p-6 bg-white dark:bg-gray-800">
              <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">الترقية إلى</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="plan in availablePlans" :key="plan.title"
                     class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div class="flex items-center mb-4">
                    <i :class="plan.iconClass" class="text-lg ml-3"></i>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">{{ plan.title }}</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mb-4">{{ plan.description }}</p>
                  <div class="mt-auto">
                    <p class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                      {{ plan.price }} ريال سعودي / الشهر
                    </p>
                    <button class="w-full px-4 py-2 text-white border border-blue-600 rounded-lg hover:border-blue-700 transition-colors flex items-center justify-center">
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
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="firstName" v-model="form.firstName" class="w-full" required />
            <label>الاسم الأول <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="secondName" v-model="form.secondName" class="w-full" required />
            <label>الاسم الثاني <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="thirdName" v-model="form.thirdName" class="w-full" required />
            <label>الاسم الثالث <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <MultiSelect :options="nationalities" filter v-model="form.nationality" :maxitems="1" :selectionLimit="1" optionLabel="name" placeholder="اختر الجنسية" class="w-full" required>
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
                  <div class="px-4">الجنسيات المتاحة</div>
              </template>
            </MultiSelect>
            <label>الجنسية <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="phoneNumber" v-model="form.phoneNumber" class="w-full" required />
            <label>رقم الهاتف <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <MultiSelect :options="countries" v-model="form.country" :selectionLimit="1" optionLabel="name" filter placeholder="اختر البلد" class="w-full" required>
            </MultiSelect>
            <label>البلد <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <DatePicker v-model="form.birthDate" class="w-full" required />
            <label>تاريخ الميلاد <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="degree" v-model="form.degree" class="w-full" required />
            <label>الدرجة العلمية <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="fieldOfStudy" v-model="form.fieldOfStudy" class="w-full" required />
            <label>مجال الدراسة <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText type="text" id="jobTitle" v-model="form.jobTitle" class="w-full" required />
            <label>المسمى الوظيفي <span class="text-red-500">*</span></label>
          </IftaLabel>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText
              type="text"
              id="civilianId"
              v-model="form.civilianId"
              class="w-full"
              required
              pattern="^[A-Za-z0-9]+$"
              maxlength="20"
              @input="validateCivilianId"
            />
            <label>الرقم المدني <span class="text-red-500">*</span></label>
          </IftaLabel>
          <small v-if="civilianIdError" class="text-red-500 block mt-1">{{ civilianIdError }}</small>
        </div>
        <div class="w-full md:w-1/2 px-2 mb-4">
          <IftaLabel>
            <InputText
              type="password"
              id="password"
              v-model="form.password"
              class="w-full"
              :placeholder="profileExists ? 'اترك فارغاً للاحتفاظ بكلمة المرور الحالية' : 'أدخل كلمة المرور'"
              :required="!profileExists"
            />
            <label>كلمة المرور <span v-if="!profileExists" class="text-red-500">*</span></label>
          </IftaLabel>
          <small v-if="passwordHint" class="text-gray-500 block mt-1">{{ passwordHint }}</small>
        </div>
        <div class="w-full px-2 mb-4">
          <IftaLabel>
            <FileUpload name="identity"  severity="secondary" class="p-button-outlined w-full"  url="./upload" accept="image/*" mode="basic" auto chooseLabel="إرفاق الهوية الوطنية" required />
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
import { ref, onMounted, computed, nextTick } from 'vue';
import { DatePicker, MultiSelect, InputText, Button, IftaLabel, FileUpload } from 'primevue';

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

const isLoading = ref(true);
const profileData = ref(null);

const form = ref({
  firstName: '',
  secondName: '',
  thirdName: '',
  nationality: null,
  phoneNumber: '',
  country: null,
  birthDate: null,
  degree: '',
  fieldOfStudy: '',
  jobTitle: '',
  civilianId: '',
  expiryDate: '',
  password: ''
});

const profileExists = computed(() => profileData.value !== null);
const expiryDate = computed(() => form.value.expiryDate || '');
const passwordHint = computed(() => {
  if (profileExists.value && form.value.password) {
    return 'سيتم تحديث كلمة المرور';
  }
  return '';
});

// Simulate API call to fetch profile data
const fetchProfileData = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate profile data - replace with actual API call
    const data = {
      firstName: 'سارة',
      secondName: 'أحمد',
      thirdName: 'العمري',
      nationality: { name: 'سعودي', value: 'saudi' },
      phoneNumber: '0501234567',
      country: { name: 'السعودية', code: 'SA' },
      birthDate: new Date('1990-01-01'),
      degree: 'بكالوريوس',
      fieldOfStudy: 'علوم حاسب',
      jobTitle: 'مطور برمجيات',
      civilianId: '1234567890',
      expiryDate: 'Jan 20, 2024',
      password: ''
    };

    profileData.value = data;
    form.value = { ...form.value, ...data };
  } catch (error) {
    console.error('Error fetching profile:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProfileData();
});

const nationalities = ref([
  { name: 'أمريكي', value: 'american' },
  { name: 'كندي', value: 'canadian' },
  // ...other nationalities
]);

const countries = ref([
    { name: 'أستراليا', code: 'AU' },
    { name: 'البرازيل', code: 'BR' },
    { name: 'الصين', code: 'CN' },
    { name: 'مصر', code: 'EG' },
    { name: 'فرنسا', code: 'FR' },
    { name: 'ألمانيا', code: 'DE' },
    { name: 'الهند', code: 'IN' },
    { name: 'اليابان', code: 'JP' },
    { name: 'إسبانيا', code: 'ES' },
    { name: 'الولايات المتحدة', code: 'US' }
]);

const civilianIdError = ref('');

const validateCivilianId = (event) => {
  const value = event.target.value;
  if (value && !/^[A-Za-z0-9]+$/.test(value)) {
    civilianIdError.value = 'الرقم المدني يجب أن يحتوي على أرقام وحروف فقط';
  } else {
    civilianIdError.value = '';
  }
};

const handleSubmit = async () => {
  if (!form.value.firstName ||
      !form.value.secondName ||
      !form.value.thirdName ||
      !form.value.nationality ||
      !form.value.phoneNumber ||
      !form.value.country ||
      !form.value.birthDate ||
      !form.value.degree ||
      !form.value.fieldOfStudy ||
      !form.value.jobTitle ||
      !form.value.civilianId ||
      (!profileExists.value && !form.value.password)) {
    alert('الرجاء ملء جميع الحقول المطلوبة');
    return;
  }

  if (civilianIdError.value) {
    alert('الرجاء تصحيح الأخطاء قبل الإرسال');
    return;
  }

  try {
    const dataToSave = { ...form.value };

    // Only include password if it was changed
    if (!dataToSave.password) {
      delete dataToSave.password;
    }

    // Simulate API call to save data
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update profile data without password
    profileData.value = {
      ...dataToSave,
      password: '' // Clear password field after save
    };

    form.value.password = ''; // Clear password input
    alert('تم حفظ البيانات بنجاح');
  } catch (error) {
    console.error('Error saving profile:', error);
    alert('حدث خطأ أثناء حفظ البيانات');
  }
};

// Add new refs for subscription plans
const currentPlan = ref({
  title: "العضوية الذهبية",
  features: [
    "وصول كامل إلى جميع الدورات",
    "دعم فني متميز",
    "شهادات معتمدة",
    "محتوى حصري"
  ],
  price: "100",
  iconClass: "pi pi-star text-yellow-600"
});

const availablePlans = ref([
  {
    title: "العضوية البلاتينية",
    description: "أعلى مستوى من الميزات والخدمات مع دعم مخصص",
    price: "200",
    iconClass: "pi pi-star text-blue-500"
  },
  {
    title: "العضوية المهنية",
    description: "مثالية للمحترفين مع ميزات متقدمة",
    price: "150",
    iconClass: "pi pi-star text-purple-500"
  },
  {
    title: "عضوية الشركات",
    description: "حلول مخصصة للفرق والشركات",
    price: "300",
    iconClass: "pi pi-users text-green-500"
  }
]);
</script>

<style scoped>
.space-x-reverse {
  --tw-space-x-reverse: 1;
}


.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
