import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SingUp from './views/SingUp.vue'
import story from '@/routes/story'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        hasNavbar: true
      }
    },
    {
      path: '/singup',
      name: 'singUp',
      component: SingUp,
      meta: {
        hasNavbar: false
      }
    },
    story
  ]
})
