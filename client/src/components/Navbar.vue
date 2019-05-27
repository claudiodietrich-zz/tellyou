<template>
  <nav class="navbar is-fixed-top has-background-secondary" role="navigation" aria-label="main navigation"
    v-if="this.$route.matched.some(route => route.meta.hasNavbar)">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          TellYou
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainNavBar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <home-nav
        v-if="!this.$session.exists()"/>

      <user-nav
        v-if="this.$session.exists()"/>

    </div>
  </nav>
</template>

<script>

import HomeNav from '@/components/nav/HomeNav.vue'
import UserNav from '@/components/nav/UserNav.vue'

export default {
  components: {
    HomeNav,
    UserNav
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target
        const $target = document.getElementById(target)

        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})
</script>
