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

    <div class="columns">
      <div class="column">
        <div class="content">
          <h1 class="is-size-4 m-b-4">
            {{ $tc('stage.event', 0) }}
          </h1>

          <draggable
            v-model="stage.events"
            v-on:end="updateEvents">
            <transition-group>
              <div
                class="card m-b-4"
                v-for="event in stage.events"
                v-bind:key="event._id">
                <div class="card-content">
                  <div class="content">
                    {{ event.body }}
                    <div class="is-size-7 has-text-right">
                      {{ event.author.name }}
                    </div>
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item">Save</a>
                  <a href="#" class="card-footer-item">Edit</a>
                  <a href="#" class="card-footer-item">Delete</a>
                </footer>
              </div>
            </transition-group>
          </draggable>

          <b-field
            v-if="hasNewEvent"
            v-bind:label="$t('default.label.new.male', { arg: $tc('stage.event', 1) })"
            v-bind:type="{ 'is-danger': $v.event.$error }"
            v-bind:message="[ !$v.event.body.required && $v.event.body.$error ? $t('default.error.field.is.required'):'' ]">
            <b-input
              v-model="event.body"
              type="textarea"/>
          </b-field>

          <div class="has-text-centered">
            <b-button
            v-if="!hasNewEvent"
            v-on:click="hasNewEvent = true"
            type="is-primary"
            rounded>
            {{ $t('default.label.new.male', { arg: $tc('stage.event', 1) }) }}
          </b-button>

          <b-button
            v-if="hasNewEvent"
            v-on:click="addEvent"
            type="is-primary"
            rounded>
            {{ $t('default.label.add', { arg: $tc('stage.event', 1) }) }}
          </b-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import draggable from 'vuedraggable'
import errorMixin from '@/mixins/error'

export default {
  mixins: [ errorMixin ],
  components: {
    draggable
  },
  data () {
    return {
      hasNewEvent: false,
      event: {
        number: 0,
        author: this.$session.get('userId'),
        body: ''
      }
    }
  },
  validations: {
    event: {
      body: {
        required
      }
    }
  },
  computed: {
    stage () {
      const stageId = this.$route.params.stageId
      const stages = this.$store.state.story.story.stages

      return stages ? stages.filter(stage => stage._id === stageId)[0] : {}
    }
  },
  methods: {
    async addEvent () {
      try {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          await this.$store.dispatch('story/addEvent', {
            storyId: this.$store.state.story.story._id,
            stageId: this.stage._id,
            event: this.event
          })

          this.event.body = ''
          this.hasNewEvent = false
          this.$v.$reset()
        }
      } catch (error) {
        this.errorHandler(error)
      }
    },
    async updateEvents () {
      try {
        await this.$store.dispatch('story/updateEvents', {
          storyId: this.$store.state.story.story._id,
          stageId: this.stage._id,
          events: this.stage.events
        })
      } catch (error) {
        this.errorHandler(error)
      }
    }
  },
  async beforeCreate () {
    try {
      const storyId = this.$route.params.storyId

      await this.$store.dispatch('story/findById', storyId)
    } catch (error) {
      this.errorHandler(error.response)
    }
  }
}
</script>
