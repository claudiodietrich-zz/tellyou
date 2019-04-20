<template>
  <div id="app">
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

// Colors
$primary: #6c63ff;
$primary-invert: findColorInvert($primary);
$secondary: #fedd57;
$secondary-invert: findColorInvert($secondary);

$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "secondary": ($secondary, $secondary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert)
);

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

<style>
body {
  font-family: 'Open Sans', sans-serif;
}
</style>
