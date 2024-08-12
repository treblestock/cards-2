import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './pinia'

const app = createApp(App)

app.use(router)

app.use(pinia)

// libs
import componentsLib from './plugins/componentsLib'
app.use(componentsLib)

app.mount('#app')
