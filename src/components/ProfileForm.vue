<template>
  <div class="p-4">
    <form class="flex flex-wrap -mx-2">
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <InputText type="text" id="firstName" v-model="form.firstName" class="w-full" />
          <label>الاسم الأول</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <InputText type="text" id="secondName" v-model="form.secondName" class="w-full" />
          <label>الاسم الثاني</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <InputText type="text" id="thirdName" v-model="form.thirdName" class="w-full" />
          <label>الاسم الثالث</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <MultiSelect :options="nationalities" filter v-model="form.nationality" :maxitems="1" :selectionLimit="1" optionLabel="name" placeholder="اختر الجنسية" class="w-full">
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
          <label>الجنسية</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <InputText type="text" id="phoneNumber" v-model="form.phoneNumber" class="w-full" />
          <label>رقم الهاتف</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <MultiSelect :options="countries" v-model="form.country" :selectionLimit="1" optionLabel="name" filter placeholder="اختر البلد" class="w-full">

          </MultiSelect>
          <label>البلد</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <DatePicker v-model="form.birthDate" class="w-full" />
          <label>تاريخ الميلاد</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <InputText type="text" id="degree" v-model="form.degree" class="w-full" />
          <label>الدرجة العلمية</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <InputText type="text" id="fieldOfStudy" v-model="form.fieldOfStudy" class="w-full" />
          <label>مجال الدراسة</label>
        </IftaLabel>
      </div>
      <div class="w-full md:w-1/2 px-2 mb-4">
        <IftaLabel>
          <InputText type="text" id="jobTitle" v-model="form.jobTitle" class="w-full" />
          <label>المسمى الوظيفي</label>
        </IftaLabel>
      </div>
      <div class="w-full px-2 mb-4">
        <IftaLabel>
          <FileUpload name="identity"  severity="secondary" class="p-button-outlined w-full"  url="./upload" accept="image/*" mode="basic" auto chooseLabel="إرفاق الهوية الوطنية"  />
          <label></label>
        </IftaLabel>
      </div>
      <div class="w-full px-2">
        <Button type="submit" label="إرسال" class="w-full" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import {DatePicker,MultiSelect,InputText ,Button,IftaLabel,FileUpload} from 'primevue';
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
  jobTitle: ''
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
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
