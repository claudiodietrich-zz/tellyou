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
  "primary": ($primary, $primary-invert),
  "secondary": ($secondary, $secondary-invert)
);

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

<style>
body {
  font-family: 'Open Sans', sans-serif;
}
</style>
