<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        {{ story.title }}
      </h1>
      <status-tag v-bind:status="story.status"/>

      <div class="box">
        <h1 class="is-size-4 m-b-4">
          {{ $t('story.objective') }}
        </h1>

        <p>
          {{ story.objective }}
        </p>

        <h1 class="is-size-4 m-t-4 m-b-4">
          {{ $t('story.stages') }}
        </h1>

        <div class="timeline">
          <div
            class="timeline-item"
            v-for="stage in story.stages"
            v-bind:key="stage._id">
            <div
              class="timeline-marker is-32x32"
              v-bind:class="[ stage.events.length === 0 ? 'is-danger' : 'is-primary']"></div>
            <b-tooltip
              v-bind:label="stage.description"
              position="is-right"
              animated
              multilined>
              <div class="timeline-content">
                <p class="heading">
                  {{ `${stage.number} - ${stage.name}` }}
                </p>
              </div>
            </b-tooltip>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import errorMixin from '@/mixins/error'
import StatusTag from '@/components/story/StatusTag.vue'

export default {
  mixins: [ errorMixin ],
  components: {
    StatusTag
  },
  data () {
    return {
      story: {}
    }
  },
  async beforeCreate () {
    try {
      const storyId = this.$route.params.storyId
      const response = await axios.get(`/stories/${storyId}`)

      this.story = response.data
    } catch (error) {
      this.errorHandler(error.response)
    }
  }
}
</script>

<style scoped>
.heading {
  font-size: 15px;
}
</style>
