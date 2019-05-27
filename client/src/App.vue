<template>
  <div id="app"
    v-bind:class="{ 'has-navbar-fixed-top': this.$route.matched.some(route => route.meta.hasNavbar) }">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "@/assets/scss/tellyou.scss";
@import "~bulma";
@import "~buefy/src/scss/buefy";
@import "@/assets/scss/spacing.scss";
</style>

<style>
body {
  font-family: 'Open Sans', sans-serif;
}

#app.has-navbar-fixed-top {
  padding-top: 3.25rem;
}
</style>
