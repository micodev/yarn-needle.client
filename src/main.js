import './output.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Ripple from 'primevue/ripple';
import axiosInstance from '../plugins/axios.plugin'
import Tooltip from 'primevue/tooltip';

const app = createApp(App)
const pinia = createPinia()

// Inject axios into pinia stores
pinia.use(({ store }) => {
    store.axios = axiosInstance
})

app.config.globalProperties.$axios = axiosInstance
pinia.use(({ store }) => {
  store.$http = app.config.globalProperties.$axios;
});
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.use(pinia);  // Make sure this line exists
app.use(router)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)
app.use(ToastService)
app.use(PrimeVue, {
  theme: 'none',
  ripple: true,
})

app.mount('#app'
