<template>
  <div v-if="stage._id">
    <h1 class="title">
      {{ stage.name }}
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
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="content">
          <h1 class="is-size-4 m-b-4">
            {{ $tc('stage.event.label', 0) }}
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
                    {{ `${event.keyPhrase} ${event.body}` }}
                    <div class="is-size-7 has-text-right">
                      {{ event.author.name }}
                    </div>
                  </div>
                </div>
                <footer>
                  <a
                    href="#"
                    class="button is-primary m-r-2 has-badge-rounded"
                    data-show="quickview"
                    v-bind:data-target="`comments-event-${event._id}`"
                    v-on:click.prevent="updateCommentsReadBy(event)"
                    v-bind:data-badge="event.comments.filter(comment => { return !comment.readBy.includes($session.get('userId')) }).length">
                    {{ $tc('stage.event.comment', 0) }}
                  </a>

                  <a
                    href="#"
                    class="button is-primary m-r-2"
                    v-on:click="openEditEventModal(event)">
                    {{ $t('default.label.edit', { arg: '' }) }}
                  </a>

                  <a
                    href="#"
                    class="button is-danger"
                    v-on:click.prevent="deleteEvent(event._id)">
                    {{ $t('default.label.delete') }}
                  </a>
                </footer>

                <div v-bind:id="`comments-event-${event._id}`" class="quickview">
                  <header class="quickview-header m-b-3">
                    <p class="title">
                      {{ $tc('stage.event.comment', 0) }}
                    </p>
                    <span class="delete" data-dismiss="quickview"></span>
                  </header>

                  <div class="quickview-body">
                    <div class="quickview-block">
                      <p
                      class="box"
                      v-for="comment in event.comments"
                      v-bind:key="comment._id"
                      v-bind:class="[
                      comment.author._id === $session.get('userId') ? 'has-background-primary' : 'has-background-secondary',
                      comment.author._id === $session.get('userId') ? 'm-l-6' : 'm-l-3',
                      comment.author._id === $session.get('userId') ? '' : 'm-r-6',
                      comment.author._id === $session.get('userId') ? 'has-text-white' : ''
                      ]">
                        <strong v-bind:class="{'has-text-white': comment.author._id === $session.get('userId')}">{{ comment.author.name }}</strong> <br>
                        {{ comment.body }}
                      </p>
                    </div>
                  </div>

                  <footer class="quickview-footer">
                    <b-field v-bind:type="{ 'is-danger': $v.comment.$error }">
                      <b-input v-model="comment.body"/>
                      <p class="control">
                        <b-button
                          type="is-primary"
                          v-on:click="createComment(event._id)">
                          Enviar
                        </b-button>
                      </p>
                    </b-field>
                  </footer>
                </div>
              </div>
            </transition-group>
          </draggable>

          <b-field
            v-bind:label="$tc('stage.keyPhrase', 1)"
            v-if="hasNewEvent && stage.events.length === 0"
            v-bind:type="{ 'is-danger': $v.event.keyPhrase.$error }"
            v-bind:message="[ !$v.event.keyPhrase.required && $v.event.keyPhrase.$error ? $t('default.error.field.is.required'):'' ]">
            <b-select
              placeholder="Select a character"
              v-model="event.keyPhrase"
              required>
              <option
                v-for="keyPhrase in stage.keyPhrases"
                v-bind:key="keyPhrase"
                v-bind:value="keyPhrase">
                {{ keyPhrase }}
              </option>
            </b-select>
          </b-field>

          <b-field
            v-if="hasNewEvent"
            v-bind:label="$t('default.label.new.male', { arg: $tc('stage.event.label', 1) })"
            v-bind:type="{ 'is-danger': $v.event.body.$error }"
            v-bind:message="[ !$v.event.body.required && $v.event.body.$error ? $t('default.error.field.is.required'):'' ]">
            <b-input
              v-model="event.body"
              type="textarea"/>
          </b-field>

          <div class="has-text-centered">
            <b-button
            v-if="!hasNewEvent"
            v-on:click="() => {hasNewEvent = true, event.body = ''} "
            type="is-primary"
            rounded>
            {{ $t('default.label.new.male', { arg: $tc('stage.event.label', 1) }) }}
          </b-button>

          <b-button
            v-if="hasNewEvent"
            v-on:click="addEvent"
            type="is-primary"
            rounded>
            {{ $t('default.label.add', { arg: $tc('stage.event.label', 1) }) }}
          </b-button>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-bind:active.sync="isEditEventModalActive" has-modal-card>
      <story-edit-event-modal
        v-bind:keyPhrases="stage.keyPhrases"
        v-bind:event="eventToBeUpdated"/>
    </b-modal>
  </div>
</template>

<script>
import 'bulma-quickview/dist/css/bulma-quickview.min.css'
import bulmaQuickview from 'bulma-quickview/dist/js/bulma-quickview.min.js'
import { required, requiredIf } from 'vuelidate/lib/validators'
import draggable from 'vuedraggable'
import errorMixin from '@/mixins/error'
import StoryEditEventModal from '@/components/story/StoryEditEventModal.vue'

export default {
  mixins: [ errorMixin ],
  components: {
    draggable,
    StoryEditEventModal
  },
  data () {
    return {
      quickviews: [],
      hasNewEvent: false,
      isEditEventModalActive: false,
      eventToBeUpdated: {},
      event: {
        number: 0,
        author: this.$session.get('userId'),
        keyPhrase: '',
        body: '',
        readBy: [this.$session.get('userId')]
      },
      comment: {
        author: this.$session.get('userId'),
        body: '',
        readBy: [this.$session.get('userId')]
      }
    }
  },
  validations: {
    event: {
      keyPhrase: {
        required: requiredIf(function () {
          return this.stage.events.length === 0
        })
      },
      body: {
        required
      }
    },
    comment: {
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
        this.$v.event.$touch()

        if (!this.$v.event.$invalid) {
          this.$store.dispatch('loading/activate')

          await this.$store.dispatch('story/addEvent', {
            storyId: this.$store.state.story.story._id,
            stageId: this.stage._id,
            event: this.event
          })

          this.event.keyPhrase = ''
          this.event.body = ''
          this.hasNewEvent = false
          this.$v.event.$reset()

          this.attachQuickviews()

          this.$store.dispatch('loading/deactivate')
        }
      } catch (error) {
        this.errorHandler(error)
      }
    },
    async updateEvents () {
      try {
        this.hasNewEvent = false
        this.$store.dispatch('loading/activate')

        await this.$store.dispatch('story/updateEvents', {
          storyId: this.$store.state.story.story._id,
          stageId: this.stage._id,
          events: this.stage.events
        })

        this.$store.dispatch('loading/deactivate')
      } catch (error) {
        this.errorHandler(error)
      }
    },
    openEditEventModal (event) {
      this.hasNewEvent = false
      this.eventToBeUpdated = event
      this.isEditEventModalActive = true
    },
    async deleteEvent (eventId) {
      try {
        this.hasNewEvent = false
        this.$store.dispatch('loading/activate')

        await this.$store.dispatch('story/deleteEvent', {
          storyId: this.$store.state.story.story._id,
          stageId: this.stage._id,
          eventId: eventId
        })

        this.attachQuickviews()

        this.$store.dispatch('loading/deactivate')
      } catch (error) {
        this.errorHandler(error)
      }
    },
    async createComment (eventId) {
      try {
        this.$v.comment.$touch()

        if (!this.$v.comment.$invalid) {
          this.hasNewEvent = false
          this.$store.dispatch('loading/activate')

          await this.$store.dispatch('story/createComment', {
            storyId: this.$store.state.story.story._id,
            stageId: this.stage._id,
            eventId: eventId,
            comment: this.comment
          })

          this.comment.body = ''
          this.$v.comment.$reset()

          this.$store.dispatch('loading/deactivate')
        }
      } catch (error) {
        this.errorHandler(error)
      }
    },
    attachQuickviews () {
      this.$nextTick(() => {
        this.quickviews = bulmaQuickview.attach()
      })
    },
    updateEventReadBy (stage) {
      const unreadEvents = stage.events.filter(event => {
        return !event.readBy.includes(this.$session.get('userId'))
      })

      unreadEvents.forEach(async event => {
        console.log(event)
        await this.$store.dispatch('story/updateEventReadBy', {
          storyId: this.$store.state.story.story._id,
          stageId: this.stage._id,
          eventId: event._id,
          userId: this.$session.get('userId')
        })
      })
    },
    updateCommentsReadBy (event) {
      const unreadComments = event.comments.filter(comment => {
        return !comment.readBy.includes(this.$session.get('userId'))
      })

      unreadComments.forEach(async comment => {
        await this.$store.dispatch('story/updateComments', {
          storyId: this.$store.state.story.story._id,
          stageId: this.stage._id,
          eventId: event._id,
          commentId: comment._id,
          userId: this.$session.get('userId')
        })
      })
    }
  },
  async beforeCreate () {
    try {
      const storyId = this.$route.params.storyId

      await this.$store.dispatch('story/findById', storyId)

      await this.updateEventReadBy(this.stage)

      this.attachQuickviews()
    } catch (error) {
      this.errorHandler(error.response)
    }
  }
}
</script>

<style lang="css" scoped>
.card footer {
  text-align: right;
  padding-right: 15px;
  padding-bottom: 15px;
}
.quickview {
  z-index: 100;
}
</style>
