import App from './App.vue'
import './compiled/output.css'
import { createApp } from 'vue'
import { router } from './router'

const app = createApp(App).use(router)
app.mount('#app')

import Layer0RUM from '../layer0/rum'
import { install } from '@layer0/prefetch/window'
import installDevtools from '@layer0/devtools/install'

installDevtools()
install({ includeCacheMisses: true })
Layer0RUM('789a5742-3d8d-4894-90ec-6ca44b91f914')
