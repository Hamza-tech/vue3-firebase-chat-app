

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './index.css'
import router from './router'
import Toast from '@/components/Toast.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const app = createApp(App)
app.component("ConfirmModal", ConfirmModal);
app.component("Toast", Toast);

app.use(createPinia())
app.use(router)

app.mount('#app')
