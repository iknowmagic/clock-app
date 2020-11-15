import Vue from 'vue'

import '@/icons.js'
import '@/scss/app.scss'

import store from '@/state'

import VueMq from 'vue-mq'
import Vuelidate from 'vuelidate'

import router from '@/router'

import App from './App.vue'

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    mobile: 768,
    tablet: 1440,
    desktop: Infinity
  },
  defaultBreakpoint: 'mobile' // customize this for SSR
})

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
