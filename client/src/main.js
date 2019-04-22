import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'
import VueI18n from 'vue-i18n'
import messages from '@/i18n/i18n'

Vue.use(Buefy)
Vue.use(Vuelidate)
Vue.use(VueI18n)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'ptBR', // set locale
  messages // set locale messages
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
