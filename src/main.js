import App from './App.vue'
import './compiled/output.css'
import { createApp } from 'vue'
import './registerServiceWorker'
import { router } from './router'

const app = createApp(App).use(router)
app.mount('#app')

import Layer0RUM from '../layer0/rum'
import { install } from '@layer0/prefetch/window'
import installDevtools from '@layer0/devtools/install'

install()
installDevtools()
Layer0RUM('29f61ab4-db8a-4dcc-9412-e1901c6dad61')
