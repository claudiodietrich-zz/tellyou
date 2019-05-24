<template>
<div>
  <div class="columns">
    <div class="column is-4 is-offset-4">
      <figure class="image">
        <img src="@/assets/no-data.svg">
      </figure>
    </div>
  </div>

  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <p class="is-size-4 has-text-centered">
        {{ message }}
      </p>

      <div class="has-text-centered m-t-3">
        <router-link class="button is-primary is-rounded"
          v-bind:to="{ name: 'storyCreate' }">
          {{ $t('default.label.create', { arg: $tc('story.label', 1) }) }}
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['message']
}
</script>
