import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.css'
import './javascript/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'

import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import customComponents from './custom-components'
Vue.use(customComponents)

Vue.use(ElementUI)

Vue.prototype.$moment = moment

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
