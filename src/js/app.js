// Local lib
import Log from '../../libs/log.js';

// External lib
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router/dist/vue-router.js';

// Import Pages
import HomePage from './pages/home.vue';


Vue.use(VueRouter)

const app = new Vue({
  el: '#app',
  router: new VueRouter({
    routes: [
      { path: '/', name: 'home', component: HomePage }
    ]
  })
})
