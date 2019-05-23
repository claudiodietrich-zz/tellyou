<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        {{ $t('view.story.create.title') }}
      </h1>

      <div class="box">
        <div v-if="currentStep === 0">
          <h1 class="is-size-4 m-b-4">
            {{ $t('view.story.create.form.title.story') }}
          </h1>

          <b-field
            v-bind:label="$t('view.story.create.form.label.title')"
            v-bind:type="{ 'is-danger': $v.title.$error }"
            v-bind:message="[ !$v.title.required && $v.title.$error ? $t('default.error.field.is.required'):'']">
            <b-input
              v-model.trim="title"/>
          </b-field>

          <b-field
            v-bind:label="$t('view.story.create.form.label.keywords')"
            v-bind:message="$t('view.story.create.form.message.keywords')">
            <b-taginput
              v-model="keywords"
              type="is-primary"/>
          </b-field>

          <b-field
            v-bind:label="$t('view.story.create.form.label.objective')">
            <b-input
              v-model.trim="objective"
              type="textarea"/>
          </b-field>
        </div>

        <div v-show="currentStep === 1">
          <h1 class="is-size-4 m-b-4">
            {{ $t('view.story.create.form.title.author') }}
          </h1>

          <b-field
            v-bind:label="$t('view.story.create.form.label.leader')">
            <b-input
              v-bind:value="leader.name"
              disabled/>
          </b-field>

          <b-field
            v-bind:label="$t('view.story.create.form.label.revisors')"
            v-bind:message="$t('view.story.create.form.message.revisors')">
            <b-taginput
              v-model="reviewers"
              v-bind:data="filteredUsers"
              v-on:typing="getUsers"
              v-on:add="addReviewer"
              v-on:remove="removeAuthor"
              v-bind:allow-new="false"
              v-bind:placeholder="$t('default.label.add', { arg: $t('story.revisor') })"
              field="name"
              type="is-primary"
              autocomplete>
              <template
                slot-scope="props">
                <strong>{{props.option.name}}</strong> ({{props.option.email}})
              </template>
            </b-taginput>
          </b-field>

          <b-field
            v-bind:label="$t('view.story.create.form.label.storytellers')"
            v-bind:message="$t('view.story.create.form.message.storytellers')">
            <b-taginput
              v-model="storytellers"
              v-bind:data="filteredUsers"
              v-on:typing="getUsers"
              v-on:add="addStoryteller"
              v-on:remove="removeAuthor"
              v-bind:allow-new="false"
              v-bind:placeholder="$t('default.label.add', { arg: $t('story.storyteller') })"
              field="name"
              type="is-primary"
              autocomplete>
              <template
                slot-scope="props">
                <strong>{{props.option.name}}</strong> ({{props.option.email}})
              </template>
            </b-taginput>
          </b-field>
        </div>

        <div v-show="currentStep === 2">
          <h1 class="is-size-4 m-b-2">
            {{ $t('view.story.create.form.title.archetypes') }}
          </h1>

          <p class="m-b-4" v-html="$t('view.story.create.form.description.archetypes')"/>

          <template>
            <b-table
              v-bind:data="archetypesTableData"
              v-bind:checked-rows.sync="archetypes"
              v-bind:show-detail-icon="true"
              v-bind:is-row-checkable="(row) => row.required !== true"
              v-on:check-all="checkAllArchetypes"
              ref="archetypesTable"
              checkable
              detailed>
              <template
                slot-scope="props">
                <b-table-column
                  v-bind:label="$t('story.archetype')"
                  field="name"
                  width="180">
                  <a v-on:click="$refs.archetypesTable.toggleDetails(props.row)">
                    {{ props.row.name }}
                  </a>
                </b-table-column>

                <b-table-column
                  v-bind:label="$t('story.character')"
                  field="character">
                  <b-field
                    v-bind:type="{ 'is-danger': archetypes.includes(props.row) && props.row.character === '' && !archetypesAreValid }"
                    v-bind:message="[ archetypes.includes(props.row) && props.row.character === '' && !archetypesAreValid ? $t('default.error.field.is.required'):'']">
                    <b-input
                      v-model.trim="props.row.character"/>
                  </b-field>
                </b-table-column>
              </template>

              <template
                slot="detail"
                slot-scope="props">
                {{ props.row.description }}
              </template>
            </b-table>
          </template>
        </div>

        <div v-show="currentStep === 3">
          <h1 class="is-size-4 m-b-2">
            {{ $t('view.story.create.form.title.stage') }}
          </h1>

          <p class="m-b-4">
            {{ $t('view.story.create.form.description.stage') }}
          </p>

          <template>
            <b-table
              v-bind:data="stagesTableData"
              v-bind:checked-rows.sync="stages"
              v-bind:show-detail-icon="true"
              v-bind:is-row-checkable="(row) => row.required !== true"
              v-on:check-all="checkAllStages"
              ref="stagesTable"
              checkable
              detailed>
              <template
                slot-scope="props">
                <b-table-column
                  v-bind:label="$t('stage.number')"
                  v-bind:numeric="true"
                  field="number">
                  {{ props.row.number }}
                </b-table-column>

                <b-table-column
                  v-bind:label="$t('stage.label')"
                  field="name">
                  <a v-on:click="$refs.stagesTable.toggleDetails(props.row)">
                    {{ props.row.name }}
                  </a>
                </b-table-column>

                <b-table-column
                  v-bind:label="$t('stage.description')"
                  field="description">
                  {{ props.row.description }}
                </b-table-column>
              </template>

              <template slot="detail" slot-scope="props">
                <div class="columns">
                  <div class="column">
                    <div class="content">
                      <p>{{ $t('stage.contex') }}</p>
                      <ul>
                        <li
                          v-for="context in props.row.context"
                          v-bind:key="context">
                          {{ context }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="column">
                    <div class="content">
                      <p>{{ $t('stage.keyPhrase') }}</p>
                      <ul>
                        <li
                          v-for="keyPhrase in props.row.keyPhrases"
                          v-bind:key="keyPhrase">
                          {{ keyPhrase }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </template>
            </b-table>
          </template>
        </div>

        <div class="columns m-t-3">
          <div class="column">
            <b-button v-if="currentStep > 0"
              v-on:click="previousStep"
              rounded>
              <vue-fontawesome icon="chevron-left"/>
              {{ $t('default.label.backward') }}
            </b-button>
          </div>

          <div class="column is-offset-9 has-text-right">
            <b-button v-if="currentStep <= 2"
              v-on:click="nextStep"
              type="is-primary"
              rounded>
              {{ $t('default.label.forward') }}
              <vue-fontawesome icon="chevron-right"/>
            </b-button>
            <b-button v-else
              v-on:click="register"
              type="is-primary"
              rounded>
              {{ $t('default.label.register') }}
            </b-button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import errorMixin from '@/mixins/error'

export default {
  mixins: [ errorMixin ],
  data () {
    return {
      title: '',
      objective: '',
      keywords: [],
      authors: [],
      archetypes: [],
      stages: [],
      filteredUsers: [],
      leader: {},
      reviewers: [],
      storytellers: [],
      currentStep: 0,
      archetypesTableData: [],
      archetypesAreValid: true,
      stagesTableData: []
    }
  },
  validations: {
    title: {
      required
    }
  },
  methods: {
    previousStep () {
      if (this.currentStep > 0) {
        this.archetypesAreValid = true
        this.currentStep--
      }
    },
    nextStep () {
      if (this.currentStep === 0) {
        this.$v.title.$touch()
      }

      if (this.currentStep === 2) {
        this.validateArchetypes()
      }

      if (!this.$v.$invalid && this.archetypesAreValid && this.currentStep <= 2) {
        this.currentStep++
      }
    },
    async register () {
      try {
        if (!this.$v.$invalid && this.archetypesAreValid && this.currentStep === 3) {
          await axios.post('/stories', { title: this.title, objective: this.objective, keywords: this.keywords, authors: this.authors, archetypes: this.archetypes, stages: this.stages })

          this.$router.push({ name: 'storyList' })
        }
      } catch (error) {
        this.requestErrorHandler(error.response)
      }
    },
    async getUsers (text) {
      if (text.length >= 3) {
        try {
          const response = await axios.get(`/users/name/${text}`)
          const users = response.data

          this.filteredUsers = users.filter(user => {
            return !this.authors.some(author => author.user === user._id)
          })
        } catch (error) {
          this.userList = []
        }
      }
    },
    addReviewer (reviewer) {
      this.authors.push({
        user: reviewer._id,
        role: 1
      })
    },
    addStoryteller (storyteller) {
      this.authors.push({
        user: storyteller._id,
        role: 2
      })
    },
    removeAuthor (removedAuthor) {
      this.authors = this.authors.filter(author => {
        return author.user !== removedAuthor._id
      })
    },
    checkAllArchetypes (archetypes) {
      const requiredArchetypes = this.archetypesTableData.filter(archetype => {
        return archetype.required === true
      })

      archetypes.push.apply(archetypes, requiredArchetypes)
    },
    validateArchetypes () {
      this.archetypesAreValid = true

      this.archetypes.forEach(archetype => {
        if (archetype.character === '') {
          this.archetypesAreValid = false
        }
      })
    },
    checkAllStages (stages) {
      const requiredStages = this.stagesTableData.filter(stage => {
        return stage.required === true
      })

      stages.push.apply(stages, requiredStages)
    }
  },
  async created () {
    this.leader = {
      _id: this.$session.get('userId'),
      name: this.$session.get('userName')
    }

    this.authors.push({
      user: this.leader._id,
      role: 0
    })

    try {
      const archetypesResponse = await axios.get('/archetypes')
      this.archetypesTableData = archetypesResponse.data

      this.archetypes = this.archetypesTableData.filter(archetype => {
        return archetype.required === true
      })

      const stagesResponse = await axios.get('/stages')
      this.stagesTableData = stagesResponse.data

      this.stages = this.stagesTableData.filter(stage => {
        return stage.required === true
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>