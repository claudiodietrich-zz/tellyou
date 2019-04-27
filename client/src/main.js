import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'
import VueI18n from 'vue-i18n'
import messages from '@/i18n/i18n'
import axios from 'axios'
import VueSession from 'vue-session'

Vue.use(Buefy)
Vue.use(Vuelidate)
Vue.use(VueI18n)
Vue.use(VueSession, { persist: true })

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api'

const i18n = new VueI18n({
  locale: 'ptBR', // set locale
  messages // set locale messages
})

router.beforeEach((to, from, next) => {
  const sessionExists = router.app.$session.exists()
  const requiresSession = to.matched.some(route => route.meta.requiresSession)

  if (requiresSession && !sessionExists) {
    next({ name: 'home' })
  }

  next()
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
