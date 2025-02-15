<template>
  <div class="about-section min-h-screen">
    <!-- Hero Section -->
    <div class="hero-section relative py-20 px-4 bg-gradient-to-br from-[var(--p-primary-50)] to-[var(--p-surface-50)] dark:from-[var(--p-surface-800)] dark:to-[var(--p-surface-900)]">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 text-[var(--p-text-color)]">من نحن</h1>
        <p class="text-xl md:text-2xl text-[var(--p-text-muted-color)] max-w-4xl mx-auto leading-relaxed">
          منصة تهدف إلى تعزيز المواهب والقدرات الإبداعية وتطوير المهارات الفردية من خلال تقديم فرص تعليمية وتدريبية شاملة.
        </p>
      </div>
    </div>

    <!-- Vision & Mission Section -->
    <div class="py-16 px-4 bg-[var(--p-surface-0)]">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-[var(--p-text-color)]">رؤيتنا</h2>
            <p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed">
              أن تكون المنصة رائدة في بناء أجيال متكاملة ثقافياً وتنموياً ورياضياً واجتماعياً، وتعزيز الصحة والمواهب في المجتمع.
            </p>
          </div>
          <div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-[var(--p-text-color)]">رسالتنا</h2>
            <p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed">
              تسعى المنصة إلى تقديم العلم والمعرفة من خلال أساليب تدريبية وترفيهية، ودعم المواهب وتطويرها في بيئة ملهمة تعزز من إمكانياتهم وتحقق طموحاتهم.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="py-16 px-4 bg-[var(--p-background-color)]">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">قيمنا</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center">
            <i class="pi pi-verified text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]">الثقة</h3>
            <p class="text-[var(--p-text-muted-color)]">بناء أو تعزيز علاقة موثوقة ومستدامة مع شركائنا ومواهبنا.</p>
          </div>
          <div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center">
            <i class="pi pi-star text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]">التميز</h3>
            <p class="text-[var(--p-text-muted-color)]">تحقيق معايير استثنائية وتقديم الدعم بطريقة مميزة.</p>
          </div>
          <div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center">
            <i class="pi pi-check-circle text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]">المُسؤولية</h3>
            <p class="text-[var(--p-text-muted-color)]">الالتزام بتنمية المواهب وتحقيق الأهداف بوعي وتفانٍ.</p>
          </div>
          <div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center">
            <i class="pi pi-refresh text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]">الاستدامة</h3>
            <p class="text-[var(--p-text-muted-color)]">الالتزام بالنمو والتطور المستدام.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Goals Section -->
    <div class="py-16 px-4 bg-[var(--p-surface-0)]">
      <div class="max-w-6xl mx-auto">
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

    <!-- History Section -->
    <div class="py-16 px-4 bg-[var(--p-background-color)]">
      <div class="max-w-6xl mx-auto">
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
    <div class="py-16 px-4 bg-[var(--p-surface-0)]">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">أثرنا ومستقبلنا</h2>
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

    <!-- Our Fields Section -->
    <div class="py-16 px-4 bg-[var(--p-background-color)]">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">مجالاتنا</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="(field, index) in fields" :key="index"
               class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <i :class="fieldIcons[index]" class="text-3xl mb-4 text-[var(--p-primary-color)]"></i>
            <h3 class="text-xl font-bold text-[var(--p-text-color)]">{{ field }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Forums Section -->
    <div class="py-16 px-4 bg-[var(--p-surface-0)]">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">نبذة تعريفية عن مواهبنا</h2>

        <Tabs>
          <TabPanel v-for="(forum, index) in forums" :key="index" :header="forum.title">
            <div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg">
              <div class="mb-8">
                <p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed">
                  {{ forum.description }}
                </p>
              </div>

              <div class="mt-8">
                <h3 class="text-2xl font-bold mb-6 text-[var(--p-text-color)]">أهداف الملتقى</h3>
                <ul class="space-y-4">
                  <li v-for="(objective, idx) in forum.objectives" :key="idx"
                      class="flex items-start gap-4">
                    <i class="pi pi-check-circle text-[var(--p-primary-color)] mt-1"></i>
                    <span class="text-[var(--p-text-muted-color)]">{{ objective }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Tabs, TabPanel } from 'primevue';

const goals = ref([
  'بناء قاعدة جماهيرية متفاعلة من المواهب الواعدة ومحبي تطوير المهارات.',
  'توفير بيئة شاملة رياضية وثقافية وتنموية واجتماعية لتمكين المواهب وتوسيع آفاقهم.',
  'دعم المواهب وتنمية مهاراتها وتطوير قدراتها للوصول إلى إمكاناتها الكاملة.'
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
  }
]);
</script>

<style scoped>
:deep(.p-tabs-nav) {
  @apply flex flex-wrap justify-center gap-2 border-b border-[var(--p-surface-200)] mb-8;
}

:deep(.p-tabs-nav-link) {
  @apply px-6 py-3 text-[var(--p-text-muted-color)] hover:text-[var(--p-text-color)] transition-colors rounded-t-lg;
}

:deep(.p-tabs-selected .p-tabs-nav-link) {
  @apply bg-[var(--p-primary-color)] text-[var(--p-button-text-primary-color)];
}

:deep(.p-tabs-panels) {
  @apply mt-6;
}
</style>
