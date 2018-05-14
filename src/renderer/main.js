import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import './assets/bacillumui-adapter/dist/iview.css'
import 'animate.css/animate.css'
import locale from 'iview/dist/locale/es-ES'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(iView, { locale })

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
