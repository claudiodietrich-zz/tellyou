<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <vdiv class="columns">
          <div class="column is-half is-offset-one-quarter">
            <h1 class="title is-size-3-mobile is-size-2-desktop is-spaced">
              {{ $t('view.singin.hero.title') }}
            </h1>
            <h2 class="subtitle is-size-4-mobile is-size-3-desktop">
              {{ $t('view.singin.hero.subTitle') }}
            </h2>
          </div>
        </vdiv>
        <div class="colunms">
          <div class="column is-half is-offset-one-quarter">
          <div class="box">
            <b-field v-bind:label="$t('view.singin.form.name')"
                     v-bind:type="{ 'is-danger': $v.name.$error }"
                     v-bind:message="[ !$v.name.required && $v.name.$error ? $t('error.field.is.required'):'' ]">
                <b-input v-model.trim="name"/>
            </b-field>

            <b-field v-bind:label="$t('view.singin.form.email')"
                     v-bind:type="{ 'is-danger': $v.email.$error }"
                     v-bind:message="[ !$v.email.required && $v.email.$error ? $t('error.field.is.required'):'',
                                       !$v.email.email && $v.email.$error ? $tc('error.field.is.invalid', 1, { field: $t('user.email') }):'']">
              <b-input type="email" v-model.trim="email"/>
            </b-field>

            <b-field v-bind:label="$t('view.singin.form.password')"
                     v-bind:type="{ 'is-danger': $v.password.$error }"
                     v-bind:message="[ !$v.password.required && $v.password.$error ? $t('error.field.is.required'):'',
                                       !$v.password.minLength && $v.password.$error ? $t('user.error.password.minLength', { minLength: 6 }):'' ]">
              <b-input type="password" v-model.trim="password" password-reveal/>
            </b-field>

            <button v-on:click="$v.$touch()">Validar</button>
          </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
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
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>
