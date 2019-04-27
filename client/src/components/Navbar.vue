<template>
  <nav v-if="this.$route.meta.hasNavbar" class="navbar is-fixed-top has-background-secondary" role="navigation" aria-label="main navigation">
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

    <div id="mainNavBar" class="navbar-menu">
      <div class="navbar-start">
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-primary is-rounded" v-bind:to="{ name: 'singIn' }">
              {{ $t('component.navbar.button.singIn') }}
            </router-link>
            <a class="button is-light is-rounded">
              {{ $t('component.navbar.button.singUp') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
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
