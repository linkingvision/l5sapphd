// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import store from './vuex'
import router from './router'
import axios from 'axios'
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import 'lib-flexible/flexible'
import 'jquery'
Vue.use(Ionic);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios
const bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{
    bus
   },
  store,
  components: { App },
  template: '<App/>'
})
