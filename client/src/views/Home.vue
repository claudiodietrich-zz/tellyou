<template>
  <main>
    <section class="hero has-background-secondary is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="title is-size-3-mobile is-size-2-desktop is-spaced">
                {{ $t('view.home.hero.title') }}
              </h1>
              <h2 class="subtitle is-size-4-mobile is-size-3-desktop">
                {{ $t('view.home.hero.subTitle') }}
              </h2>
              <router-link class="button is-primary is-medium is-rounded" v-bind:class="{'is-outlined': !isMobile}" v-bind:to="{ name: 'singIn' }">
                {{ $t('view.home.button.letsStart') }}
              </router-link>
            </div>

            <div class="column">
              <figure class="image">
                <img src="@/assets/typewriter.svg">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="presentation" v-for="(description, index) in descriptions" v-bind:key="index">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-two-fifths" v-if="index % 2 === 0 || isMobile">
            <figure class="image">
              <img v-bind:src="description.img">
            </figure>
          </div>

          <div class="column">
            <h3 class="title">
              {{ description.title }}
            </h3>
            <p class="is-size-5-mobile is-size-4-desktop">
              {{ description.text }}
            </p>
          </div>

          <div class="column is-two-fifths" v-if="index % 2 !== 0 && !isMobile">
            <figure class="image">
              <img v-bind:src="description.img">
            </figure>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data () {
    return {
      isMobile: false,
      descriptions: [
        {
          title: this.$t('view.home.description.shareKnowledge.title'),
          text: this.$t('view.home.description.shareKnowledge.text'),
          img: require('@/assets/brainstorming.svg')
        },
        {
          title: this.$t('view.home.description.tellStory.title'),
          text: this.$t('view.home.description.tellStory.text'),
          img: require('@/assets/group-chat.svg')
        },
        {
          title: this.$t('view.home.description.inviteOthers.title'),
          text: this.$t('view.home.description.inviteOthers.text'),
          img: require('@/assets/live-collaboration.svg')
        },
        {
          title: this.$t('view.home.description.betterResults.title'),
          text: this.$t('view.home.description.betterResults.text'),
          img: require('@/assets/visual-data.svg')
        }
      ]
    }
  },
  methods: {
    onResize () {
      if (window.innerWidth <= 768) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  },
  created () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped>
.presentation {
  padding: 5rem 1.5rem;
}

.presentation img {
  max-height: 300px;
}
</style>
