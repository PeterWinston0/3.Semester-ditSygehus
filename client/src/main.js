import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Assuming you are using Vuex

// Define a global process variable for compatibility with vue-pdf
window.process = {
  env: { NODE_ENV: import.meta.env.MODE }
};

import './assets/myStyle.css';

const app = createApp(App);

app.use(router);
app.use(store); // If you are using Vuex

app.mount('#app');