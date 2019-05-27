import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SingUp from './views/SingUp.vue'
import SingIn from './views/SingIn.vue'
import NotFoud from './views/404.vue'
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
        requiresSession: false,
        hasNavbar: true
      }
    },
    {
      path: '/singup',
      name: 'singUp',
      component: SingUp,
      meta: {
        requiresSession: false,
        hasNavbar: false
      }
    },
    {
      path: '/singin',
      name: 'singIn',
      component: SingIn,
      meta: {
        requiresSession: false,
        hasNavbar: false
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFoud,
      meta: {
        hasNavbar: true
      }
    },
    story,
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ]
})
