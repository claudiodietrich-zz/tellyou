<template>
  <div>
    <h1 class="title">
      {{ `${stage.number} - ${stage.name}` }}
    </h1>
    <h2 class="subtitle">
      {{ stage.description }}
    </h2>

    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="content">
            <h1 class="is-size-4 m-b-4">
              {{ $t('stage.contex') }}
            </h1>
            <p>{{ stage.context }}</p>
          </div>
        </div>

        <div class="column">
          <div class="content">
            <h1 class="is-size-4 m-b-4">
              {{ $t('stage.keyPhrase') }}
            </h1>
            <p>{{ stage.keyPhrases }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import errorMixin from '@/mixins/error'

export default {
  mixins: [ errorMixin ],
  data () {
    return {
      stage: {}
    }
  },
  methods: {
    async getStory () {
      try {
        if (!this.$store.state.story.story._id) {
          const storyId = this.$route.params.storyId

          await this.$store.dispatch('story/findById', storyId)
        }
      } catch (error) {
        this.errorHandler(error)
      }
    },
    getStage () {
      try {
        const stageId = this.$route.params.stageId

        const stage = this.$store.state.story.story.stages.filter(stage => stage._id === stageId)[0]

        if (!stage) {
          throw new Error('deu ruim')
        }

        return stage
      } catch (error) {
        this.errorHandler(error)
      }
    }
  },
  async beforeMount () {
    try {
      await this.getStory()

      this.stage = this.getStage()
    } catch (error) {
      this.errorHandler(error.response)
    }
  }
}
</script>
