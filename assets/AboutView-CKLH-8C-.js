import{B as $,g as k,f as N,a as M,e as O,m as b,R as E,s as w,r as D,w as _,o as l,c as x,b as v,d as p,h as L,n as A,i as C,j as I,k as G,l as B,p as J,q as Q,t as X,u as Y,v as d,x as V,y as o,F as h,z as Z,U as K,A as P,C as z,D as m,E as S,G as y,H as f,I as tt}from"./index-WWZDk80g.js";var et={root:function(t){var a=t.instance,s=t.props;return["p-tab",{"p-tab-active":a.active,"p-disabled":s.disabled}]}},at=$.extend({name:"tab",classes:et}),nt={name:"BaseTab",extends:w,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:at,provide:function(){return{$pcTab:this,$parentInstance:this}}},F={name:"Tab",extends:nt,inheritAttrs:!1,inject:["$pcTabs","$pcTabList"],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowRightKey:function(t){var a=this.findNextTab(t.currentTarget);a?this.changeFocusedTab(t,a):this.onHomeKey(t),t.preventDefault()},onArrowLeftKey:function(t){var a=this.findPrevTab(t.currentTarget);a?this.changeFocusedTab(t,a):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var a=this.findFirstTab();this.changeFocusedTab(t,a),t.preventDefault()},onEndKey:function(t){var a=this.findLastTab();this.changeFocusedTab(t,a),t.preventDefault()},onPageDownKey:function(t){this.scrollInView(this.findLastTab()),t.preventDefault()},onPageUpKey:function(t){this.scrollInView(this.findFirstTab()),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue(),t.preventDefault()},findNextTab:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,s=a?t:t.nextElementSibling;return s?k(s,"data-p-disabled")||k(s,"data-pc-section")==="inkbar"?this.findNextTab(s):N(s,'[data-pc-name="tab"]'):null},findPrevTab:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,s=a?t:t.previousElementSibling;return s?k(s,"data-p-disabled")||k(s,"data-pc-section")==="inkbar"?this.findPrevTab(s):N(s,'[data-pc-name="tab"]'):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.content.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.content.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(t,a){M(a),this.scrollInView(a)},scrollInView:function(t){var a;t==null||(a=t.scrollIntoView)===null||a===void 0||a.call(t,{block:"nearest"})}},computed:{active:function(){var t;return O((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tab_").concat(this.value)},ariaControls:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tabpanel_").concat(this.value)},attrs:function(){return b(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:"tab","aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":"tab","data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}}},directives:{ripple:E}};function st(e,t,a,s,i,n){var r=D("ripple");return e.asChild?p(e.$slots,"default",{key:1,class:A(e.cx("root")),active:n.active,a11yAttrs:n.a11yAttrs,onClick:n.onClick}):_((l(),x(L(e.as),b({key:0,class:e.cx("root"),onClick:n.onClick},n.attrs),{default:v(function(){return[p(e.$slots,"default")]}),_:3},16,["class","onClick"])),[[r]])}F.render=st;var rt={root:"p-tablist",content:function(t){var a=t.instance;return["p-tablist-content",{"p-tablist-viewport":a.$pcTabs.scrollable}]},tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},ot=$.extend({name:"tablist",classes:rt}),it={name:"BaseTabList",extends:w,props:{},style:ot,provide:function(){return{$pcTabList:this,$parentInstance:this}}},R={name:"TabList",extends:it,inheritAttrs:!1,inject:["$pcTabs"],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,watch:{showNavigators:function(t){t?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:"post",handler:function(){this.updateInkBar()}}},mounted:function(){var t=this;this.$nextTick(function(){t.updateInkBar()}),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver()},methods:{onScroll:function(t){this.showNavigators&&this.updateButtonState(),t.preventDefault()},onPrevButtonClick:function(){var t=this.$refs.content,a=this.getVisibleButtonWidths(),s=C(t)-a,i=Math.abs(t.scrollLeft),n=s*.8,r=i-n,c=Math.max(r,0);t.scrollLeft=I(t)?-1*c:c},onNextButtonClick:function(){var t=this.$refs.content,a=this.getVisibleButtonWidths(),s=C(t)-a,i=Math.abs(t.scrollLeft),n=s*.8,r=i+n,c=t.scrollWidth-s,u=Math.min(r,c);t.scrollLeft=I(t)?-1*u:u},bindResizeObserver:function(){var t=this;this.resizeObserver=new ResizeObserver(function(){return t.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var t;(t=this.resizeObserver)===null||t===void 0||t.unobserve(this.$refs.list),this.resizeObserver=void 0},updateInkBar:function(){var t=this.$refs,a=t.content,s=t.inkbar,i=t.tabs,n=N(a,'[data-pc-name="tab"][data-p-active="true"]');this.$pcTabs.isVertical()?(s.style.height=G(n)+"px",s.style.top=B(n).top-B(i).top+"px"):(s.style.width=J(n)+"px",s.style.left=B(n).left-B(i).left+"px")},updateButtonState:function(){var t=this.$refs,a=t.list,s=t.content,i=s.scrollTop,n=s.scrollWidth,r=s.scrollHeight,c=s.offsetWidth,u=s.offsetHeight,g=Math.abs(s.scrollLeft),T=[C(s),Q(s)],U=T[0],q=T[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=i!==0,this.isNextButtonEnabled=a.offsetHeight>=u&&parseInt(i)!==r-q):(this.isPrevButtonEnabled=g!==0,this.isNextButtonEnabled=a.offsetWidth>=c&&parseInt(g)!==n-U)},getVisibleButtonWidths:function(){var t=this.$refs,a=t.prevButton,s=t.nextButton,i=0;return this.showNavigators&&(i=((a==null?void 0:a.offsetWidth)||0)+((s==null?void 0:s.offsetWidth)||0)),i}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.scrollable&&this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0}},components:{ChevronLeftIcon:X,ChevronRightIcon:Y},directives:{ripple:E}},lt=["aria-label","tabindex"],ct=["aria-orientation"],dt=["aria-label","tabindex"];function ut(e,t,a,s,i,n){var r=D("ripple");return l(),d("div",b({ref:"list",class:e.cx("root")},e.ptmi("root")),[n.showNavigators&&i.isPrevButtonEnabled?_((l(),d("button",b({key:0,ref:"prevButton",class:e.cx("prevButton"),"aria-label":n.prevButtonAriaLabel,tabindex:n.$pcTabs.tabindex,onClick:t[0]||(t[0]=function(){return n.onPrevButtonClick&&n.onPrevButtonClick.apply(n,arguments)})},e.ptm("prevButton"),{"data-pc-group-section":"navigator"}),[(l(),x(L(n.templates.previcon||"ChevronLeftIcon"),b({"aria-hidden":"true"},e.ptm("prevIcon")),null,16))],16,lt)),[[r]]):V("",!0),o("div",b({ref:"content",class:e.cx("content"),onScroll:t[1]||(t[1]=function(){return n.onScroll&&n.onScroll.apply(n,arguments)})},e.ptm("content")),[o("div",b({ref:"tabs",class:e.cx("tabList"),role:"tablist","aria-orientation":n.$pcTabs.orientation||"horizontal"},e.ptm("tabList")),[p(e.$slots,"default"),o("span",b({ref:"inkbar",class:e.cx("activeBar"),role:"presentation","aria-hidden":"true"},e.ptm("activeBar")),null,16)],16,ct)],16),n.showNavigators&&i.isNextButtonEnabled?_((l(),d("button",b({key:1,ref:"nextButton",class:e.cx("nextButton"),"aria-label":n.nextButtonAriaLabel,tabindex:n.$pcTabs.tabindex,onClick:t[2]||(t[2]=function(){return n.onNextButtonClick&&n.onNextButtonClick.apply(n,arguments)})},e.ptm("nextButton"),{"data-pc-group-section":"navigator"}),[(l(),x(L(n.templates.nexticon||"ChevronRightIcon"),b({"aria-hidden":"true"},e.ptm("nextIcon")),null,16))],16,dt)),[[r]]):V("",!0)],16)}R.render=ut;var bt={root:function(t){var a=t.instance;return["p-tabpanel",{"p-tabpanel-active":a.active}]}},pt=$.extend({name:"tabpanel",classes:bt}),vt={name:"BaseTabPanel",extends:w,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:pt,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},W={name:"TabPanel",extends:vt,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var t;return O((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tab_").concat(this.value)},attrs:function(){return b(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var t;return{id:this.id,tabindex:(t=this.$pcTabs)===null||t===void 0?void 0:t.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function ht(e,t,a,s,i,n){var r,c;return n.$pcTabs?(l(),d(h,{key:1},[e.asChild?p(e.$slots,"default",{key:1,class:A(e.cx("root")),active:n.active,a11yAttrs:n.a11yAttrs}):(l(),d(h,{key:0},[!((r=n.$pcTabs)!==null&&r!==void 0&&r.lazy)||n.active?_((l(),x(L(e.as),b({key:0,class:e.cx("root")},n.attrs),{default:v(function(){return[p(e.$slots,"default")]}),_:3},16,["class"])),[[Z,(c=n.$pcTabs)!==null&&c!==void 0&&c.lazy?!0:n.active]]):V("",!0)],64))],64)):p(e.$slots,"default",{key:0})}W.render=ht;var ft={root:"p-tabpanels"},xt=$.extend({name:"tabpanels",classes:ft}),gt={name:"BaseTabPanels",extends:w,props:{},style:xt,provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},H={name:"TabPanels",extends:gt,inheritAttrs:!1};function mt(e,t,a,s,i,n){return l(),d("div",b({class:e.cx("root"),role:"presentation"},e.ptmi("root")),[p(e.$slots,"default")],16)}H.render=mt;var yt=function(t){var a=t.dt;return`
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
    background: `.concat(a("tabs.tablist.background"),`;
    border-style: solid;
    border-color: `).concat(a("tabs.tablist.border.color"),`;
    border-width: `).concat(a("tabs.tablist.border.width"),`;
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
    background: `).concat(a("tabs.nav.button.background"),`;
    color: `).concat(a("tabs.nav.button.color"),`;
    width: `).concat(a("tabs.nav.button.width"),`;
    transition: color `).concat(a("tabs.transition.duration"),", outline-color ").concat(a("tabs.transition.duration"),", box-shadow ").concat(a("tabs.transition.duration"),`;
    box-shadow: `).concat(a("tabs.nav.button.shadow"),`;
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: `).concat(a("tabs.nav.button.focus.ring.shadow"),`;
    outline: `).concat(a("tabs.nav.button.focus.ring.width")," ").concat(a("tabs.nav.button.focus.ring.style")," ").concat(a("tabs.nav.button.focus.ring.color"),`;
    outline-offset: `).concat(a("tabs.nav.button.focus.ring.offset"),`;
}

.p-tablist-nav-button:hover {
    color: `).concat(a("tabs.nav.button.hover.color"),`;
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
    background: `).concat(a("tabs.tab.background"),`;
    border-width: `).concat(a("tabs.tab.border.width"),`;
    border-color: `).concat(a("tabs.tab.border.color"),`;
    color: `).concat(a("tabs.tab.color"),`;
    padding: `).concat(a("tabs.tab.padding"),`;
    font-weight: `).concat(a("tabs.tab.font.weight"),`;
    transition: background `).concat(a("tabs.transition.duration"),", border-color ").concat(a("tabs.transition.duration"),", color ").concat(a("tabs.transition.duration"),", outline-color ").concat(a("tabs.transition.duration"),", box-shadow ").concat(a("tabs.transition.duration"),`;
    margin: `).concat(a("tabs.tab.margin"),`;
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: `).concat(a("tabs.tab.focus.ring.shadow"),`;
    outline: `).concat(a("tabs.tab.focus.ring.width")," ").concat(a("tabs.tab.focus.ring.style")," ").concat(a("tabs.tab.focus.ring.color"),`;
    outline-offset: `).concat(a("tabs.tab.focus.ring.offset"),`;
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: `).concat(a("tabs.tab.hover.background"),`;
    border-color: `).concat(a("tabs.tab.hover.border.color"),`;
    color: `).concat(a("tabs.tab.hover.color"),`;
}

.p-tab-active {
    background: `).concat(a("tabs.tab.active.background"),`;
    border-color: `).concat(a("tabs.tab.active.border.color"),`;
    color: `).concat(a("tabs.tab.active.color"),`;
}

.p-tabpanels {
    background: `).concat(a("tabs.tabpanel.background"),`;
    color: `).concat(a("tabs.tabpanel.color"),`;
    padding: `).concat(a("tabs.tabpanel.padding"),`;
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: `).concat(a("tabs.tabpanel.focus.ring.shadow"),`;
    outline: `).concat(a("tabs.tabpanel.focus.ring.width")," ").concat(a("tabs.tabpanel.focus.ring.style")," ").concat(a("tabs.tabpanel.focus.ring.color"),`;
    outline-offset: `).concat(a("tabs.tabpanel.focus.ring.offset"),`;
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    inset-block-end: `).concat(a("tabs.active.bar.bottom"),`;
    height: `).concat(a("tabs.active.bar.height"),`;
    background: `).concat(a("tabs.active.bar.background"),`;
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`)},$t={root:function(t){var a=t.props;return["p-tabs p-component",{"p-tabs-scrollable":a.scrollable}]}},wt=$.extend({name:"tabs",theme:yt,classes:$t}),Tt={name:"BaseTabs",extends:w,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:wt,provide:function(){return{$pcTabs:this,$parentInstance:this}}},j={name:"Tabs",extends:Tt,inheritAttrs:!1,emits:["update:value"],data:function(){return{id:this.$attrs.id,d_value:this.value}},watch:{"$attrs.id":function(t){this.id=t||K()},value:function(t){this.d_value=t}},mounted:function(){this.id=this.id||K()},methods:{updateValue:function(t){this.d_value!==t&&(this.d_value=t,this.$emit("update:value",t))},isVertical:function(){return this.orientation==="vertical"}}};function kt(e,t,a,s,i,n){return l(),d("div",b({class:e.cx("root")},e.ptmi("root")),[p(e.$slots,"default")],16)}j.render=kt;const Bt={class:"about-section min-h-screen"},_t={class:"py-16 px-4 bg-[var(--p-surface-0)]"},Lt={class:"max-w-6xl mx-auto"},At={class:"space-y-4"},Ct={class:"bg-[var(--p-primary-color)] text-[var(--p-button-text-primary-color)] w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"},Pt={class:"text-lg text-[var(--p-text-color)]"},St={class:"py-16 px-4 bg-[var(--p-background-color)]"},Nt={class:"max-w-6xl mx-auto"},Vt={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"},It={class:"text-xl font-bold text-[var(--p-text-color)]"},Kt={class:"py-16 px-4 bg-[var(--p-surface-0)]"},zt={class:"max-w-6xl mx-auto"},Ot={class:"bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg"},Et={class:"mb-8"},Dt={class:"text-lg text-[var(--p-text-muted-color)] leading-relaxed"},Ft={class:"mt-8"},Rt={class:"space-y-4"},Wt={class:"text-[var(--p-text-muted-color)]"},jt={__name:"AboutView",setup(e){const t=P(["بناء قاعدة جماهيرية متفاعلة من المواهب الواعدة ومحبي تطوير المهارات.","توفير بيئة شاملة رياضية وثقافية وتنموية واجتماعية لتمكين المواهب وتوسيع آفاقهم.","دعم المواهب وتنمية مهاراتها وتطوير قدراتها للوصول إلى إمكاناتها الكاملة."]),a=P(["الإعلام والإلقاء","الكتابة","التنمية","الصحة واللياقة","الفنون البصرية والتشكيلية","اللغة الإنجليزية","المحاسبة"]),s=["pi pi-microphone","pi pi-pencil","pi pi-chart-line","pi pi-heart","pi pi-palette","pi pi-globe","pi pi-calculator"],i=P([{title:"ملتقى الإعلام والإلقاء",description:"يسعى ملتقى الإعلام والإلقاء إلى تمكين الأفراد من تطوير مهاراتهم في فن التواصل والإلقاء، سواء أمام الجمهور أو عبر وسائل الإعلام المختلفة. يوفر الملتقى برامج تدريبية شاملة تركز على تعزيز الثقة وبناء مهارات التحدث بوضوح وفعالية، مما يساعد المشاركين على إيصال أفكارهم بطريقة مؤثرة وجذابة.",objectives:["تمكين الأعضاء من المهارات الإعلامية والإلقائية من خلال تقديم البرامج التدريبية لهم.","تعزيز القدرات الإعلامية للمشاركين لتمكينهم من تقديم المحتوى عبر مختلف وسائل الإعلام.","إعداد متحدثين بارزين في جميع أنواع التعليق الصوتي لإيصال المحتوى باحترافية عالية."]},{title:"ملتقى الكتابة",description:"ملتقى الكتابة يهدف إلى تطوير مهارات الكتابة لدى الأفراد في مختلف الأنماط، من الكتابة الإبداعية إلى الكتابة المهنية. يوفر الملتقى برامج تدريبية وورش عمل تساعد المشاركين على تحسين أساليبهم التعبيرية وصياغة الأفكار بوضوح وإبداع، مما يمكنهم من تحويل أفكارهم إلى أعمال مكتوبة متميزة تجذب القراء.",objectives:["تطوير قدرات الكتابة في مختلف المجالات عبر برامج تدريبية تعزز مهارات الكتابة.","تشجيع الابتكار والإبداع الكتابي من خلال تقديم بيئة محفزة للتجربة وتطوير الأساليب الأدبية.","إعداد كتاب مؤثرين قادرين على إنتاج محتوى يلهم ويثري المجتمع في المجالات الإبداعية والمهنية."]}]);return(n,r)=>(l(),d("div",Bt,[r[5]||(r[5]=z('<div class="hero-section relative py-20 px-4 bg-gradient-to-br from-[var(--p-primary-50)] to-[var(--p-surface-50)] dark:from-[var(--p-surface-800)] dark:to-[var(--p-surface-900)]"><div class="max-w-6xl mx-auto text-center"><h1 class="text-5xl md:text-6xl font-bold mb-6 text-[var(--p-text-color)]">من نحن</h1><p class="text-xl md:text-2xl text-[var(--p-text-muted-color)] max-w-4xl mx-auto leading-relaxed"> منصة تهدف إلى تعزيز المواهب والقدرات الإبداعية وتطوير المهارات الفردية من خلال تقديم فرص تعليمية وتدريبية شاملة. </p></div></div><div class="py-16 px-4 bg-[var(--p-surface-0)]"><div class="max-w-6xl mx-auto"><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg"><h2 class="text-3xl font-bold mb-6 text-[var(--p-text-color)]">رؤيتنا</h2><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed"> أن تكون المنصة رائدة في بناء أجيال متكاملة ثقافياً وتنموياً ورياضياً واجتماعياً، وتعزيز الصحة والمواهب في المجتمع. </p></div><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg"><h2 class="text-3xl font-bold mb-6 text-[var(--p-text-color)]">رسالتنا</h2><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed"> تسعى المنصة إلى تقديم العلم والمعرفة من خلال أساليب تدريبية وترفيهية، ودعم المواهب وتطويرها في بيئة ملهمة تعزز من إمكانياتهم وتحقق طموحاتهم. </p></div></div></div></div><div class="py-16 px-4 bg-[var(--p-background-color)]"><div class="max-w-6xl mx-auto"><h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">قيمنا</h2><div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center"><i class="pi pi-verified text-3xl mb-4 text-[var(--p-primary-color)]"></i><h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]">الثقة</h3><p class="text-[var(--p-text-muted-color)]">بناء أو تعزيز علاقة موثوقة ومستدامة مع شركائنا ومواهبنا.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center"><i class="pi pi-star text-3xl mb-4 text-[var(--p-primary-color)]"></i><h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]">التميز</h3><p class="text-[var(--p-text-muted-color)]">تحقيق معايير استثنائية وتقديم الدعم بطريقة مميزة.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center"><i class="pi pi-check-circle text-3xl mb-4 text-[var(--p-primary-color)]"></i><h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]">المُسؤولية</h3><p class="text-[var(--p-text-muted-color)]">الالتزام بتنمية المواهب وتحقيق الأهداف بوعي وتفانٍ.</p></div><div class="bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center"><i class="pi pi-refresh text-3xl mb-4 text-[var(--p-primary-color)]"></i><h3 class="text-xl font-bold mb-3 text-[var(--p-text-color)]">الاستدامة</h3><p class="text-[var(--p-text-muted-color)]">الالتزام بالنمو والتطور المستدام.</p></div></div></div></div>',3)),o("div",_t,[o("div",Lt,[r[0]||(r[0]=o("h2",{class:"text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]"},"أهدافنا",-1)),o("div",At,[(l(!0),d(h,null,m(t.value,(c,u)=>(l(),d("div",{key:u,class:"bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg flex items-center gap-4"},[o("div",Ct,f(u+1),1),o("p",Pt,f(c),1)]))),128))])])]),r[6]||(r[6]=z('<div class="py-16 px-4 bg-[var(--p-background-color)]"><div class="max-w-6xl mx-auto"><h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">تاريخنا</h2><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg"><div class="space-y-6"><div class="flex gap-4"><div class="flex-shrink-0"><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2"></div></div><div><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]">2020 - التأسيس</h3><p class="text-[var(--p-text-muted-color)]"> تأسست منصة &quot;خيط وإبرة&quot; في أبريل 2020، في خضم أزمة جائحة كورونا، على يد المؤسس ريان القرشي. </p></div></div><div class="flex gap-4"><div class="flex-shrink-0"><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2"></div></div><div><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]">2021 - التوسع</h3><p class="text-[var(--p-text-muted-color)]"> في يونيو 2021، أطلقت المنصة ملتقياتها الخاصة لدعم المواهب، لتصبح منبراً جامعاً للموهوبين والهواة. </p></div></div><div class="flex gap-4"><div class="flex-shrink-0"><div class="w-4 h-4 rounded-full bg-[var(--p-primary-color)] mt-2"></div></div><div><h3 class="text-xl font-bold mb-2 text-[var(--p-text-color)]">اليوم</h3><p class="text-[var(--p-text-muted-color)]"> تضم المنصة اليوم أكثر من 25,000 متابع وتدعم مجموعة واسعة من المواهب في مجالات متعددة. </p></div></div></div></div></div></div><div class="py-16 px-4 bg-[var(--p-surface-0)]"><div class="max-w-6xl mx-auto"><h2 class="text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]">أثرنا ومستقبلنا</h2><div class="bg-[var(--p-card-background)] p-8 rounded-2xl shadow-lg space-y-8"><div><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]">امتداد التأثير</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed"> واليوم، وبعد ثلاثة أعوام من العطاء، امتدت تأثيرات المنصة وانتشارها جغرافياً، حيث جذبت مواهب من المملكة العربية السعودية أولاً، ومن ثم من مختلف الدول العربية، بما في ذلك العراق وسوريا ومصر والأردن والجزائر واليمن وغيرها من الدول، مما جعلها حاضنة إبداعية على مستوى الوطن العربي. </p></div><div><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]">رؤيتنا المستقبلية</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed"> تواصل منصة &quot;خيط وإبرة&quot; رسالتها الرائدة في دعم الموهوبين وتطوير مهاراتهم، مع رؤية مستقبلية طموحة تهدف إلى أن تصل إلى كل بيت سعودي أولاً، ومن ثم البيوت في مختلف البلدان العربية، لتصبح شريكاً أساسياً في تعزيز قدرات الأفراد. </p></div><div><h3 class="text-2xl font-bold mb-4 text-[var(--p-text-color)]">المساهمة في رؤية 2030</h3><p class="text-lg text-[var(--p-text-muted-color)] leading-relaxed"> تلتزم المنصة بالمساهمة في تحقيق رؤية المملكة 2030 من خلال دعم الإبداع، وتمكين المواهب، وتعزيز جودة الحياة، بما يتماشى مع أهداف الرؤية التي تسعى لبناء مجتمع حيوي يمكن الأفراد من تحقيق إمكانياتهم الكاملة. </p></div></div></div></div>',2)),o("div",St,[o("div",Nt,[r[1]||(r[1]=o("h2",{class:"text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]"},"مجالاتنا",-1)),o("div",Vt,[(l(!0),d(h,null,m(a.value,(c,u)=>(l(),d("div",{key:u,class:"bg-[var(--p-card-background)] p-6 rounded-xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105"},[o("i",{class:A([s[u],"text-3xl mb-4 text-[var(--p-primary-color)]"])},null,2),o("h3",It,f(c),1)]))),128))])])]),o("div",Kt,[o("div",zt,[r[4]||(r[4]=o("h2",{class:"text-4xl font-bold text-center mb-12 text-[var(--p-text-color)]"},"نبذة تعريفية عن مواهبنا",-1)),S(y(j),null,{default:v(()=>[S(y(R),{class:"flex flex-wrap justify-center gap-2 border-b border-[var(--p-surface-200)] mb-8"},{default:v(()=>[(l(!0),d(h,null,m(i.value,(c,u)=>(l(),x(y(F),{key:u,class:A(["px-6 py-3 transition-colors rounded-t-lg",[n.selected?"bg-[var(--p-primary-color)] text-[var(--p-button-text-primary-color)]":"text-[var(--p-text-muted-color)] hover:text-[var(--p-text-color)]"]])},{default:v(({selected:g})=>[tt(f(c.title),1)]),_:2},1032,["class"]))),128))]),_:1}),S(y(H),{class:"mt-6"},{default:v(()=>[(l(!0),d(h,null,m(i.value,(c,u)=>(l(),x(y(W),{key:u},{default:v(()=>[o("div",Ot,[o("div",Et,[o("p",Dt,f(c.description),1)]),o("div",Ft,[r[3]||(r[3]=o("h3",{class:"text-2xl font-bold mb-6 text-[var(--p-text-color)]"},"أهداف الملتقى",-1)),o("ul",Rt,[(l(!0),d(h,null,m(c.objectives,(g,T)=>(l(),d("li",{key:T,class:"flex items-start gap-4"},[r[2]||(r[2]=o("i",{class:"pi pi-check-circle text-[var(--p-primary-color)] mt-1"},null,-1)),o("span",Wt,f(g),1)]))),128))])])])]),_:2},1024))),128))]),_:1})]),_:1})])])]))}};export{jt as default};
