<template>
  <div>
    <b-collapse class="card m-b-3"
      v-for="story in stories"
      v-bind:key="story._id"
      v-bind:open="false">
      <div class="card-header"
        slot="trigger"
        slot-scope="props"
        role="button">
        <p class="card-header-title">
          {{ story.title }}
        </p>
        <a class="card-header-icon">
          <b-icon v-bind:icon="props.open ? 'caret-up' : 'caret-down'"/>
        </a>
      </div>

      <div class="card-content"
        v-if="story.objective">
        <div class="content">
          {{ story.objective }}

          <b-taglist class="m-t-3">
            <b-tag
              v-for="keyword in story.keywords"
              v-bind:key="keyword"
              type="is-secondary"
              rounded>
              {{ keyword }}
            </b-tag>
          </b-taglist>
        </div>
      </div>

      <footer class="card-footer">
        <a href="#" class="card-footer-item has-background-primary has-text-white">
          {{ $t('default.label.view') }}
        </a>

        <a href="#" class="card-footer-item has-background-primary has-text-white"
          v-if="isLeader(story.authors)">
          {{ $t('default.label.edit') }}
        </a>

        <a href="#" class="card-footer-item has-background-danger has-text-white"
          v-if="isLeader(story.authors)">
          {{ $t('default.label.delete') }}
        </a>
      </footer>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ['stories'],
  methods: {
    isLeader (authors) {
      const leaders = authors.filter(author => {
        return author.role === 0
      }).map(author => {
        return author.user
      })

      return leaders.includes(this.$session.get('userId'))
    }
  }
}
</script>
