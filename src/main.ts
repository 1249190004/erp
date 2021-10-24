import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from '@/global'

createApp(App).use(store).use(globalRegister).use(router).mount('#app')
