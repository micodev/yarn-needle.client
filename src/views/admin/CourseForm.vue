<template>
  <Dialog :visible="visible" @update:visible="handleVisibleUpdate" modal header="إضافة دورة جديدة" :style="{ width: '90vw', maxWidth: '800px' }" :closable="!submitting">
    <div class="flex flex-col gap-4 max-h-[70vh] overflow-y-auto p-2">
      <!-- Basic Information Section -->
      <div class="surface-card p-4 shadow-2 border-round mb-4">
        <div class="text-xl font-medium mb-3">معلومات أساسية</div>
        <div class="grid formgrid">
          <div class="field col-12 md:col-6">
            <label for="title" class="block mb-2">العنوان*</label>
            <InputText id="title" v-model="newCourse.title" class="w-full" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="image" class="block mb-2">الصورة (اختيار ملف)</label>
            <FileUpload mode="basic" accept="image/*" customUpload :uploadHandler="handleImageUpload" chooseLabel="اختر صورة" class="w-full" />
          </div>
          <div class="field col-12">
            <label for="description" class="block mb-2">الوصف*</label>
            <Textarea id="description" v-model="newCourse.description" rows="5" class="w-full" />
          </div>
        </div>
      </div>
      <!-- Course Details Section -->
      <div class="surface-card p-4 shadow-2 border-round mb-4">
        <div class="text-xl font-medium mb-3">تفاصيل الدورة</div>
        <div class="grid formgrid">
          <div class="field col-12 md:col-4">
            <label for="type" class="block mb-2">نوع الدورة*</label>
            <Select id="type" v-model="newCourse.type" :options="courseTypeOptions" optionLabel="name" optionValue="code" class="w-full" />
          </div>
          <div class="field col-12 md:col-4">
            <label for="categorySelect" class="block mb-2">المجال*</label>
            <MultiSelect
              id="categorySelect"
              v-model="selectedCategories"
              :options="categoryOptions"
              optionLabel="name"
              placeholder="اختر المجالات"
              display="chip"
              class="w-full"
              :pt="{
                header: {
                    style: { display: 'none' }
                }
              }"
            />
          </div>
          <div class="field col-12 md:col-4">
            <label for="level" class="block mb-2">المستوى*</label>
            <Select id="level" v-model="newCourse.level" :options="levelOptions" optionLabel="name" optionValue="value" class="w-full" />
          </div>
          <div class="field col-12 md:col-4">
            <label for="originalPrice" class="block mb-2">السعر الأصلي*</label>
            <InputNumber id="originalPrice" v-model="newCourse.originalPrice" class="w-full" :min="0" />
          </div>
          <div class="field col-12 md:col-4">
            <label for="discount" class="block mb-2">الخصم (%)</label>
            <InputNumber id="discount" v-model="newCourse.discount" class="w-full" :min="0" :max="100" />
          </div>
          <div class="field col-12 md:col-4">
            <label for="currency" class="block mb-2">العملة</label>
            <InputText id="currency" v-model="newCourse.currency" class="w-full" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="duration" class="block mb-2">مدة الدورة (بالدقائق)*</label>
            <InputNumber id="duration" v-model="newCourse.duration" class="w-full" :min="0" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="lessonCount" class="block mb-2">عدد الدروس*</label>
            <InputNumber id="lessonCount" v-model="newCourse.lessonCount" class="w-full" :min="0" />
          </div>
        </div>
      </div>
      <!-- Instructor & Content Section -->
      <div class="surface-card p-4 shadow-2 border-round mb-4">
        <div class="text-xl font-medium mb-3">معلومات المدرب والمحتوى</div>
        <div class="grid formgrid">
          <div class="field col-12 md:col-6">
            <label for="instructor" class="block mb-2">اسم المدرب</label>
            <InputText id="instructor" v-model="newCourse.instructor" class="w-full" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="instructorImage" class="block mb-2">صورة المدرب (رابط)</label>
            <InputText id="instructorImage" v-model="newCourse.instructorImage" class="w-full" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="topics" class="block mb-2">المواضيع</label>
            <Chips id="topics" v-model="topicsArray" class="w-full" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="results" class="block mb-2">النتائج المتوقعة (قائمة مفصولة بفواصل)</label>
            <Chips id="results" v-model="resultsArray" class="w-full" separator="," />
          </div>
          <div class="field col-12">
            <label for="targetAudience" class="block mb-2">الجمهور المستهدف (قائمة مفصولة بفواصل)</label>
            <Chips id="targetAudience" v-model="targetAudienceArray" class="w-full" separator="," />
          </div>
        </div>
      </div>
      <!-- Additional Settings Section -->
      <div class="surface-card p-4 shadow-2 border-round mb-4">
        <div class="text-xl font-medium mb-3">الإعدادات الإضافية</div>
        <div class="grid formgrid">
          <div class="field col-12 md:col-6">
            <label for="organizations" class="block mb-2">المؤسسات (قائمة مفصولة بفواصل)</label>
            <Chips id="organizations" v-model="newCourse.organizations" class="w-full" separator="," />
          </div>
          <div class="field col-12 md:col-6">
            <label for="awards" class="block mb-2">الجوائز (قائمة مفصولة بفواصل)</label>
            <Chips id="awards" v-model="awardsArray" class="w-full" separator="," />
          </div>
          <div class="field col-12 md:col-6">
            <label for="subscriptions" class="block mb-2">العضويات المتضمنة</label>
            <MultiSelect id="subscriptions"
            :pt="{
                header: {
                    style: { display: 'none' }
                }
              }"
            v-model="newCourse.subscriptionIncludedNames" :options="subscriptionOptions" optionLabel="label" class="w-full" display="chip" />
          </div>
          <div class="field-checkbox col-12 md:col-6 flex align-items-center">
            <Checkbox id="isActive" v-model="newCourse.isActive" :binary="true" />
            <label for="isActive" class="mr-2">نشط</label>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <Button label="إلغاء" icon="pi pi-times" @click="closeDialog" :disabled="submitting" />
        <Button label="حفظ" icon="pi pi-check" @click="submitCourse" :loading="submitting" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import Chips from 'primevue/chips'
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'

import { useLevelOptionsStore } from '@/stores/levelOptions.js'
import { useCategoryOptionsStore } from '@/stores/categoryOptions.js'
import { useCourseTypeStore } from '@/stores/courseType.js'
import { useMembershipStore } from '@/stores/membership.js'

// v-model binding for dialog visibility
const { visible } = defineProps({
  visible: Boolean
})
const emits = defineEmits(['update:visible', 'course-submitted'])

const submitting = ref(false)
const topicsArray = ref([])
const resultsArray = ref([])
const targetAudienceArray = ref([])
const awardsArray = ref([])
const selectedCategories = ref([])  // Added missing property

const levelOptionsStore = useLevelOptionsStore()
const categoryOptionsStore = useCategoryOptionsStore()
const courseTypeStore = useCourseTypeStore()
const membershipStore = useMembershipStore()

const levelOptions = computed(() => [
	{ name: 'غير مصنف', value: null },
	...levelOptionsStore.getLevels
])
const categoryOptions = computed(() => [
{ name: 'غير مصنف', value: null },
	...categoryOptionsStore.getCategories
])
const courseTypeOptions = computed(() => [
{ name: 'غير مصنف', value: null },
	...courseTypeStore.getCourseTypes
])
// use  console.log(subscriptionOptions.value) inside computed to check the value
const subscriptionOptions = computed(() => {
  const arr = membershipStore.getMemberships.map(m => ({
    label: m.title,
    value: m.code
  }))
  return arr
})

// Default course state to optimize resetForm
const defaultCourse = {
  title: '',
  description: '',
  image: '',
  originalPrice: 0,
  rating: 0,
  students: 0,
  duration: 0,
  level: '',
  currency: 'ريال سعودي',
  lessonCount: 0,
  subscriptionIncludedNames: [],
  discount: null,
  instructor: '',
  instructorImage: '',
  organizations: [],
  awards: [],
  isActive: true
}

const newCourse = reactive({ ...defaultCourse })

// Close dialog and reset form
function closeDialog() {
  emits('update:visible', false)
  resetForm()
}

function resetForm() {
  Object.assign(newCourse, defaultCourse)
  topicsArray.value = []
  resultsArray.value = []
  targetAudienceArray.value = []
  awardsArray.value = []
}

async function submitCourse() {
  try {
    submitting.value = true
    const courseData = { ...newCourse }
    // Prepare data from chips components
    courseData.topics = topicsArray.value
    courseData.results = resultsArray.value
    courseData.targetAudience = targetAudienceArray.value
    courseData.awards = awardsArray.value
    courseData.isSubscribtionIncluded = courseData.subscriptionIncludedNames.length > 0
    // Simulate API call; replace with actual API call as needed
    await new Promise(resolve => setTimeout(resolve, 1000))
    emits('course-submitted')
    closeDialog()
  } catch {
    // ...existing error handling...
  } finally {
    submitting.value = false
  }
}

function handleImageUpload(event) {
  const file = event.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    newCourse.image = reader.result
  }
  reader.readAsDataURL(file)
}

// New handler to update visible prop
function handleVisibleUpdate(val) {
  emits('update:visible', val)
}

onMounted(async () => {
	await Promise.all([
		levelOptionsStore.fetchLevels(),
		categoryOptionsStore.fetchCategories(),
		courseTypeStore.fetchCourseTypes(),
    membershipStore.fetchMemberships()
	])
})
</script>
