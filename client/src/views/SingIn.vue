<template>
  <section class="hero is-fullheight has-background-secondary"
    v-on:keyup.enter="singIn">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <h1 class="title is-size-3-mobile is-size-2-desktop is-spaced">
              {{ $t('view.singIn.hero.title') }}
            </h1>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="box">
              <b-field
                v-bind:label="$t('view.singIn.form.label.email')"
                v-bind:type="{ 'is-danger': $v.email.$error }"
                v-bind:message="[ !$v.email.required && $v.email.$error ? $t('default.error.field.is.required'):'',
                                  !$v.email.email && $v.email.$error ? $tc('default.error.field.is.invalid.male', 1, { field: $t('user.email') }):'']">
                <b-input
                  v-model.trim="email"
                  type="email"/>
              </b-field>

              <b-field
                v-bind:label="$t('view.singIn.form.label.password')"
                v-bind:type="{ 'is-danger': $v.password.$error }"
                v-bind:message="[ !$v.password.required && $v.password.$error ? $t('default.error.field.is.required'):'',
                                  !$v.password.minLength && $v.password.$error ? $t('user.error.password.minLength', { minLength: 6 }):'' ]">
                <b-input
                  v-model.trim="password"
                  type="password"
                  password-reveal/>
              </b-field>

              <div class="has-text-centered">
                <b-button
                  v-on:click="singIn"
                  type="is-primary"
                  rounded>
                  {{ $t('view.singIn.button.singIn') }}
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import errorMixin from '@/mixins/error'
import userMixin from '@/mixins/user'

export default {
  mixins: [ userMixin, errorMixin ],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    async singIn () {
      try {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          const response = await axios.post('/users/authenticate', { email: this.email, password: this.password })

          const { token, user } = response.data

          this.startSession(token, user)

          this.$router.push({ name: 'storyList' })
        }
      } catch (error) {
        this.errorHandler(error.response)
      }
    }
  }
}
</script>
