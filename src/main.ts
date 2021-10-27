import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from '@/global'
import 'normalize.css'
import '@/assets/css/index.less'
import 'animate.css'

createApp(App).use(store).use(globalRegister).use(router).mount('#app')
