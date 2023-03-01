import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import HbUI from './components/hb-ui'
Vue.use(HbUI)

import HbDirective from './directives/hb-directive'
Vue.use(HbDirective)

import RequestPlugin from "./plugin/RequestPlugin"
Vue.use(RequestPlugin)

import './style.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
