<template>
  <Dialog :visible="visible" @update:visible="handleVisibleUpdate" modal header="إضافة دورة جديدة" :style="{ width: '95vw', maxWidth: '1200px' }" :closable="!submitting">
    <div class="flex flex-col gap-4 max-h-[70vh] overflow-y-auto p-2">
      <!-- Basic Information Section -->
      <div class="surface-card p-4 shadow-2 border-round mb-4">
        <div class="text-xl font-medium mb-3">معلومات أساسية</div>
        <div class="grid formgrid">
          <div class="field col-12">
            <label for="title" class="block mb-2">العنوان*</label>
            <InputText id="title" v-model="newCourse.title" class="my-2 w-full" />
          </div>
          <div class="field col-12 md:col-6 mb-2">
            <label for="file-upload" class="block mb-2">الصورة (اختيار ملف) </label>
            <!-- Custom element for file upload -->
            <label for="file-upload" class="cursor-pointer block w-full text-center py-2 bg-blue-50 text-blue-700 rounded">
              {{ fileName || 'الصورة (اختيار ملف)' }}            </label>
            <input id="file-upload" type="file" accept="image/*" @change="handleImageUpload" class="hidden" />
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
            <InputText id="currency" v-model="newCourse.currency" class="w-full my-2" />
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
          <!-- Replace the instructor input with a Select dropdown -->
          <div class="field col-12 md:col-6">
            <label for="instructor" class="block mb-2">اسم المدرب</label>
            <Select id="instructor" v-model="newCourse.instructor" :options="lecturerOptions" optionLabel="label" optionValue="value" class="w-full my-2" />
          </div>
          <div class="col-12 md:col-12 flex gap-3">
            <Accordion class="w-full">
              <AccordionPanel>
                <AccordionHeader>المواضيع</AccordionHeader>
                <AccordionContent>
                  <!-- Replaced the Chips component -->
                  <div class="flex align-items-center gap-2  my-2">
                    <InputText v-model="newTopic" placeholder="أدخل الموضوع" class="w-full shadow-none" />
                    <Button icon="pi pi-plus" label="إضافة" @click="addTopic" />
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <Chip
                      v-for="(topic, index) in topicsArray"
                      :key="index"
                      :label="topic"
                      class="cursor-pointer"
                      @click="removeTopic(index)"
                    />
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionHeader>النتائج المتوقعة</AccordionHeader>
                <AccordionContent>
                  <div class="flex align-items-center gap-2  my-2">
                    <InputText v-model="newResult" placeholder="أدخل النتيجة" class="w-full shadow-none" />
                    <Button icon="pi pi-plus" label="إضافة" @click="addResult" />
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <Chip
                      v-for="(result, index) in resultsArray"
                      :key="index"
                      :label="result"
                      class="cursor-pointer"
                      @click="removeResult(index)"
                    />
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionHeader>الجمهور المستهدف</AccordionHeader>
                <AccordionContent>
                  <div class="flex align-items-center gap-2  my-2">
                    <InputText v-model="newTarget" placeholder="أدخل الجمهور" class="w-full shadow-none" />
                    <Button icon="pi pi-plus" label="إضافة" @click="addTarget" />
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <Chip
                      v-for="(target, index) in targetAudienceArray"
                      :key="index"
                      :label="target"
                      class="cursor-pointer"
                      @click="removeTarget(index)"
                    />
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionHeader>الجوائز</AccordionHeader>
                <AccordionContent>
                  <div class="flex align-items-center gap-2 my-2">
                    <InputText v-model="newAward" placeholder="أدخل الجائزة" class="w-full shadow-none" />
                    <Button icon="pi pi-plus" label="إضافة" @click="addAward" />
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <Chip
                      v-for="(award, index) in awardsArray"
                      :key="index"
                      :label="award"
                      class="cursor-pointer"
                      @click="removeAward(index)"
                    />
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionHeader>وسائل التواصل الاجتماعي</AccordionHeader>
                <AccordionContent>
                  <!-- New input group for social media with username -->
                  <div class="flex align-items-center gap-2 my-2">
                    <Select
                      v-model="socialMediaSelected"
                      :options="socialMediaOptions"
                      optionLabel="name"
                      optionValue="code"
                      class="w-full"
                      placeholder="اختر وسيلة تواصل" />
                    <InputText
                      v-model="socialMediaUsername"
                      placeholder="اسم المستخدم"
                      class="w-1/2" />
                    <Button icon="pi pi-plus" label="إضافة" @click="addSocialMedia" />
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <Chip
                      v-for="(sm, index) in socialMediaData"
                      :key="index"
                      :label="`${sm.name}: ${sm.username}`"
                      class="cursor-pointer"
                      @click="removeSocialMedia(index)" />
                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </div>
        </div>
      </div>
      <!-- Additional Settings Section -->
      <div class="surface-card p-4 shadow-2 border-round mb-4">
        <div class="text-xl font-medium mb-3">الإعدادات الإضافية</div>
        <div class="grid formgrid">
          <!-- Replaced organizations Chips with a Select -->
          <div class="field col-12 md:col-6">
            <label for="organization" class="block mb-2">المؤسسة</label>
            <MultiSelect id="organization" v-model="newCourse.organization"
            :pt="{
                header: {
                    style: { display: 'none' }
                }
              }"
              :options="organizationOptions" optionLabel="name" optionValue="id" class="w-full" display="chip" />
          </div>
          <!-- ...existing subscriptions field... -->
          <div class="field col-12 md:col-6">
            <label for="subscriptions" class="block mb-2">العضويات المتضمنة</label>
            <MultiSelect id="subscriptions"
              :pt="{ header: { style: { display: 'none' } } }"
              v-model="newCourse.subscriptionIncludedNames" :options="subscriptionOptions" optionLabel="label" class="w-full" display="chip" />
          </div>
          <div class="field-checkbox col-12 md:col-6 flex align-items-center mt-1">
            <Checkbox id="isActive" v-model="newCourse.isActive" :binary="true" />
            <label for="isActive" class="mr-2">نشط</label>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between gap-1">
        <Button label="حفظ" icon="pi pi-check"  @click="submitCourse" :loading="submitting" />
        <Button label="إلغاء" icon="pi pi-times" severity="secondary" @click="closeDialog" :disabled="submitting" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Chip from 'primevue/chip'

import { useLevelOptionsStore } from '@/stores/levelOptions.js'
import { useCategoryOptionsStore } from '@/stores/categoryOptions.js'
import { useCourseTypeStore } from '@/stores/courseType.js'
import { useMembershipStore } from '@/stores/membership.js'
import { useOrganizationStore } from '@/stores/organizationStore.js'  // added import
import { useLecturerStore } from '@/stores/lecturerStore.js'  // added import
import { useCourseAdminStore } from '@/stores/courseManagementStore.js'  // new import
import { useSocialMediaStore } from '@/stores/socialMedia.js' // new import

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
const newTopic = ref('')
const newResult = ref('')
const newTarget = ref('')
const newAward = ref('')  // New reactive property for الجوائز
const fileName = ref('') // new reactive variable for file name

const levelOptionsStore = useLevelOptionsStore()
const categoryOptionsStore = useCategoryOptionsStore()
const courseTypeStore = useCourseTypeStore()
const membershipStore = useMembershipStore()
const organizationStore = useOrganizationStore()  // initialize organizationStore
const lecturerStore = useLecturerStore()  // initialize lecturerStore
const courseAdminStore = useCourseAdminStore()  // new instance
const socialMediaStore = useSocialMediaStore() // new instance for social media
const socialMediaOptions = computed(() => socialMediaStore.getSocialMedia) // computed options

// Remove previous: const selectedSocialMedia = ref([])
// New reactive properties for social media with username
const socialMediaSelected = ref(null)
const socialMediaUsername = ref('')
const socialMediaData = ref([])

const organizationOptions = computed(() => organizationStore.organizations)  // computed organizations
const lecturerOptions = computed(() =>
  lecturerStore.lecturers.map(l => ({
    label: l.name, // assuming lecturer property is Name
    value: l.id
  }))
)

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
  instructor: null, // updated default
  organization: [], // updated for multiple selections
  awards: [],
  isActive: true,
  socialMedia: [] // new property for course social media
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
    console.log('categories:', selectedCategories.value)
    courseData.categories = selectedCategories.value.map(c => c.code) // added selectedCategories to course data
    courseData.subscriptionIncludedNames = newCourse.subscriptionIncludedNames.map(s => s.value)
    // Use custom social media data
    courseData.socialMedia = socialMediaData.value
    // Use createCourse from courseManagementStore instead of simulated API call
    await courseAdminStore.createCourse(courseData)
    emits('course-submitted')
    closeDialog()
  } catch {
    // ...existing error handling...
  } finally {
    submitting.value = false
  }
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  fileName.value = file.name  // update fileName with selected file's name
  const reader = new FileReader()
  reader.onload = () => {
    newCourse.image = reader.result
    console.log('Image uploaded:', newCourse.image)
  }
  reader.readAsDataURL(file)
}

// New handler to update visible prop
function handleVisibleUpdate(val) {
  emits('update:visible', val)
}

function addTopic() {
  if (newTopic.value.trim()) {
    topicsArray.value.push(newTopic.value.trim())
    newTopic.value = ''
  }
}

function removeTopic(index) {
  topicsArray.value.splice(index, 1)
}

// New functions for النتائج المتوقعة
function addResult() {
  if (newResult.value.trim()) {
    resultsArray.value.push(newResult.value.trim())
    newResult.value = ''
  }
}
function removeResult(index) {
  resultsArray.value.splice(index, 1)
}

// New functions for الجمهور المستهدف
function addTarget() {
  if (newTarget.value.trim()){
    targetAudienceArray.value.push(newTarget.value.trim())
    newTarget.value = ''
  }
}
function removeTarget(index) {
  targetAudienceArray.value.splice(index, 1)
}

// New functions for الجوائز
function addAward() {
  if (newAward.value.trim()) {
    awardsArray.value.push(newAward.value.trim())
    newAward.value = ''
  }
}
function removeAward(index) {
  awardsArray.value.splice(index, 1)
}

// New functions for handling social media with username
function addSocialMedia() {
  if (!socialMediaSelected.value || !socialMediaUsername.value.trim()) return
  const selected = socialMediaOptions.value.find(s => s.code === socialMediaSelected.value)
  const entry = {
    code: socialMediaSelected.value,
    username: socialMediaUsername.value.trim(),
    name: selected ? selected.name : ''
  }
  socialMediaData.value.push(entry)
  socialMediaSelected.value = null
  socialMediaUsername.value = ''
}
function removeSocialMedia(index) {
  socialMediaData.value.splice(index, 1)
}

onMounted(async () => {
	await Promise.all([
		levelOptionsStore.fetchLevels(),
		categoryOptionsStore.fetchCategories(),
		courseTypeStore.fetchCourseTypes(),
    membershipStore.fetchMemberships(),
    organizationStore.fetchOrganizations(),  // added fetchOrganizations
    lecturerStore.fetchLecturers(),  // added fetchLecturers
    socialMediaStore.fetchSocialMedia() // fetch social media options
	])
})
</script>
