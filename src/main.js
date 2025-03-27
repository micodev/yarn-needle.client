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
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import ToastTemplate from './components/ToastTemplate.vue';
import vue3GoogleLogin from 'vue3-google-login'

import {
  LaFacebook,
  LaTwitter,
  LaInstagram,
  LaWhatsapp,
  LaTelegram,
  LaGlobeAfricaSolid,
  FaUsers,
  FaBook,
  FaShoppingCart,
  FaChalkboardTeacher,
  FaComments,
  FaBuilding
} from "oh-vue-icons/icons";



addIcons(
  LaFacebook,
  LaTwitter,
  LaInstagram,
  LaWhatsapp,
  LaTelegram,
  LaGlobeAfricaSolid,
  FaUsers,
  FaBook,
  FaShoppingCart,
  FaBuilding,
  FaChalkboardTeacher,
  FaComments
);

// Initialize dark mode based on localStorage or system preference
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('darkMode');

  // If user has a saved preference, use that
  if (savedTheme !== null) {
    document.documentElement.classList.toggle('dark', savedTheme === 'true');
  }
  // Otherwise check for system preference
  else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    localStorage.setItem('darkMode', prefersDark);
  }
};

// Apply theme before app mount
initializeTheme();

const app = createApp(App)
app.use(vue3GoogleLogin, {
  clientId: '540046837569-3pkv7u7rqjo71br8bnoi971l10mragaf.apps.googleusercontent.com'
})
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.config.globalProperties.$axios = axiosInstance
pinia.use(({ store }) => {
  store.$axios = app.config.globalProperties.$axios;
});
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.use(pinia);  // Make sure this line exists
app.use(router)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)
app.component('ToastTemplate',ToastTemplate)
app.use(ToastService)
app.use(PrimeVue, {
  theme: 'none',
  ripple: true,
})

app.component("v-icon", OhVueIcon);
app.mount("#app");
