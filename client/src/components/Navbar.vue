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
            <a class="button is-primary is-rounded">
              cadastrar-se
            </a>
            <a class="button is-light is-rounded">
              {{  }}
              entrar
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  created () {
    console.log(this.$route.meta)
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
