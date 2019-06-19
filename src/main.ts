import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import store from '@/store/store'
import '@/style/main.scss'
import '@/filters/numbers'

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
