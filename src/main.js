import App from './App.vue'
import { createApp } from 'vue'
import './registerServiceWorker'
import { router } from './router'

const app = createApp(App).use(router)
app.mount('#app')
