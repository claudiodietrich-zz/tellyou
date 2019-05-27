<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">
              {{ $tc('story.label', 2) }}
            </h1>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <router-link class="button is-primary is-rounded"
              v-bind:to="{ name: 'storyCreate' }">
              {{ $t('default.label.create', { arg: $tc('story.label', 1) }) }}
            </router-link>
          </div>
        </div>
      </div>

      <b-tabs
        v-model="activeTab"
        type="is-boxed">
        <b-tab-item
          v-bind:label="$tc('default.label.my.female', 2, { arg: $tc('story.label', 2) })">

          <b-loading style="height: 250px;"
          v-bind:is-full-page="false"
          v-bind:active.sync="isLoading"
          v-bind:can-cancel="true"/>

          <story-list
            v-if="userStories.length > 0 && !isLoading"
            v-bind:stories="userStories"/>

          <story-list-empty
            v-if="userStories.length === 0 && !isLoading"
            v-bind:message="$t('view.story.list.empty.user.stories')"/>
        </b-tab-item>

        <b-tab-item
          v-bind:label="$t('default.label.all.female', { arg: $tc('story.label', 2) })">

          <b-loading style="height: 250px;"
            v-bind:is-full-page="false"
            v-bind:active.sync="isLoading"
            v-bind:can-cancel="true"/>

          <story-list
            v-if="stories.length > 0 && !isLoading"
            v-bind:stories="stories"/>

          <story-list-empty
            v-if="stories.length === 0 && !isLoading"
            v-bind:message="$t('view.story.list.empty.stories')"/>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import errorMixin from '@/mixins/error'
import StoryList from '@/components/story/StoryList.vue'
import StoryListEmpty from '@/components/story/StoryListEmpty.vue'

export default {
  mixins: [ errorMixin ],
  components: {
    StoryList,
    StoryListEmpty
  },
  data () {
    return {
      activeTab: 0,
      isLoading: false,
      userStories: [],
      stories: []
    }
  },
  async created () {
    this.isLoading = true

    try {
      const storiesResponse = await axios.get('/stories')
      this.stories = storiesResponse.data

      const userStoriesResponse = await axios.get(`/stories/user/${this.$session.get('userId')}`)
      this.userStories = userStoriesResponse.data

      this.isLoading = false
    } catch (error) {
      this.errorHandler(error.response)
    }
  }
}
</script>
