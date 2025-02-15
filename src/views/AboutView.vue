<template>
  <div class="about-section min-h-screen">
    <!-- Hero Section -->
    <div class="hero-section relative py-12 sm:py-20 px-0 sm:px-4 bg-[var(--p-surface-50)] animate-fadeIn">
      <div class="w-full sm:max-w-6xl mx-auto text-center px-4">
        <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-[var(--p-text-color)]">من نحن</h1>
        <p class="text-base sm:text-xl md:text-2xl text-[var(--p-text-muted-color)] max-w-4xl mx-auto leading-relaxed px-2">
          منصة تهدف إلى تعزيز المواهب والقدرات الإبداعية وتطوير المهارات الفردية من خلال تقديم فرص تعليمية وتدريبية شاملة.
        </p>
      </div>
    </div>

    <!-- Vision & Mission Section -->
    <div class="py-12 sm:py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg animate-slideInLeft">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-[var(--p-text-color)]">رؤيتنا</h2>
            <p class="text-base sm:text-lg text-[var(--p-text-muted-color)] leading-relaxed">
              أن تكون المنصة رائدة في بناء أجيال متكاملة ثقافياً وتنموياً ورياضياً واجتماعياً، وتعزيز الصحة والمواهب في المجتمع.
            </p>
          </div>
          <div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg animate-slideInRight">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-[var(--p-text-color)]">رسالتنا</h2>
            <p class="text-base sm:text-lg text-[var(--p-text-muted-color)] leading-relaxed">
              تسعى المنصة إلى تقديم العلم والمعرفة من خلال أساليب تدريبية وترفيهية، ودعم المواهب وتطويرها في بيئة ملهمة تعزز من إمكانياتهم وتحقق طموحاتهم.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="py-12 sm:py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)] animate-fadeIn">قيمنا</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 animate-fadeInUp" style="animation-delay: 0ms;">
            <i class="pi pi-verified text-2xl sm:text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-lg sm:text-xl font-bold mb-3 text-[var(--p-text-color)]">الثقة</h3>
            <p class="text-sm sm:text-base text-[var(--p-text-muted-color)]">بناء أو تعزيز علاقة موثوقة ومستدامة مع شركائنا ومواهبنا.</p>
          </div>
          <div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 animate-fadeInUp" style="animation-delay: 200ms;">
            <i class="pi pi-star text-2xl sm:text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-lg sm:text-xl font-bold mb-3 text-[var(--p-text-color)]">التميز</h3>
            <p class="text-sm sm:text-base text-[var(--p-text-muted-color)]">تحقيق معايير استثنائية وتقديم الدعم بطريقة مميزة.</p>
          </div>
          <div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 animate-fadeInUp" style="animation-delay: 400ms;">
            <i class="pi pi-check-circle text-2xl sm:text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-lg sm:text-xl font-bold mb-3 text-[var(--p-text-color)]">المُسؤولية</h3>
            <p class="text-sm sm:text-base text-[var(--p-text-muted-color)]">الالتزام بتنمية المواهب وتحقيق الأهداف بوعي وتفانٍ.</p>
          </div>
          <div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 animate-fadeInUp" style="animation-delay: 600ms;">
            <i class="pi pi-refresh text-2xl sm:text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-lg sm:text-xl font-bold mb-3 text-[var(--p-text-color)]">الاستدامة</h3>
            <p class="text-sm sm:text-base text-[var(--p-text-muted-color)]">الالتزام بالنمو والتطور المستدام.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- What We Offer Section -->
    <div class="py-12 sm:py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)]">ماذا نقدم؟</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="(offer, index) in offers" :key="index"
               class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg flex items-start gap-4">
            <i class="pi pi-check-circle text-xl text-[var(--p-primary-color)] mt-1"></i>
            <p class="text-lg text-[var(--p-text-muted-color)]">{{ offer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Goals Section -->
    <div class="py-12 sm:py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">أهدافنا</h2>
        <div class="space-y-4">
          <div v-for="(goal, index) in goals" :key="index"
               class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg flex items-center gap-4">
            <div class="bg-[var(--p-primary-color)] text-[var(--p-button-text-primary-color)] w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
              {{ index + 1 }}
            </div>
            <p class="text-lg text-[var(--p-text-color)]">{{ goal }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Fields Section -->
    <div class="py-12 sm:py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)]">مجالاتنا</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="(field, index) in fields" :key="index"
               class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <i :class="fieldIcons[index]" class="text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-xl font-bold text-[var(--p-text-color)]">{{ field }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Forums Section -->
    <div class="py-12 sm:py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)]">نبذة تعريفية عن مواهبنا</h2>

        <Tabs value="0" scrollable>
          <TabList>
            <Tab v-for="(forum, index) in forums"
                 :key="index"
                 :value="index.toString()">
              {{ forum.title }}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel v-for="(forum, index) in forums"
                      :key="index"
                      :value="index.toString()">
              <div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg">
                <div class="mb-8">
                  <p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed">
                    {{ forum.description }}
                  </p>
                </div>

                <div class="mt-8">
                  <h3 class="text-2xl font-bold mb-6 text-[var(--p-text-color)]">أهداف الملتقى</h3>
                  <ul class="space-y-4">
                    <li v-for="(objective, idx) in forum.objectives"
                        :key="idx"
                        class="flex items-start gap-4">
                      <i class="pi pi-check-circle text-[var(--p-primary-color)] mt-1"></i>
                      <span class="text-[var(--p-text-muted-color)]">{{ objective }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

    <!-- History Section -->
    <div class="py-12 sm:py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">تاريخنا</h2>
        <div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg">
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2"></div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]">2020 - التأسيس</h3>
                <p class="text-[var(--p-text-muted-color)]">
                  تأسست منصة "خيط وإبرة" في أبريل 2020، في خضم أزمة جائحة كورونا، على يد المؤسس ريان القرشي.
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2"></div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]">2021 - التوسع</h3>
                <p class="text-[var(--p-text-muted-color)]">
                  في يونيو 2021، أطلقت المنصة ملتقياتها الخاصة لدعم المواهب، لتصبح منبراً جامعاً للموهوبين والهواة.
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2"></div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]">اليوم</h3>
                <p class="text-[var(--p-text-muted-color)]">
                  تضم المنصة اليوم أكثر من 25,000 متابع وتدعم مجموعة واسعة من المواهب في مجالات متعددة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Impact & Future Section -->
    <div class="py-12 sm:py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)]">أثرنا ومستقبلنا</h2>
        <div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg space-y-8">
          <div>
            <h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]">امتداد التأثير</h3>
            <p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed">
              واليوم، وبعد ثلاثة أعوام من العطاء، امتدت تأثيرات المنصة وانتشارها جغرافياً، حيث جذبت مواهب من المملكة العربية السعودية أولاً، ومن ثم من مختلف الدول العربية، بما في ذلك العراق وسوريا ومصر والأردن والجزائر واليمن وغيرها من الدول، مما جعلها حاضنة إبداعية على مستوى الوطن العربي.
            </p>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]">رؤيتنا المستقبلية</h3>
            <p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed">
              تواصل منصة "خيط وإبرة" رسالتها الرائدة في دعم الموهوبين وتطوير مهاراتهم، مع رؤية مستقبلية طموحة تهدف إلى أن تصل إلى كل بيت سعودي أولاً، ومن ثم البيوت في مختلف البلدان العربية، لتصبح شريكاً أساسياً في تعزيز قدرات الأفراد.
            </p>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]">المساهمة في رؤية 2030</h3>
            <p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed">
              تلتزم المنصة بالمساهمة في تحقيق رؤية المملكة 2030 من خلال دعم الإبداع، وتمكين المواهب، وتعزيز جودة الحياة، بما يتماشى مع أهداف الرؤية التي تسعى لبناء مجتمع حيوي يمكن الأفراد من تحقيق إمكانياتهم الكاملة.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Organizational Structure Section -->
    <div class="py-16 px-0 sm:px-4 bg-[var(--p-surface-50)]">
      <div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0">
        <h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">الهيكل التنظيمي</h2>
        <OrganizationalChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import OrganizationalChart from '@/components/OrganizationalChart.vue';

const goals = ref([
  'بناء قاعدة جماهيرية متفاعلة من المواهب الواعدة ومحبي تطوير المهارات.',
  'توفير بيئة شاملة رياضية وثقافية وتنموية واجتماعية لتمكين المواهب وتوسيع آفاقهم.',
  'دعم المواهب وتنمية مهاراتها وتطوير قدراتها للوصول إلى إمكاناتها الكاملة.'
]);

const offers = ref([
  'تقديم برامج تدريبية وورش عمل متخصصة في مجالات متنوعة.',
  'توفير إرشادات وتوجيهات مهنية لدعم تطوير المهارات.',
  'تنظيم فعاليات تعليمية وتدريبية وتنموية لتعزيز التطور المستمر.',
  'بناء مجتمع تفاعلي ومحفز يدعم الطموح والإبداع.'
]);

const fields = ref([
  'الإعلام والإلقاء',
  'الكتابة',
  'التنمية',
  'الصحة واللياقة',
  'الفنون البصرية والتشكيلية',
  'اللغة الإنجليزية',
  'المحاسبة'
]);

const fieldIcons = [
  'pi pi-microphone',
  'pi pi-pencil',
  'pi pi-chart-line',
  'pi pi-heart',
  'pi pi-palette',
  'pi pi-globe',
  'pi pi-calculator'
];

const forums = ref([
  {
    title: 'ملتقى الإعلام والإلقاء',
    description: 'يسعى ملتقى الإعلام والإلقاء إلى تمكين الأفراد من تطوير مهاراتهم في فن التواصل والإلقاء، سواء أمام الجمهور أو عبر وسائل الإعلام المختلفة. يوفر الملتقى برامج تدريبية شاملة تركز على تعزيز الثقة وبناء مهارات التحدث بوضوح وفعالية، مما يساعد المشاركين على إيصال أفكارهم بطريقة مؤثرة وجذابة.',
    objectives: [
      'تمكين الأعضاء من المهارات الإعلامية والإلقائية من خلال تقديم البرامج التدريبية لهم.',
      'تعزيز القدرات الإعلامية للمشاركين لتمكينهم من تقديم المحتوى عبر مختلف وسائل الإعلام.',
      'إعداد متحدثين بارزين في جميع أنواع التعليق الصوتي لإيصال المحتوى باحترافية عالية.'
    ]
  },
  {
    title: 'ملتقى الكتابة',
    description: 'ملتقى الكتابة يهدف إلى تطوير مهارات الكتابة لدى الأفراد في مختلف الأنماط، من الكتابة الإبداعية إلى الكتابة المهنية. يوفر الملتقى برامج تدريبية وورش عمل تساعد المشاركين على تحسين أساليبهم التعبيرية وصياغة الأفكار بوضوح وإبداع، مما يمكنهم من تحويل أفكارهم إلى أعمال مكتوبة متميزة تجذب القراء.',
    objectives: [
      'تطوير قدرات الكتابة في مختلف المجالات عبر برامج تدريبية تعزز مهارات الكتابة.',
      'تشجيع الابتكار والإبداع الكتابي من خلال تقديم بيئة محفزة للتجربة وتطوير الأساليب الأدبية.',
      'إعداد كتاب مؤثرين قادرين على إنتاج محتوى يلهم ويثري المجتمع في المجالات الإبداعية والمهنية.'
    ]
  },
  {
    title: 'ملتقى التنمية',
    description: 'ملتقى التنمية يهدف إلى تطوير الكفاءات والمهارات في أربعة جوانب رئيسية: الفكري، المالي، المهني، والأسري. يسعى الملتقى لتعزيز قدرات الأفراد من خلال برامج تدريبية شاملة تسهم في تمكينهم من تحقيق إمكانياتهم والمشاركة بفعالية في المجتمع.',
    objectives: [
      'الارتقاء بالأعضاء في المجالات التنموية الأربعة (الفكري، المالي، المهني، والأسري) من خلال برامج تدريبية متخصصة.',
      'تحقيق الريادة كوجهة رئيسية للتدريب والتطوير في الجوانب التنموية الحياتية، وتعزيز مهارات الأفراد وقدراتهم بما يسهم في التنمية المجتمعية.'
    ]
  },
  {
    title: 'ملتقى الصحة واللياقة',
    description: 'ملتقى الصحة واللياقة يهدف إلى تحسين صحة الأفراد ولياقتهم من خلال برامج تدريبية شاملة تدعم نمط حياة نشط ومتوازن. يركز هذا المجال على تطوير الوعي الصحي بأهمية التغذية السليمة، واللياقة البدنية، وتقديم التوجيهات التي تساعد الأفراد على تحقيق أهدافهم الصحية والبدنية.',
    objectives: [
      'تعزيز الوعي الصحي ونمط الحياة النشط من خلال تقديم برامج تدريبية تدعم الصحة البدنية والعقلية.',
      'تقديم إرشادات وتدريبات مخصصة تساعد الأفراد على تحقيق أهدافهم الصحية واللياقية.',
      'بناء مجتمع متوازن ومتفاعل يشجع على الالتزام بنمط حياة صحي ومستدام.'
    ]
  },
  {
    title: 'ملتقى اللغة الإنجليزية',
    description: 'ملتقى اللغة الإنجليزية يركز على تطوير جميع المهارات الأساسية في اللغة، بما في ذلك الاستماع، التحدث، القراءة، والكتابة، وذلك من خلال برامج ودورات تدريبية وورش عمل شاملة. يهدف هذا المجال إلى تمكين الأفراد من استخدام اللغة بطلاقة في مختلف المجالات، مما يعزز فرصهم ويزيد من قدرتهم على التفاعل بكفاءة في الحياة اليومية والأكاديمية والمهنية.',
    objectives: [
      'تقديم تجربة تعلم مبتكرة وشاملة عبر برامج تدريبية وورش عمل متميزة.',
      'إمداد المتعلمين بمعرفة متمكنة من اللغة الإنجليزية لدعم تميزهم وتفوقهم.',
      'بناء مجتمع تفاعلي يشجع التطور المستمر ويواكب أحدث أساليب التعليم.'
    ]
  },
  {
    title: 'ملتقى الفنون البصرية والتشكيلية',
    description: 'ملتقى الفنون البصرية والتشكيلية يهدف إلى تطوير وصقل المهارات الإبداعية لدى الأفراد في مجالات الفن المختلفة، مثل الرسم، الخط العربي، التصميم، التصوير، والأعمال اليدوية. يوفر الملتقى برامج تدريبية وورش عمل تشجع على التعبير الفني وتدعم الابتكار، مما يساعد المشاركين على إبراز مواهبهم وتطوير أساليبهم الفنية في بيئة محفزة ومشجعة.',
    objectives: [
      'تنمية المهارات الفنية والإبداعية لدى الأفراد من خلال برامج تدريبية متخصصة.',
      'تشجيع الابتكار والتعبير الفني عبر توفير بيئة محفزة تدعم الإبداع وتطوير أساليب جديدة.',
      'إعداد كوادر فنية قادرة على التأثير والمساهمة في إثراء المشهد الفني والثقافي.'
    ]
  },
  {
    title: 'ملتقى الحاسب',
    description: 'ملتقى الحاسب يهدف إلى تأهيل الأفراد بمهارات حاسوبية، من خلال برامج تدريبية وورش عمل شاملة تركز على أساسيات الحاسب. يساعد هذا المجال المتعلمين على فهم وتطبيق مفاهيم الحاسب الحديثة، مما يفتح أمامهم فرصاً واسعة في مجالات التقنية والابتكار.',
    objectives: [
      'تنمية مهارات الأفراد وتطويرهم لمواكبة احتياجات سوق العمل في مجالات الحاسب الآلي، مع التركيز على تلبية المتطلبات العملية والمهنية.',
      'تقديم برامج تدريبية حديثة وشاملة تغطي مختلف مستويات المعرفة في الحاسب، وتتماشى مع أحدث التطورات التكنولوجية.',
      'تدريب الأعضاء على البرمجة والحاسب باستخدام بيانات تفاعلية وعملية، مما يعزز جاهزيتهم المهنية ويؤهلهم للانخراط في سوق العمل مباشرة بعد الانتهاء من البرنامج.'
    ]
  }
]);
</script>

<style scoped>
.p-tab {
  background: transparent !important;
  color: var(--p-text-color) !important;
}

/* Add responsive styles for tabs */
:deep(.p-tabview-nav) {
  flex-wrap: wrap;
  border-color: var(--p-content-border-color);
}

:deep(.p-tabview-nav li) {
  margin-bottom: 0.5rem;
}

:deep(.p-tabview-nav li .p-tabview-nav-link) {
  background-color: var(--p-card-background);
  color: var(--p-text-color);
  border-color: var(--p-content-border-color);
}

:deep(.p-tabview-nav li.p-highlight .p-tabview-nav-link) {
  background-color: var(--p-primary-color);
  color: var(--p-button-text-primary-color);
  border-color: var(--p-primary-color);
}

:deep(.p-tabview-panels) {
  background-color: var(--p-card-background);
  color: var(--p-text-color);
  border-color: var(--p-content-border-color);
}

/* Add hover states for interactive elements */
:deep(.p-tabview-nav li:not(.p-highlight):not(.p-disabled):hover .p-tabview-nav-link) {
  background-color: var(--p-content-hover-background);
  color: var(--p-content-hover-color);
  border-color: var(--p-primary-color);
}

/* Add transition for theme changes */
.about-section,
.about-section *,
:deep(.p-tabview *) {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Shadow adjustments for dark mode */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
}

:root.dark .shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

/* Rest of existing styles remain unchanged */
:deep(.p-tabview-nav) {
  flex-wrap: wrap;
}

:deep(.p-tabview-nav li) {
  margin-bottom: 0.5rem;
}

@media (max-width: 640px) {
  :deep(.p-tabview-nav) {
    justify-content: flex-start;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  :deep(.p-tabview-nav::-webkit-scrollbar) {
    display: none;
  }

  :deep(.p-tabview-nav li) {
    flex: 0 0 auto;
  }
}

/* Add additional responsive text styles */
@media (max-width: 640px) {
  :deep(.p-tabview-title) {
    font-size: 0.875rem;
  }

  :deep(.p-tab-header) {
    padding: 0.5rem 0.75rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.animate-slideInLeft {
  animation: slideInLeft 1s ease-out;
}

.animate-slideInRight {
  animation: slideInRight 1s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
  animation-fill-mode: both;
}

/* Add smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Add hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Add scroll reveal effect */
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive animations */
@media (prefers-reduced-motion: reduce) {
  .animate-fadeIn,
  .animate-slideInLeft,
  .animate-slideInRight,
  .animate-fadeInUp {
    animation: none;
  }

  .transition-all {
    transition: none;
  }
}
</style>
