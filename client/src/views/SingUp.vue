<template>
  <section class="hero is-fullheight has-background-secondary" v-on:keyup.enter="singUp">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <h1 class="title is-size-3-mobile is-size-2-desktop is-spaced">
              {{ $t('view.singUp.hero.title') }}
            </h1>
            <h2 class="subtitle is-size-4-mobile is-size-3-desktop">
              {{ $t('view.singUp.hero.subTitle') }}
            </h2>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="box">
              <b-field v-bind:label="$t('view.singUp.form.label.name')"
                      v-bind:type="{ 'is-danger': $v.name.$error }"
                      v-bind:message="[ !$v.name.required && $v.name.$error ? $t('default.error.field.is.required'):'' ]">
                  <b-input v-model.trim="name"/>
              </b-field>

              <b-field v-bind:label="$t('view.singUp.form.label.email')"
                      v-bind:type="{ 'is-danger': $v.email.$error }"
                      v-bind:message="[ !$v.email.required && $v.email.$error ? $t('default.error.field.is.required'):'',
                                        !$v.email.email && $v.email.$error ? $tc('default.error.field.is.invalid', 1, { field: $t('user.email') }):'',
                                        !$v.email.isUnique && $v.email.$error ? $t('user.error.email.isUnique'):'']">
                <b-input type="email" v-model.trim="email"/>
              </b-field>

              <b-field v-bind:label="$t('view.singUp.form.label.password')"
                      v-bind:type="{ 'is-danger': $v.password.$error }"
                      v-bind:message="[ !$v.password.required && $v.password.$error ? $t('default.error.field.is.required'):'',
                                        !$v.password.minLength && $v.password.$error ? $t('user.error.password.minLength', { minLength: 6 }):'' ]">
                <b-input type="password" v-model.trim="password" password-reveal/>
              </b-field>

              <div class="has-text-centered">
                <b-button type="is-primary" rounded v-on:click="singUp">
                  {{ $t('view.singUp.form.button.singUp') }}
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
      name: '',
      email: '',
      password: ''
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email,
      async isUnique (value) {
        try {
          if (this.$v.email.required && this.$v.email.email) {
            const response = await axios.get(`/users/email/${value}`)
            return response.data === null
          } else {
            return true
          }
        } catch (error) {
          return false
        }
      }
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    async singUp () {
      try {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          const response = await axios.post('/users', { name: this.name, email: this.email, password: this.password })

          const { token, user } = response.data

          this.startSession(token, user)

          this.$router.push({ name: 'storyList' })
        }
      } catch (error) {
        this.requestErrorHandler(error.response)
      }
    }
  }
}
</script>
