<template>
  <div id="mainNavBar" class="navbar-menu">
    <div class="navbar-end">
      <b-dropdown
        position="is-bottom-left">
        <a class="navbar-item"
          slot="trigger"
          role="button">
          <span>
            {{ this.$session.get('userName') }}
          </span>
          <b-icon
            icon="caret-down"/>
        </a>

        <b-dropdown-item
          has-link>
          <router-link
            v-bind:to="{ name: 'storyList' }">
            {{ $t('default.label.list', { arg: $tc('story.label', 2) }) }}
          </router-link>
        </b-dropdown-item>

        <b-dropdown-item
          has-link>
          <router-link
            v-bind:to="{ name: 'storyCreate' }">
              {{ $t('default.label.create', { arg: $tc('story.label', 1) }) }}
          </router-link>
        </b-dropdown-item>

        <hr class="dropdown-divider">

        <b-dropdown-item
          v-on:click="endSession">
            {{ $t('default.label.exit') }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import userMixin from '@/mixins/user'

export default {
  mixins: [ userMixin ]
}
</script>
