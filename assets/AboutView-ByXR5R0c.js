import{B as w,g as k,f as P,a as G,e as E,m as p,R as j,s as $,r as R,w as A,o,c as g,b as f,d as x,h as C,n as z,i as I,j as K,k as J,l as B,p as Q,q as X,t as Y,u as Z,v as d,x as N,y as i,F as b,z as tt,U as O,_ as D,A as V,C as _,D as m,E as L,G as y,H as h,I as at}from"./index-B_xOd3gz.js";var et={root:function(t){var e=t.instance,n=t.props;return["p-tab",{"p-tab-active":e.active,"p-disabled":n.disabled}]}},st=w.extend({name:"tab",classes:et}),nt={name:"BaseTab",extends:$,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:st,provide:function(){return{$pcTab:this,$parentInstance:this}}},F={name:"Tab",extends:nt,inheritAttrs:!1,inject:["$pcTabs","$pcTabList"],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowRightKey:function(t){var e=this.findNextTab(t.currentTarget);e?this.changeFocusedTab(t,e):this.onHomeKey(t),t.preventDefault()},onArrowLeftKey:function(t){var e=this.findPrevTab(t.currentTarget);e?this.changeFocusedTab(t,e):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var e=this.findFirstTab();this.changeFocusedTab(t,e),t.preventDefault()},onEndKey:function(t){var e=this.findLastTab();this.changeFocusedTab(t,e),t.preventDefault()},onPageDownKey:function(t){this.scrollInView(this.findLastTab()),t.preventDefault()},onPageUpKey:function(t){this.scrollInView(this.findFirstTab()),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue(),t.preventDefault()},findNextTab:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=e?t:t.nextElementSibling;return n?k(n,"data-p-disabled")||k(n,"data-pc-section")==="inkbar"?this.findNextTab(n):P(n,'[data-pc-name="tab"]'):null},findPrevTab:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=e?t:t.previousElementSibling;return n?k(n,"data-p-disabled")||k(n,"data-pc-section")==="inkbar"?this.findPrevTab(n):P(n,'[data-pc-name="tab"]'):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.content.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.content.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(t,e){G(e),this.scrollInView(e)},scrollInView:function(t){var e;t==null||(e=t.scrollIntoView)===null||e===void 0||e.call(t,{block:"nearest"})}},computed:{active:function(){var t;return E((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tab_").concat(this.value)},ariaControls:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tabpanel_").concat(this.value)},attrs:function(){return p(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:"tab","aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":"tab","data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}}},directives:{ripple:j}};function it(a,t,e,n,l,s){var u=R("ripple");return a.asChild?x(a.$slots,"default",{key:1,class:z(a.cx("root")),active:s.active,a11yAttrs:s.a11yAttrs,onClick:s.onClick}):A((o(),g(C(a.as),p({key:0,class:a.cx("root"),onClick:s.onClick},s.attrs),{default:f(function(){return[x(a.$slots,"default")]}),_:3},16,["class","onClick"])),[[u]])}F.render=it;var rt={root:"p-tablist",content:function(t){var e=t.instance;return["p-tablist-content",{"p-tablist-viewport":e.$pcTabs.scrollable}]},tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},ot=w.extend({name:"tablist",classes:rt}),lt={name:"BaseTabList",extends:$,props:{},style:ot,provide:function(){return{$pcTabList:this,$parentInstance:this}}},W={name:"TabList",extends:lt,inheritAttrs:!1,inject:["$pcTabs"],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,watch:{showNavigators:function(t){t?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:"post",handler:function(){this.updateInkBar()}}},mounted:function(){var t=this;this.$nextTick(function(){t.updateInkBar()}),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver()},methods:{onScroll:function(t){this.showNavigators&&this.updateButtonState(),t.preventDefault()},onPrevButtonClick:function(){var t=this.$refs.content,e=this.getVisibleButtonWidths(),n=I(t)-e,l=Math.abs(t.scrollLeft),s=n*.8,u=l-s,r=Math.max(u,0);t.scrollLeft=K(t)?-1*r:r},onNextButtonClick:function(){var t=this.$refs.content,e=this.getVisibleButtonWidths(),n=I(t)-e,l=Math.abs(t.scrollLeft),s=n*.8,u=l+s,r=t.scrollWidth-n,v=Math.min(u,r);t.scrollLeft=K(t)?-1*v:v},bindResizeObserver:function(){var t=this;this.resizeObserver=new ResizeObserver(function(){return t.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var t;(t=this.resizeObserver)===null||t===void 0||t.unobserve(this.$refs.list),this.resizeObserver=void 0},updateInkBar:function(){var t=this.$refs,e=t.content,n=t.inkbar,l=t.tabs,s=P(e,'[data-pc-name="tab"][data-p-active="true"]');this.$pcTabs.isVertical()?(n.style.height=J(s)+"px",n.style.top=B(s).top-B(l).top+"px"):(n.style.width=Q(s)+"px",n.style.left=B(s).left-B(l).left+"px")},updateButtonState:function(){var t=this.$refs,e=t.list,n=t.content,l=n.scrollTop,s=n.scrollWidth,u=n.scrollHeight,r=n.offsetWidth,v=n.offsetHeight,c=Math.abs(n.scrollLeft),T=[I(n),X(n)],S=T[0],M=T[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=l!==0,this.isNextButtonEnabled=e.offsetHeight>=v&&parseInt(l)!==u-M):(this.isPrevButtonEnabled=c!==0,this.isNextButtonEnabled=e.offsetWidth>=r&&parseInt(c)!==s-S)},getVisibleButtonWidths:function(){var t=this.$refs,e=t.prevButton,n=t.nextButton,l=0;return this.showNavigators&&(l=((e==null?void 0:e.offsetWidth)||0)+((n==null?void 0:n.offsetWidth)||0)),l}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.scrollable&&this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0}},components:{ChevronLeftIcon:Y,ChevronRightIcon:Z},directives:{ripple:j}},dt=["aria-label","tabindex"],ct=["aria-orientation"],ut=["aria-label","tabindex"];function vt(a,t,e,n,l,s){var u=R("ripple");return o(),d("div",p({ref:"list",class:a.cx("root")},a.ptmi("root")),[s.showNavigators&&l.isPrevButtonEnabled?A((o(),d("button",p({key:0,ref:"prevButton",class:a.cx("prevButton"),"aria-label":s.prevButtonAriaLabel,tabindex:s.$pcTabs.tabindex,onClick:t[0]||(t[0]=function(){return s.onPrevButtonClick&&s.onPrevButtonClick.apply(s,arguments)})},a.ptm("prevButton"),{"data-pc-group-section":"navigator"}),[(o(),g(C(s.templates.previcon||"ChevronLeftIcon"),p({"aria-hidden":"true"},a.ptm("prevIcon")),null,16))],16,dt)),[[u]]):N("",!0),i("div",p({ref:"content",class:a.cx("content"),onScroll:t[1]||(t[1]=function(){return s.onScroll&&s.onScroll.apply(s,arguments)})},a.ptm("content")),[i("div",p({ref:"tabs",class:a.cx("tabList"),role:"tablist","aria-orientation":s.$pcTabs.orientation||"horizontal"},a.ptm("tabList")),[x(a.$slots,"default"),i("span",p({ref:"inkbar",class:a.cx("activeBar"),role:"presentation","aria-hidden":"true"},a.ptm("activeBar")),null,16)],16,ct)],16),s.showNavigators&&l.isNextButtonEnabled?A((o(),d("button",p({key:1,ref:"nextButton",class:a.cx("nextButton"),"aria-label":s.nextButtonAriaLabel,tabindex:s.$pcTabs.tabindex,onClick:t[2]||(t[2]=function(){return s.onNextButtonClick&&s.onNextButtonClick.apply(s,arguments)})},a.ptm("nextButton"),{"data-pc-group-section":"navigator"}),[(o(),g(C(s.templates.nexticon||"ChevronRightIcon"),p({"aria-hidden":"true"},a.ptm("nextIcon")),null,16))],16,ut)),[[u]]):N("",!0)],16)}W.render=vt;var pt={root:function(t){var e=t.instance;return["p-tabpanel",{"p-tabpanel-active":e.active}]}},bt=w.extend({name:"tabpanel",classes:pt}),xt={name:"BaseTabPanel",extends:$,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:bt,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},U={name:"TabPanel",extends:xt,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var t;return E((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tab_").concat(this.value)},attrs:function(){return p(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var t;return{id:this.id,tabindex:(t=this.$pcTabs)===null||t===void 0?void 0:t.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function ht(a,t,e,n,l,s){var u,r;return s.$pcTabs?(o(),d(b,{key:1},[a.asChild?x(a.$slots,"default",{key:1,class:z(a.cx("root")),active:s.active,a11yAttrs:s.a11yAttrs}):(o(),d(b,{key:0},[!((u=s.$pcTabs)!==null&&u!==void 0&&u.lazy)||s.active?A((o(),g(C(a.as),p({key:0,class:a.cx("root")},s.attrs),{default:f(function(){return[x(a.$slots,"default")]}),_:3},16,["class"])),[[tt,(r=s.$pcTabs)!==null&&r!==void 0&&r.lazy?!0:s.active]]):N("",!0)],64))],64)):x(a.$slots,"default",{key:0})}U.render=ht;var ft={root:"p-tabpanels"},mt=w.extend({name:"tabpanels",classes:ft}),gt={name:"BaseTabPanels",extends:$,props:{},style:mt,provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},H={name:"TabPanels",extends:gt,inheritAttrs:!1};function yt(a,t,e,n,l,s){return o(),d("div",p({class:a.cx("root"),role:"presentation"},a.ptmi("root")),[x(a.$slots,"default")],16)}H.render=yt;var wt=function(t){var e=t.dt;return`
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
    background: `.concat(e("tabs.tablist.background"),`;
    border-style: solid;
    border-color: `).concat(e("tabs.tablist.border.color"),`;
    border-width: `).concat(e("tabs.tablist.border.width"),`;
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
    background: `).concat(e("tabs.nav.button.background"),`;
    color: `).concat(e("tabs.nav.button.color"),`;
    width: `).concat(e("tabs.nav.button.width"),`;
    transition: color `).concat(e("tabs.transition.duration"),", outline-color ").concat(e("tabs.transition.duration"),", box-shadow ").concat(e("tabs.transition.duration"),`;
    box-shadow: `).concat(e("tabs.nav.button.shadow"),`;
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: `).concat(e("tabs.nav.button.focus.ring.shadow"),`;
    outline: `).concat(e("tabs.nav.button.focus.ring.width")," ").concat(e("tabs.nav.button.focus.ring.style")," ").concat(e("tabs.nav.button.focus.ring.color"),`;
    outline-offset: `).concat(e("tabs.nav.button.focus.ring.offset"),`;
}

.p-tablist-nav-button:hover {
    color: `).concat(e("tabs.nav.button.hover.color"),`;
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
    background: `).concat(e("tabs.tab.background"),`;
    border-width: `).concat(e("tabs.tab.border.width"),`;
    border-color: `).concat(e("tabs.tab.border.color"),`;
    color: `).concat(e("tabs.tab.color"),`;
    padding: `).concat(e("tabs.tab.padding"),`;
    font-weight: `).concat(e("tabs.tab.font.weight"),`;
    transition: background `).concat(e("tabs.transition.duration"),", border-color ").concat(e("tabs.transition.duration"),", color ").concat(e("tabs.transition.duration"),", outline-color ").concat(e("tabs.transition.duration"),", box-shadow ").concat(e("tabs.transition.duration"),`;
    margin: `).concat(e("tabs.tab.margin"),`;
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: `).concat(e("tabs.tab.focus.ring.shadow"),`;
    outline: `).concat(e("tabs.tab.focus.ring.width")," ").concat(e("tabs.tab.focus.ring.style")," ").concat(e("tabs.tab.focus.ring.color"),`;
    outline-offset: `).concat(e("tabs.tab.focus.ring.offset"),`;
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: `).concat(e("tabs.tab.hover.background"),`;
    border-color: `).concat(e("tabs.tab.hover.border.color"),`;
    color: `).concat(e("tabs.tab.hover.color"),`;
}

.p-tab-active {
    background: `).concat(e("tabs.tab.active.background"),`;
    border-color: `).concat(e("tabs.tab.active.border.color"),`;
    color: `).concat(e("tabs.tab.active.color"),`;
}

.p-tabpanels {
    background: `).concat(e("tabs.tabpanel.background"),`;
    color: `).concat(e("tabs.tabpanel.color"),`;
    padding: `).concat(e("tabs.tabpanel.padding"),`;
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: `).concat(e("tabs.tabpanel.focus.ring.shadow"),`;
    outline: `).concat(e("tabs.tabpanel.focus.ring.width")," ").concat(e("tabs.tabpanel.focus.ring.style")," ").concat(e("tabs.tabpanel.focus.ring.color"),`;
    outline-offset: `).concat(e("tabs.tabpanel.focus.ring.offset"),`;
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    inset-block-end: `).concat(e("tabs.active.bar.bottom"),`;
    height: `).concat(e("tabs.active.bar.height"),`;
    background: `).concat(e("tabs.active.bar.background"),`;
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`)},$t={root:function(t){var e=t.props;return["p-tabs p-component",{"p-tabs-scrollable":e.scrollable}]}},Tt=w.extend({name:"tabs",theme:wt,classes:$t}),kt={name:"BaseTabs",extends:$,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:Tt,provide:function(){return{$pcTabs:this,$parentInstance:this}}},q={name:"Tabs",extends:kt,inheritAttrs:!1,emits:["update:value"],data:function(){return{id:this.$attrs.id,d_value:this.value}},watch:{"$attrs.id":function(t){this.id=t||O()},value:function(t){this.d_value=t}},mounted:function(){this.id=this.id||O()},methods:{updateValue:function(t){this.d_value!==t&&(this.d_value=t,this.$emit("update:value",t))},isVertical:function(){return this.orientation==="vertical"}}};function Bt(a,t,e,n,l,s){return o(),d("div",p({class:a.cx("root")},a.ptmi("root")),[x(a.$slots,"default")],16)}q.render=Bt;const _t={},Lt={class:"org-chart sm:p-8 min-h-screen bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg"};function At(a,t){return o(),d("div",Lt,t[0]||(t[0]=[V('<div class="max-w-7xl mx-auto" data-v-a8899774><div class="flex justify-center mb-16" data-v-a8899774><div class="chart-box" data-v-a8899774>المشرف العام للمنصة</div></div><div class="arrow-container" data-v-a8899774><div class="arrow-down" data-v-a8899774></div></div><div class="flex justify-center mb-16" data-v-a8899774><div class="chart-box" data-v-a8899774>المشرف العام للملتقى</div></div><div class="arrow-container" data-v-a8899774><div class="arrow-down" data-v-a8899774></div></div><div class="flex justify-center mb-16" data-v-a8899774><div class="chart-box" data-v-a8899774>قائد الملتقى</div></div><div class="arrow-container" data-v-a8899774><div class="arrow-down" data-v-a8899774></div></div><div class="flex justify-center mb-16" data-v-a8899774><div class="chart-box" data-v-a8899774>نائب قائد الملتقى</div></div><div class="relative" data-v-a8899774><div class="arrow-container" data-v-a8899774><div class="arrow-down" data-v-a8899774></div></div><div class="arrow-horizontal-container" data-v-a8899774><div class="arrow-horizontal" data-v-a8899774></div></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 justify-items-center max-w-6xl mx-auto mt-8" data-v-a8899774><div class="chart-box" data-v-a8899774>مشرف موهبة</div><div class="chart-box" data-v-a8899774>مشرف معد</div><div class="chart-box" data-v-a8899774>مشرف مقدم</div><div class="chart-box" data-v-a8899774>مشرف إحصاء</div><div class="chart-box" data-v-a8899774>مبادر</div><div class="chart-box" data-v-a8899774>مدرب موهبة</div></div></div>',1)]))}const Ct=D(_t,[["render",At],["__scopeId","data-v-a8899774"]]),St={class:"about-section min-h-screen"},It={class:"py-12 sm:py-16 px-0 sm:px-4"},Pt={class:"w-full sm:max-w-6xl mx-auto px-4 sm:px-0"},Nt={class:"grid grid-cols-1 sm:grid-cols-2 gap-6"},Vt={class:"text-lg text-[var(--p-text-muted-color)]"},zt={class:"py-12 sm:py-16 px-0 sm:px-4"},Kt={class:"w-full sm:max-w-6xl mx-auto px-4 sm:px-0"},Ot={class:"space-y-4"},Et={class:"bg-[var(--p-primary-color)] text-[var(--p-button-text-primary-color)] w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"},jt={class:"text-lg text-[var(--p-text-color)]"},Rt={class:"py-12 sm:py-16 px-0 sm:px-4"},Dt={class:"w-full sm:max-w-6xl mx-auto px-4 sm:px-0"},Ft={class:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"},Wt={class:"text-xl font-bold text-[var(--p-text-color)]"},Ut={class:"py-12 sm:py-16 px-0 sm:px-4"},Ht={class:"w-full sm:max-w-6xl mx-auto px-4 sm:px-0"},qt={class:"bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg"},Mt={class:"mb-8"},Gt={class:"text-lg text-[var(--p-text-muted-color)] leading-relaxed"},Jt={class:"mt-8"},Qt={class:"space-y-4"},Xt={class:"text-[var(--p-text-muted-color)]"},Yt={class:"py-16 px-0 sm:px-4"},Zt={class:"w-full sm:max-w-6xl mx-auto px-4 sm:px-0"},ta={__name:"AboutView",setup(a){const t=_(["بناء قاعدة جماهيرية متفاعلة من المواهب الواعدة ومحبي تطوير المهارات.","توفير بيئة شاملة رياضية وثقافية وتنموية واجتماعية لتمكين المواهب وتوسيع آفاقهم.","دعم المواهب وتنمية مهاراتها وتطوير قدراتها للوصول إلى إمكاناتها الكاملة."]),e=_(["تقديم برامج تدريبية وورش عمل متخصصة في مجالات متنوعة.","توفير إرشادات وتوجيهات مهنية لدعم تطوير المهارات.","تنظيم فعاليات تعليمية وتدريبية وتنموية لتعزيز التطور المستمر.","بناء مجتمع تفاعلي ومحفز يدعم الطموح والإبداع."]),n=_(["الإعلام والإلقاء","الكتابة","التنمية","الصحة واللياقة","الفنون البصرية والتشكيلية","اللغة الإنجليزية","المحاسبة"]),l=["pi pi-microphone","pi pi-pencil","pi pi-chart-line","pi pi-heart","pi pi-palette","pi pi-globe","pi pi-calculator"],s=_([{title:"ملتقى الإعلام والإلقاء",description:"يسعى ملتقى الإعلام والإلقاء إلى تمكين الأفراد من تطوير مهاراتهم في فن التواصل والإلقاء، سواء أمام الجمهور أو عبر وسائل الإعلام المختلفة. يوفر الملتقى برامج تدريبية شاملة تركز على تعزيز الثقة وبناء مهارات التحدث بوضوح وفعالية، مما يساعد المشاركين على إيصال أفكارهم بطريقة مؤثرة وجذابة.",objectives:["تمكين الأعضاء من المهارات الإعلامية والإلقائية من خلال تقديم البرامج التدريبية لهم.","تعزيز القدرات الإعلامية للمشاركين لتمكينهم من تقديم المحتوى عبر مختلف وسائل الإعلام.","إعداد متحدثين بارزين في جميع أنواع التعليق الصوتي لإيصال المحتوى باحترافية عالية."]},{title:"ملتقى الكتابة",description:"ملتقى الكتابة يهدف إلى تطوير مهارات الكتابة لدى الأفراد في مختلف الأنماط، من الكتابة الإبداعية إلى الكتابة المهنية. يوفر الملتقى برامج تدريبية وورش عمل تساعد المشاركين على تحسين أساليبهم التعبيرية وصياغة الأفكار بوضوح وإبداع، مما يمكنهم من تحويل أفكارهم إلى أعمال مكتوبة متميزة تجذب القراء.",objectives:["تطوير قدرات الكتابة في مختلف المجالات عبر برامج تدريبية تعزز مهارات الكتابة.","تشجيع الابتكار والإبداع الكتابي من خلال تقديم بيئة محفزة للتجربة وتطوير الأساليب الأدبية.","إعداد كتاب مؤثرين قادرين على إنتاج محتوى يلهم ويثري المجتمع في المجالات الإبداعية والمهنية."]},{title:"ملتقى التنمية",description:"ملتقى التنمية يهدف إلى تطوير الكفاءات والمهارات في أربعة جوانب رئيسية: الفكري، المالي، المهني، والأسري. يسعى الملتقى لتعزيز قدرات الأفراد من خلال برامج تدريبية شاملة تسهم في تمكينهم من تحقيق إمكانياتهم والمشاركة بفعالية في المجتمع.",objectives:["الارتقاء بالأعضاء في المجالات التنموية الأربعة (الفكري، المالي، المهني، والأسري) من خلال برامج تدريبية متخصصة.","تحقيق الريادة كوجهة رئيسية للتدريب والتطوير في الجوانب التنموية الحياتية، وتعزيز مهارات الأفراد وقدراتهم بما يسهم في التنمية المجتمعية."]},{title:"ملتقى الصحة واللياقة",description:"ملتقى الصحة واللياقة يهدف إلى تحسين صحة الأفراد ولياقتهم من خلال برامج تدريبية شاملة تدعم نمط حياة نشط ومتوازن. يركز هذا المجال على تطوير الوعي الصحي بأهمية التغذية السليمة، واللياقة البدنية، وتقديم التوجيهات التي تساعد الأفراد على تحقيق أهدافهم الصحية والبدنية.",objectives:["تعزيز الوعي الصحي ونمط الحياة النشط من خلال تقديم برامج تدريبية تدعم الصحة البدنية والعقلية.","تقديم إرشادات وتدريبات مخصصة تساعد الأفراد على تحقيق أهدافهم الصحية واللياقية.","بناء مجتمع متوازن ومتفاعل يشجع على الالتزام بنمط حياة صحي ومستدام."]},{title:"ملتقى اللغة الإنجليزية",description:"ملتقى اللغة الإنجليزية يركز على تطوير جميع المهارات الأساسية في اللغة، بما في ذلك الاستماع، التحدث، القراءة، والكتابة، وذلك من خلال برامج ودورات تدريبية وورش عمل شاملة. يهدف هذا المجال إلى تمكين الأفراد من استخدام اللغة بطلاقة في مختلف المجالات، مما يعزز فرصهم ويزيد من قدرتهم على التفاعل بكفاءة في الحياة اليومية والأكاديمية والمهنية.",objectives:["تقديم تجربة تعلم مبتكرة وشاملة عبر برامج تدريبية وورش عمل متميزة.","إمداد المتعلمين بمعرفة متمكنة من اللغة الإنجليزية لدعم تميزهم وتفوقهم.","بناء مجتمع تفاعلي يشجع التطور المستمر ويواكب أحدث أساليب التعليم."]},{title:"ملتقى الفنون البصرية والتشكيلية",description:"ملتقى الفنون البصرية والتشكيلية يهدف إلى تطوير وصقل المهارات الإبداعية لدى الأفراد في مجالات الفن المختلفة، مثل الرسم، الخط العربي، التصميم، التصوير، والأعمال اليدوية. يوفر الملتقى برامج تدريبية وورش عمل تشجع على التعبير الفني وتدعم الابتكار، مما يساعد المشاركين على إبراز مواهبهم وتطوير أساليبهم الفنية في بيئة محفزة ومشجعة.",objectives:["تنمية المهارات الفنية والإبداعية لدى الأفراد من خلال برامج تدريبية متخصصة.","تشجيع الابتكار والتعبير الفني عبر توفير بيئة محفزة تدعم الإبداع وتطوير أساليب جديدة.","إعداد كوادر فنية قادرة على التأثير والمساهمة في إثراء المشهد الفني والثقافي."]},{title:"ملتقى الحاسب",description:"ملتقى الحاسب يهدف إلى تأهيل الأفراد بمهارات حاسوبية، من خلال برامج تدريبية وورش عمل شاملة تركز على أساسيات الحاسب. يساعد هذا المجال المتعلمين على فهم وتطبيق مفاهيم الحاسب الحديثة، مما يفتح أمامهم فرصاً واسعة في مجالات التقنية والابتكار.",objectives:["تنمية مهارات الأفراد وتطويرهم لمواكبة احتياجات سوق العمل في مجالات الحاسب الآلي، مع التركيز على تلبية المتطلبات العملية والمهنية.","تقديم برامج تدريبية حديثة وشاملة تغطي مختلف مستويات المعرفة في الحاسب، وتتماشى مع أحدث التطورات التكنولوجية.","تدريب الأعضاء على البرمجة والحاسب باستخدام بيانات تفاعلية وعملية، مما يعزز جاهزيتهم المهنية ويؤهلهم للانخراط في سوق العمل مباشرة بعد الانتهاء من البرنامج."]}]);return(u,r)=>(o(),d("div",St,[r[8]||(r[8]=V('<div class="hero-section relative py-12 sm:py-20 px-0 sm:px-4 animate-fadeIn" data-v-087c802d><div class="w-full sm:max-w-6xl mx-auto text-center px-4" data-v-087c802d><h1 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-[var(--p-text-color)]" data-v-087c802d>من نحن</h1><p class="text-base sm:text-xl md:text-2xl text-[var(--p-text-muted-color)] max-w-4xl mx-auto leading-relaxed px-2" data-v-087c802d> منصة تهدف إلى تعزيز المواهب والقدرات الإبداعية وتطوير المهارات الفردية من خلال تقديم فرص تعليمية وتدريبية شاملة. </p></div></div><div class="py-12 sm:py-16 px-0 sm:px-4" data-v-087c802d><div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0" data-v-087c802d><div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" data-v-087c802d><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg animate-slideInLeft" data-v-087c802d><h2 class="text-2xl sm:text-3xl font-bold mb-6 text-[var(--p-text-color)]" data-v-087c802d>رؤيتنا</h2><p class="text-base sm:text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-087c802d> أن تكون المنصة رائدة في بناء أجيال متكاملة ثقافياً وتنموياً ورياضياً واجتماعياً، وتعزيز الصحة والمواهب في المجتمع. </p></div><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg animate-slideInRight" data-v-087c802d><h2 class="text-2xl sm:text-3xl font-bold mb-6 text-[var(--p-text-color)]" data-v-087c802d>رسالتنا</h2><p class="text-base sm:text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-087c802d> تسعى المنصة إلى تقديم العلم والمعرفة من خلال أساليب تدريبية وترفيهية، ودعم المواهب وتطويرها في بيئة ملهمة تعزز من إمكانياتهم وتحقق طموحاتهم. </p></div></div></div></div><div class="py-12 sm:py-16 px-0 sm:px-4" data-v-087c802d><div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0" data-v-087c802d><h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)] animate-fadeIn" data-v-087c802d>قيمنا</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-v-087c802d><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 animate-fadeInUp" style="animation-delay:0ms;" data-v-087c802d><i class="pi pi-verified text-2xl sm:text-3xl mb-4 text-[var(--p-primary-color)]" data-v-087c802d></i><h3 class="text-lg sm:text-xl font-bold mb-3 text-[var(--p-text-color)]" data-v-087c802d>الثقة</h3><p class="text-sm sm:text-base text-[var(--p-text-muted-color)]" data-v-087c802d>بناء أو تعزيز علاقة موثوقة ومستدامة مع شركائنا ومواهبنا.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 animate-fadeInUp" style="animation-delay:200ms;" data-v-087c802d><i class="pi pi-star text-2xl sm:text-3xl mb-4 text-[var(--p-primary-color)]" data-v-087c802d></i><h3 class="text-lg sm:text-xl font-bold mb-3 text-[var(--p-text-color)]" data-v-087c802d>التميز</h3><p class="text-sm sm:text-base text-[var(--p-text-muted-color)]" data-v-087c802d>تحقيق معايير استثنائية وتقديم الدعم بطريقة مميزة.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 animate-fadeInUp" style="animation-delay:400ms;" data-v-087c802d><i class="pi pi-check-circle text-2xl sm:text-3xl mb-4 text-[var(--p-primary-color)]" data-v-087c802d></i><h3 class="text-lg sm:text-xl font-bold mb-3 text-[var(--p-text-color)]" data-v-087c802d>المُسؤولية</h3><p class="text-sm sm:text-base text-[var(--p-text-muted-color)]" data-v-087c802d>الالتزام بتنمية المواهب وتحقيق الأهداف بوعي وتفانٍ.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 animate-fadeInUp" style="animation-delay:600ms;" data-v-087c802d><i class="pi pi-refresh text-2xl sm:text-3xl mb-4 text-[var(--p-primary-color)]" data-v-087c802d></i><h3 class="text-lg sm:text-xl font-bold mb-3 text-[var(--p-text-color)]" data-v-087c802d>الاستدامة</h3><p class="text-sm sm:text-base text-[var(--p-text-muted-color)]" data-v-087c802d>الالتزام بالنمو والتطور المستدام.</p></div></div></div></div>',3)),i("div",It,[i("div",Pt,[r[1]||(r[1]=i("h2",{class:"text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)]"},"ماذا نقدم؟",-1)),i("div",Nt,[(o(!0),d(b,null,m(e.value,(v,c)=>(o(),d("div",{key:c,class:"bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg flex items-start gap-4"},[r[0]||(r[0]=i("i",{class:"pi pi-check-circle text-xl text-[var(--p-primary-color)] mt-1"},null,-1)),i("p",Vt,h(v),1)]))),128))])])]),i("div",zt,[i("div",Kt,[r[2]||(r[2]=i("h2",{class:"text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]"},"أهدافنا",-1)),i("div",Ot,[(o(!0),d(b,null,m(t.value,(v,c)=>(o(),d("div",{key:c,class:"bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg flex items-center gap-4"},[i("div",Et,h(c+1),1),i("p",jt,h(v),1)]))),128))])])]),i("div",Rt,[i("div",Dt,[r[3]||(r[3]=i("h2",{class:"text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)]"},"مجالاتنا",-1)),i("div",Ft,[(o(!0),d(b,null,m(n.value,(v,c)=>(o(),d("div",{key:c,class:"bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105"},[i("i",{class:z([l[c],"text-3xl mb-4 text-[var(--p-primary-color)]"])},null,2),i("h3",Wt,h(v),1)]))),128))])])]),i("div",Ut,[i("div",Ht,[r[6]||(r[6]=i("h2",{class:"text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)]"},"نبذة تعريفية عن مواهبنا",-1)),L(y(q),{value:"0",scrollable:""},{default:f(()=>[L(y(W),null,{default:f(()=>[(o(!0),d(b,null,m(s.value,(v,c)=>(o(),g(y(F),{key:c,value:c.toString()},{default:f(()=>[at(h(v.title),1)]),_:2},1032,["value"]))),128))]),_:1}),L(y(H),null,{default:f(()=>[(o(!0),d(b,null,m(s.value,(v,c)=>(o(),g(y(U),{key:c,value:c.toString()},{default:f(()=>[i("div",qt,[i("div",Mt,[i("p",Gt,h(v.description),1)]),i("div",Jt,[r[5]||(r[5]=i("h3",{class:"text-2xl font-bold mb-6 text-[var(--p-text-color)]"},"أهداف الملتقى",-1)),i("ul",Qt,[(o(!0),d(b,null,m(v.objectives,(T,S)=>(o(),d("li",{key:S,class:"flex items-start gap-4"},[r[4]||(r[4]=i("i",{class:"pi pi-check-circle text-[var(--p-primary-color)] mt-1"},null,-1)),i("span",Xt,h(T),1)]))),128))])])])]),_:2},1032,["value"]))),128))]),_:1})]),_:1})])]),r[9]||(r[9]=V('<div class="py-12 sm:py-16 px-0 sm:px-4" data-v-087c802d><div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0" data-v-087c802d><h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]" data-v-087c802d>تاريخنا</h2><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg" data-v-087c802d><div class="space-y-6" data-v-087c802d><div class="flex gap-4" data-v-087c802d><div class="flex-shrink-0" data-v-087c802d><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2" data-v-087c802d></div></div><div data-v-087c802d><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]" data-v-087c802d>2020 - التأسيس</h3><p class="text-[var(--p-text-muted-color)]" data-v-087c802d> تأسست منصة &quot;خيط وإبرة&quot; في أبريل 2020، في خضم أزمة جائحة كورونا، على يد المؤسس ريان القرشي. </p></div></div><div class="flex gap-4" data-v-087c802d><div class="flex-shrink-0" data-v-087c802d><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2" data-v-087c802d></div></div><div data-v-087c802d><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]" data-v-087c802d>2021 - التوسع</h3><p class="text-[var(--p-text-muted-color)]" data-v-087c802d> في يونيو 2021، أطلقت المنصة ملتقياتها الخاصة لدعم المواهب، لتصبح منبراً جامعاً للموهوبين والهواة. </p></div></div><div class="flex gap-4" data-v-087c802d><div class="flex-shrink-0" data-v-087c802d><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2" data-v-087c802d></div></div><div data-v-087c802d><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]" data-v-087c802d>اليوم</h3><p class="text-[var(--p-text-muted-color)]" data-v-087c802d> تضم المنصة اليوم أكثر من 25,000 متابع وتدعم مجموعة واسعة من المواهب في مجالات متعددة. </p></div></div></div></div></div></div><div class="py-12 sm:py-16 px-0 sm:px-4" data-v-087c802d><div class="w-full sm:max-w-6xl mx-auto px-4 sm:px-0" data-v-087c802d><h2 class="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--p-text-color)]" data-v-087c802d>أثرنا ومستقبلنا</h2><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg space-y-8" data-v-087c802d><div data-v-087c802d><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]" data-v-087c802d>امتداد التأثير</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-087c802d> واليوم، وبعد ثلاثة أعوام من العطاء، امتدت تأثيرات المنصة وانتشارها جغرافياً، حيث جذبت مواهب من المملكة العربية السعودية أولاً، ومن ثم من مختلف الدول العربية، بما في ذلك العراق وسوريا ومصر والأردن والجزائر واليمن وغيرها من الدول، مما جعلها حاضنة إبداعية على مستوى الوطن العربي. </p></div><div data-v-087c802d><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]" data-v-087c802d>رؤيتنا المستقبلية</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-087c802d> تواصل منصة &quot;خيط وإبرة&quot; رسالتها الرائدة في دعم الموهوبين وتطوير مهاراتهم، مع رؤية مستقبلية طموحة تهدف إلى أن تصل إلى كل بيت سعودي أولاً، ومن ثم البيوت في مختلف البلدان العربية، لتصبح شريكاً أساسياً في تعزيز قدرات الأفراد. </p></div><div data-v-087c802d><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]" data-v-087c802d>المساهمة في رؤية 2030</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed" data-v-087c802d> تلتزم المنصة بالمساهمة في تحقيق رؤية المملكة 2030 من خلال دعم الإبداع، وتمكين المواهب، وتعزيز جودة الحياة، بما يتماشى مع أهداف الرؤية التي تسعى لبناء مجتمع حيوي يمكن الأفراد من تحقيق إمكانياتهم الكاملة. </p></div></div></div></div>',2)),i("div",Yt,[i("div",Zt,[r[7]||(r[7]=i("h2",{class:"text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]"},"الهيكل التنظيمي",-1)),L(Ct)])])]))}},ea=D(ta,[["__scopeId","data-v-087c802d"]]);export{ea as default};
