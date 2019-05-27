<template>
  <section class="section">
    <div class="container has-text-centered">
      <figure class="image">
        <img src="@/assets/page-not-found.svg">
      </figure>

      <p class="is-size-3 m-t-5">
        {{ $t('default.label.pageNotFound') }}
      </p>

      <router-link class="button is-primary is-rounded is-medium m-t-3"
        v-if="this.$session.exists()"
        v-bind:to="{ name: 'storyList' }">
        {{ $t('view.pageNotFound.button.go.storyList') }}
      </router-link>

      <router-link class="button is-primary is-rounded is-medium m-t-3"
        v-if="!this.$session.exists()"
        v-bind:to="{ name: 'home' }">
        {{ $t('view.pageNotFound.button.go.home') }}
      </router-link>
    </div>
  </section>
</template>

<style>
img {
  max-height: 300px;
}
</style>
