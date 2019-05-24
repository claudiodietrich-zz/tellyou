<template>
  <div id="mainNavBar" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link class="button is-primary is-rounded"
            v-bind:to="{ name: 'singUp' }">
              {{ $t('component.navbar.button.singUp') }}
          </router-link>

          <router-link class="button is-light is-rounded"
            v-bind:to="{ name: 'singIn' }">
            {{ $t('component.navbar.button.singIn') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
