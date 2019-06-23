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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle, faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bulma-timeline/dist/css/bulma-timeline.min.css'

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle, faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faChevronLeft, faChevronRight)

Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.use(Buefy, { defaultIconComponent: 'vue-fontawesome', defaultIconPack: 'fas' })
Vue.use(Vuelidate)
Vue.use(VueI18n)
Vue.use(VueSession, { persist: true })

Vue.config.productionTip = false
axios.defaults.baseURL = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api'

const i18n = new VueI18n({
  locale: 'ptBR', // set locale
  messages // set locale messages
})

router.beforeEach((to, from, next) => {
  const sessionExists = router.app.$session.exists()
  const requiresSession = to.matched.some(route => route.meta.requiresSession)

  if (requiresSession && sessionExists) {
    next()
  }

  if (!requiresSession && !sessionExists) {
    next()
  }

  if (!requiresSession && sessionExists) {
    next({ name: 'storyList' })
  }

  if (to.name === '404') {
    next()
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
