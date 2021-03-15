require('./bootstrap');

import Vue from 'vue'
import App from './App.vue';
import axios from 'axios'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import router from './routes/index'
import store from './store/index'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Set Vue globally
window.Vue = Vue

// Set Vue router
Vue.router = router
Vue.use(VueRouter)

Vue.use(VueAxios, axios);
axios.defaults.baseURL = process.env.MIX_BASE_URL;
console.log(process.env.MIX_BASE_URL)

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
