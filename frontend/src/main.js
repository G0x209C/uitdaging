import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import io from '@/socket';

const app = createApp(App).use(store).use(router)


app.config.globalProperties.$io = io;

app.mount('#app')
