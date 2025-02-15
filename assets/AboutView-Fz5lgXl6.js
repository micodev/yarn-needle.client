import{B as k,e as z,m,s as _,r as b,o as s,c as d,F as i,w as C,v as V,a as $,b as f,d as j,f as N,n as T,U as g,_ as I,g as h,h as y,i as o,j as p,k as q,u as w,t as v}from"./index-CyWD6cMW.js";var D={root:function(a){var t=a.instance;return["p-tabpanel",{"p-tabpanel-active":t.active}]}},L=k.extend({name:"tabpanel",classes:D}),F={name:"BaseTabPanel",extends:_,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:L,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},B={name:"TabPanel",extends:F,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var a;return z((a=this.$pcTabs)===null||a===void 0?void 0:a.d_value,this.value)},id:function(){var a;return"".concat((a=this.$pcTabs)===null||a===void 0?void 0:a.id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var a;return"".concat((a=this.$pcTabs)===null||a===void 0?void 0:a.id,"_tab_").concat(this.value)},attrs:function(){return m(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var a;return{id:this.id,tabindex:(a=this.$pcTabs)===null||a===void 0?void 0:a.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function O(e,a,t,u,x,l){var n,r;return l.$pcTabs?(s(),d(i,{key:1},[e.asChild?b(e.$slots,"default",{key:1,class:T(e.cx("root")),active:l.active,a11yAttrs:l.a11yAttrs}):(s(),d(i,{key:0},[!((n=l.$pcTabs)!==null&&n!==void 0&&n.lazy)||l.active?C((s(),$(j(e.as),m({key:0,class:e.cx("root")},l.attrs),{default:f(function(){return[b(e.$slots,"default")]}),_:3},16,["class"])),[[V,(r=l.$pcTabs)!==null&&r!==void 0&&r.lazy?!0:l.active]]):N("",!0)],64))],64)):b(e.$slots,"default",{key:0})}B.render=O;var U=function(a){var t=a.dt;return`
.p-tabs {
    display: flex;
    flex-direction: column;
}

.p-tablist {
    display: flex;
    position: relative;
}

.p-tabs-scrollable > .p-tablist {
    overflow: hidden;
}

.p-tablist-viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tablist-viewport::-webkit-scrollbar {
    display: none;
}

.p-tablist-tab-list {
    position: relative;
    display: flex;
    background: `.concat(t("tabs.tablist.background"),`;
    border-style: solid;
    border-color: `).concat(t("tabs.tablist.border.color"),`;
    border-width: `).concat(t("tabs.tablist.border.width"),`;
}

.p-tablist-content {
    flex-grow: 1;
}

.p-tablist-nav-button {
    all: unset;
    position: absolute !important;
    flex-shrink: 0;
    inset-block-start: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: `).concat(t("tabs.nav.button.background"),`;
    color: `).concat(t("tabs.nav.button.color"),`;
    width: `).concat(t("tabs.nav.button.width"),`;
    transition: color `).concat(t("tabs.transition.duration"),", outline-color ").concat(t("tabs.transition.duration"),", box-shadow ").concat(t("tabs.transition.duration"),`;
    box-shadow: `).concat(t("tabs.nav.button.shadow"),`;
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: `).concat(t("tabs.nav.button.focus.ring.shadow"),`;
    outline: `).concat(t("tabs.nav.button.focus.ring.width")," ").concat(t("tabs.nav.button.focus.ring.style")," ").concat(t("tabs.nav.button.focus.ring.color"),`;
    outline-offset: `).concat(t("tabs.nav.button.focus.ring.offset"),`;
}

.p-tablist-nav-button:hover {
    color: `).concat(t("tabs.nav.button.hover.color"),`;
}

.p-tablist-prev-button {
    inset-inline-start: 0;
}

.p-tablist-next-button {
    inset-inline-end: 0;
}

.p-tablist-prev-button:dir(rtl),
.p-tablist-next-button:dir(rtl) {
    transform: rotate(180deg);
}


.p-tab {
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    position: relative;
    border-style: solid;
    white-space: nowrap;
    background: `).concat(t("tabs.tab.background"),`;
    border-width: `).concat(t("tabs.tab.border.width"),`;
    border-color: `).concat(t("tabs.tab.border.color"),`;
    color: `).concat(t("tabs.tab.color"),`;
    padding: `).concat(t("tabs.tab.padding"),`;
    font-weight: `).concat(t("tabs.tab.font.weight"),`;
    transition: background `).concat(t("tabs.transition.duration"),", border-color ").concat(t("tabs.transition.duration"),", color ").concat(t("tabs.transition.duration"),", outline-color ").concat(t("tabs.transition.duration"),", box-shadow ").concat(t("tabs.transition.duration"),`;
    margin: `).concat(t("tabs.tab.margin"),`;
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: `).concat(t("tabs.tab.focus.ring.shadow"),`;
    outline: `).concat(t("tabs.tab.focus.ring.width")," ").concat(t("tabs.tab.focus.ring.style")," ").concat(t("tabs.tab.focus.ring.color"),`;
    outline-offset: `).concat(t("tabs.tab.focus.ring.offset"),`;
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: `).concat(t("tabs.tab.hover.background"),`;
    border-color: `).concat(t("tabs.tab.hover.border.color"),`;
    color: `).concat(t("tabs.tab.hover.color"),`;
}

.p-tab-active {
    background: `).concat(t("tabs.tab.active.background"),`;
    border-color: `).concat(t("tabs.tab.active.border.color"),`;
    color: `).concat(t("tabs.tab.active.color"),`;
}

.p-tabpanels {
    background: `).concat(t("tabs.tabpanel.background"),`;
    color: `).concat(t("tabs.tabpanel.color"),`;
    padding: `).concat(t("tabs.tabpanel.padding"),`;
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: `).concat(t("tabs.tabpanel.focus.ring.shadow"),`;
    outline: `).concat(t("tabs.tabpanel.focus.ring.width")," ").concat(t("tabs.tabpanel.focus.ring.style")," ").concat(t("tabs.tabpanel.focus.ring.color"),`;
    outline-offset: `).concat(t("tabs.tabpanel.focus.ring.offset"),`;
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    inset-block-end: `).concat(t("tabs.active.bar.bottom"),`;
    height: `).concat(t("tabs.active.bar.height"),`;
    background: `).concat(t("tabs.active.bar.background"),`;
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`)},E={root:function(a){var t=a.props;return["p-tabs p-component",{"p-tabs-scrollable":t.scrollable}]}},G=k.extend({name:"tabs",theme:U,classes:E}),H={name:"BaseTabs",extends:_,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:G,provide:function(){return{$pcTabs:this,$parentInstance:this}}},S={name:"Tabs",extends:H,inheritAttrs:!1,emits:["update:value"],data:function(){return{id:this.$attrs.id,d_value:this.value}},watch:{"$attrs.id":function(a){this.id=a||g()},value:function(a){this.d_value=a}},mounted:function(){this.id=this.id||g()},methods:{updateValue:function(a){this.d_value!==a&&(this.d_value=a,this.$emit("update:value",a))},isVertical:function(){return this.orientation==="vertical"}}};function J(e,a,t,u,x,l){return s(),d("div",m({class:e.cx("root")},e.ptmi("root")),[b(e.$slots,"default")],16)}S.render=J;const K={class:"about-section min-h-screen"},M={class:"py-16 px-4 bg-[var(--p-surface-0)]"},Q={class:"max-w-6xl mx-auto"},R={class:"space-y-4"},W={class:"bg-[var(--p-primary-color)] text-[var(--p-button-text-primary-color)] w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"},X={class:"text-lg text-[var(--p-text-color)]"},Y={class:"py-16 px-4 bg-[var(--p-background-color)]"},Z={class:"max-w-6xl mx-auto"},tt={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"},at={class:"text-xl font-bold text-[var(--p-text-color)]"},et={class:"py-16 px-4 bg-[var(--p-surface-0)]"},ot={class:"max-w-6xl mx-auto"},nt={class:"bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg"},st={class:"mb-8"},rt={class:"text-lg text-[var(--p-text-muted-color)] leading-relaxed"},dt={class:"mt-8"},lt={class:"space-y-4"},ct={class:"text-[var(--p-text-muted-color)]"},it={__name:"AboutView",setup(e){const a=h(["بناء قاعدة جماهيرية متفاعلة من المواهب الواعدة ومحبي تطوير المهارات.","توفير بيئة شاملة رياضية وثقافية وتنموية واجتماعية لتمكين المواهب وتوسيع آفاقهم.","دعم المواهب وتنمية مهاراتها وتطوير قدراتها للوصول إلى إمكاناتها الكاملة."]),t=h(["الإعلام والإلقاء","الكتابة","التنمية","الصحة واللياقة","الفنون البصرية والتشكيلية","اللغة الإنجليزية","المحاسبة"]),u=["pi pi-microphone","pi pi-pencil","pi pi-chart-line","pi pi-heart","pi pi-palette","pi pi-globe","pi pi-calculator"],x=h([{title:"ملتقى الإعلام والإلقاء",description:"يسعى ملتقى الإعلام والإلقاء إلى تمكين الأفراد من تطوير مهاراتهم في فن التواصل والإلقاء، سواء أمام الجمهور أو عبر وسائل الإعلام المختلفة. يوفر الملتقى برامج تدريبية شاملة تركز على تعزيز الثقة وبناء مهارات التحدث بوضوح وفعالية، مما يساعد المشاركين على إيصال أفكارهم بطريقة مؤثرة وجذابة.",objectives:["تمكين الأعضاء من المهارات الإعلامية والإلقائية من خلال تقديم البرامج التدريبية لهم.","تعزيز القدرات الإعلامية للمشاركين لتمكينهم من تقديم المحتوى عبر مختلف وسائل الإعلام.","إعداد متحدثين بارزين في جميع أنواع التعليق الصوتي لإيصال المحتوى باحترافية عالية."]},{title:"ملتقى الكتابة",description:"ملتقى الكتابة يهدف إلى تطوير مهارات الكتابة لدى الأفراد في مختلف الأنماط، من الكتابة الإبداعية إلى الكتابة المهنية. يوفر الملتقى برامج تدريبية وورش عمل تساعد المشاركين على تحسين أساليبهم التعبيرية وصياغة الأفكار بوضوح وإبداع، مما يمكنهم من تحويل أفكارهم إلى أعمال مكتوبة متميزة تجذب القراء.",objectives:["تطوير قدرات الكتابة في مختلف المجالات عبر برامج تدريبية تعزز مهارات الكتابة.","تشجيع الابتكار والإبداع الكتابي من خلال تقديم بيئة محفزة للتجربة وتطوير الأساليب الأدبية.","إعداد كتاب مؤثرين قادرين على إنتاج محتوى يلهم ويثري المجتمع في المجالات الإبداعية والمهنية."]}]);return(l,n)=>(s(),d("div",K,[n[5]||(n[5]=y('<div class="hero-section relative py-20 px-4 bg-gradient-to-br from-[var(--p-primary-50)] to-[var(--p-surface-50)] dark:from-[var(--p-surface-800)] dark:to-[var(--p-surface-900)]" data-v-7469d29e><div class="max-w-6xl mx-auto text-center" data-v-7469d29e><h1 class="text-5xl md:text-6xl font-bold mb-6 text-[var(--p-text-color)]" data-v-7469d29e>من نحن</h1><p class="text-xl md:text-2xl text-[var(--p-text-muted-color)] max-w-4xl mx-auto leading-relaxed" data-v-7469d29e> منصة تهدف إلى تعزيز المواهب والقدرات الإبداعية وتطوير المهارات الفردية من خلال تقديم فرص تعليمية وتدريبية شاملة. </p></div></div><div class="py-16 px-4 bg-[var(--p-surface-0)]" data-v-7469d29e><div class="max-w-6xl mx-auto" data-v-7469d29e><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-7469d29e><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg" data-v-7469d29e><h2 class="text-3xl font-bold mb-6 text-[var(--p-text-color)]" data-v-7469d29e>رؤيتنا</h2><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-7469d29e> أن تكون المنصة رائدة في بناء أجيال متكاملة ثقافياً وتنموياً ورياضياً واجتماعياً، وتعزيز الصحة والمواهب في المجتمع. </p></div><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg" data-v-7469d29e><h2 class="text-3xl font-bold mb-6 text-[var(--p-text-color)]" data-v-7469d29e>رسالتنا</h2><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-7469d29e> تسعى المنصة إلى تقديم العلم والمعرفة من خلال أساليب تدريبية وترفيهية، ودعم المواهب وتطويرها في بيئة ملهمة تعزز من إمكانياتهم وتحقق طموحاتهم. </p></div></div></div></div><div class="py-16 px-4 bg-[var(--p-background-color)]" data-v-7469d29e><div class="max-w-6xl mx-auto" data-v-7469d29e><h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]" data-v-7469d29e>قيمنا</h2><div class="grid grid-cols-1 md:grid-cols-4 gap-6" data-v-7469d29e><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center" data-v-7469d29e><i class="pi pi-verified text-3xl mb-4 text-[var(--p-primary-color)]" data-v-7469d29e></i><h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]" data-v-7469d29e>الثقة</h3><p class="text-[var(--p-text-muted-color)]" data-v-7469d29e>بناء أو تعزيز علاقة موثوقة ومستدامة مع شركائنا ومواهبنا.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center" data-v-7469d29e><i class="pi pi-star text-3xl mb-4 text-[var(--p-primary-color)]" data-v-7469d29e></i><h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]" data-v-7469d29e>التميز</h3><p class="text-[var(--p-text-muted-color)]" data-v-7469d29e>تحقيق معايير استثنائية وتقديم الدعم بطريقة مميزة.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center" data-v-7469d29e><i class="pi pi-check-circle text-3xl mb-4 text-[var(--p-primary-color)]" data-v-7469d29e></i><h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]" data-v-7469d29e>المُسؤولية</h3><p class="text-[var(--p-text-muted-color)]" data-v-7469d29e>الالتزام بتنمية المواهب وتحقيق الأهداف بوعي وتفانٍ.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center" data-v-7469d29e><i class="pi pi-refresh text-3xl mb-4 text-[var(--p-primary-color)]" data-v-7469d29e></i><h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]" data-v-7469d29e>الاستدامة</h3><p class="text-[var(--p-text-muted-color)]" data-v-7469d29e>الالتزام بالنمو والتطور المستدام.</p></div></div></div></div>',3)),o("div",M,[o("div",Q,[n[0]||(n[0]=o("h2",{class:"text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]"},"أهدافنا",-1)),o("div",R,[(s(!0),d(i,null,p(a.value,(r,c)=>(s(),d("div",{key:c,class:"bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg flex items-center gap-4"},[o("div",W,v(c+1),1),o("p",X,v(r),1)]))),128))])])]),n[6]||(n[6]=y('<div class="py-16 px-4 bg-[var(--p-background-color)]" data-v-7469d29e><div class="max-w-6xl mx-auto" data-v-7469d29e><h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]" data-v-7469d29e>تاريخنا</h2><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg" data-v-7469d29e><div class="space-y-6" data-v-7469d29e><div class="flex gap-4" data-v-7469d29e><div class="flex-shrink-0" data-v-7469d29e><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2" data-v-7469d29e></div></div><div data-v-7469d29e><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]" data-v-7469d29e>2020 - التأسيس</h3><p class="text-[var(--p-text-muted-color)]" data-v-7469d29e> تأسست منصة &quot;خيط وإبرة&quot; في أبريل 2020، في خضم أزمة جائحة كورونا، على يد المؤسس ريان القرشي. </p></div></div><div class="flex gap-4" data-v-7469d29e><div class="flex-shrink-0" data-v-7469d29e><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2" data-v-7469d29e></div></div><div data-v-7469d29e><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]" data-v-7469d29e>2021 - التوسع</h3><p class="text-[var(--p-text-muted-color)]" data-v-7469d29e> في يونيو 2021، أطلقت المنصة ملتقياتها الخاصة لدعم المواهب، لتصبح منبراً جامعاً للموهوبين والهواة. </p></div></div><div class="flex gap-4" data-v-7469d29e><div class="flex-shrink-0" data-v-7469d29e><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2" data-v-7469d29e></div></div><div data-v-7469d29e><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]" data-v-7469d29e>اليوم</h3><p class="text-[var(--p-text-muted-color)]" data-v-7469d29e> تضم المنصة اليوم أكثر من 25,000 متابع وتدعم مجموعة واسعة من المواهب في مجالات متعددة. </p></div></div></div></div></div></div><div class="py-16 px-4 bg-[var(--p-surface-0)]" data-v-7469d29e><div class="max-w-6xl mx-auto" data-v-7469d29e><h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]" data-v-7469d29e>أثرنا ومستقبلنا</h2><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg space-y-8" data-v-7469d29e><div data-v-7469d29e><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]" data-v-7469d29e>امتداد التأثير</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-7469d29e> واليوم، وبعد ثلاثة أعوام من العطاء، امتدت تأثيرات المنصة وانتشارها جغرافياً، حيث جذبت مواهب من المملكة العربية السعودية أولاً، ومن ثم من مختلف الدول العربية، بما في ذلك العراق وسوريا ومصر والأردن والجزائر واليمن وغيرها من الدول، مما جعلها حاضنة إبداعية على مستوى الوطن العربي. </p></div><div data-v-7469d29e><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]" data-v-7469d29e>رؤيتنا المستقبلية</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-7469d29e> تواصل منصة &quot;خيط وإبرة&quot; رسالتها الرائدة في دعم الموهوبين وتطوير مهاراتهم، مع رؤية مستقبلية طموحة تهدف إلى أن تصل إلى كل بيت سعودي أولاً، ومن ثم البيوت في مختلف البلدان العربية، لتصبح شريكاً أساسياً في تعزيز قدرات الأفراد. </p></div><div data-v-7469d29e><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]" data-v-7469d29e>المساهمة في رؤية 2030</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-7469d29e> تلتزم المنصة بالمساهمة في تحقيق رؤية المملكة 2030 من خلال دعم الإبداع، وتمكين المواهب، وتعزيز جودة الحياة، بما يتماشى مع أهداف الرؤية التي تسعى لبناء مجتمع حيوي يمكن الأفراد من تحقيق إمكانياتهم الكاملة. </p></div></div></div></div>',2)),o("div",Y,[o("div",Z,[n[1]||(n[1]=o("h2",{class:"text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]"},"مجالاتنا",-1)),o("div",tt,[(s(!0),d(i,null,p(t.value,(r,c)=>(s(),d("div",{key:c,class:"bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105"},[o("i",{class:T([u[c],"text-3xl mb-4 text-[var(--p-primary-color)]"])},null,2),o("h3",at,v(r),1)]))),128))])])]),o("div",et,[o("div",ot,[n[4]||(n[4]=o("h2",{class:"text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]"},"نبذة تعريفية عن مواهبنا",-1)),q(w(S),null,{default:f(()=>[(s(!0),d(i,null,p(x.value,(r,c)=>(s(),$(w(B),{key:c,header:r.title},{default:f(()=>[o("div",nt,[o("div",st,[o("p",rt,v(r.description),1)]),o("div",dt,[n[3]||(n[3]=o("h3",{class:"text-2xl font-bold mb-6 text-[var(--p-text-color)]"},"أهداف الملتقى",-1)),o("ul",lt,[(s(!0),d(i,null,p(r.objectives,(P,A)=>(s(),d("li",{key:A,class:"flex items-start gap-4"},[n[2]||(n[2]=o("i",{class:"pi pi-check-circle text-[var(--p-primary-color)] mt-1"},null,-1)),o("span",ct,v(P),1)]))),128))])])])]),_:2},1032,["header"]))),128))]),_:1})])])]))}},pt=I(it,[["__scopeId","data-v-7469d29e"]]);export{pt as default};
