<template>
  <b-taglist attached>
    <b-tag
      v-bind:size="size"
      v-bind:rounded="rounded"
      v-bind:ellipsis="ellipsis"
      v-bind:tabstop="tabstop">status</b-tag>
    <b-tag
      v-bind:type="type"
      v-bind:size="size"
      v-bind:rounded="rounded"
      v-bind:ellipsis="ellipsis"
      v-bind:tabstop="tabstop">{{statusToText}}</b-tag>
  </b-taglist>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: false
    },
    tabstop: {
      type: Boolean,
      default: false
    },
    status: {
      required: true
    }
  },
  computed: {
    type: function () {
      switch (this.status) {
        case 0: {
          return 'is-primary'
        }

        case 1: {
          return 'is-warning'
        }

        case 2: {
          return 'is-info'
        }

        case 3: {
          return 'is-success'
        }

        default: {
          return 'is-primary'
        }
      }
    },
    statusToText: function () {
      switch (this.status) {
        case 0: {
          return this.$t('story.status.created')
        }

        case 1: {
          return this.$t('story.status.inReview')
        }

        case 2: {
          return this.$t('story.status.revised')
        }

        case 3: {
          return this.$t('story.status.finished')
        }

        default: {
          return ''
        }
      }
    }
  }
}
</script>
