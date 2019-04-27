export default {
  methods: {
    requestErrorHandler (error) {
      const status = error.status
      let message = this.$t('default.error.message')

      switch (status) {
        case 422:
          message = this.$t('default.error.validation')
          break
      }

      this.$toast.open({
        type: 'is-danger',
        duration: 5000,
        position: 'is-top',
        message
      })
    }
  }
}
