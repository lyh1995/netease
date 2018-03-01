// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store.js'
import axios from 'axios'
import Icon from './components/Icon/Icon.vue'
import './components/Icon/Icons.js'
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.component('icon', Icon)
router.beforeEach((to, from, next) => {
  store.state.fromPath = from.path;
  store.state.toPath = to.path;
  console.log(from.path);
  console.log(to.path);
  next();
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
