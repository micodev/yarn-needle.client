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
  FaComments
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
  FaChalkboardTeacher,
  FaComments
);
const app = createApp(App)
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
app.use(ToastService)
app.use(PrimeVue, {
  theme: 'none',
  ripple: true,
})

app.component("v-icon", OhVueIcon);
app.mount("#app");
