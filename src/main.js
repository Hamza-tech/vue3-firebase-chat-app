

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import router from './router'
import Toast from '@/components/Toast.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();
app.component("ConfirmModal", ConfirmModal);
app.component("Toast", Toast);

app.use(pinia);
app.use(router)

app.mount('#app')
