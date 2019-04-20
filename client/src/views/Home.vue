<template>
  <main>
    <section class="hero has-background-secondary is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="title is-size-3-mobile is-size-2-desktop is-spaced">
                Esta é uma nova forma de compartilhar experiências!
              </h1>
              <h2 class="subtitle is-size-4-mobile is-size-3-desktop">
                TellYou é uma ferramenta que permite o compartilhamento de lições aprendidas, através de suas atividades em grupo, de forma dinâmica e colaborativa.
              </h2>
              <router-link class="button is-primary is-medium is-rounded" v-bind:class="{'is-outlined': !isMobile}" to="/singin">
                Vamos Começar?
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
          title: 'Compartilhe conhecimento!',
          text: 'Conte para seus colegas, de forma criativa, sobre os projetos e outras atividades em grupo, das quais você tenha participado em sua organização.',
          img: require('@/assets/brainstorming.svg')
        },
        {
          title: 'Conte-nos uma história!',
          text: 'Através de um método dinâmico e colaborativo, você pode criar uma história, com seus personagens, que conte sobre experiências vivenciadas, pontos positivos e negativos e outros aspectos importantes.',
          img: require('@/assets/group-chat.svg')
        },
        {
          title: 'Convide outras pessoas para colaborarem!',
          text: 'Convide seus colegas para participarem da construção da sua narrativa.',
          img: require('@/assets/live-collaboration.svg')
        },
        {
          title: 'Melhores resultados em sua organização!',
          text: 'Através do compartilhamento de ideias e lições aprendidas, é possível estabelecer pontos de melhorias em processos de trabalho e buscar métodos que otimizem e aumentem a produtividade em sua organização.',
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
