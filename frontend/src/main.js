import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import io from '@/socket';
import {globalCookiesConfig} from "vue3-cookies";

const app = createApp(App).use(store).use(router)

globalCookiesConfig({
    expireTimes: "15m",
    path: '/',
    domain: 'localhost',
    secure: false,
    sameSite: "Lax",
});

let gameHost = 'http://localhost';
if(process.env.NODE_ENV === 'production'){ // if in production, link will be here.
    gameHost = 'http://213.126.50.126';
}

app.config.globalProperties.$gameHost = gameHost;

app.config.globalProperties.$io = io;

app.mount('#app')
