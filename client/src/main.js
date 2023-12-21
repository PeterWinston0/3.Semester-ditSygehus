import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// main.js or main.ts
import './assets/custom.css';
import './assets/myStyle.css';

const app = createApp(App)

app.use(router)

app.mount('#app')
