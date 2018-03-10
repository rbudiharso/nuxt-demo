<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center>
        <h1 class="logo blue--text text--darken-4">
          TADA
        </h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-snackbar
          text-xs-center
          color="success"
          v-model="alert"
          top
        >
          <span>Thank you for being our partner</span>  
        </v-snackbar>
      </v-flex>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-card-title>
            <v-form v-on:submit.prevent="sendMail">
              <v-text-field
                label="Name"
                v-model="partner.name"
                prepend-icon="person"
                @input="$v.partner.name.$touch()"
                :error-messages="nameErrors"
                required
                ></v-text-field>
              <v-text-field
                label="Phone"
                type="phone"
                v-model="partner.phone"
                @input="$v.partner.phone.$touch()"
                :error-messages="phoneErrors"
                prepend-icon="phone"
                required
                ></v-text-field>
              <v-text-field
                label="Email"
                type="email"
                v-model="partner.email"
                @blur="$v.partner.email.$touch()"
                :error-messages="emailErrors"
                prepend-icon="email"
                required
                ></v-text-field>
              <v-text-field
                label="Company"
                v-model="partner.company"
                :error-messages="companyErrors"
                prepend-icon="business"
                required
                ></v-text-field>
              <div class="btns">
                <v-btn type="reset" flat @click="reset">Reset</v-btn>
                <v-btn type="submit" color="info">Submit</v-btn>
              </div>
            </v-form>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center>
        <br />
        <span class="grey--text text-lighten-1">Copyright &copy; TADA 2018</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, numeric } from 'vuelidate/lib/validators'
import axios from '~/plugins/axios'

const empty = {
  name: '',
  phone: '',
  email: '',
  company: ''
}

export default {
  mixins: [validationMixin],
  async asyncData () {
    return {
      partner: Object.assign({}, empty),
      alert: false
    }
  },
  head () {
    return {
      title: 'TADA'
    }
  },
  validations: {
    partner: {
      name: { required },
      email: { required, email },
      phone: { required, numeric },
      company: { required }
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.partner.name.$dirty) return errors
      !this.$v.partner.name.required && errors.push('Name is required.')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.partner.phone.$dirty) return errors
      !this.$v.partner.phone.numeric && errors.push('Must be valid phone number.')
      !this.$v.partner.phone.required && errors.push('Phone is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.partner.email.$dirty) return errors
      !this.$v.partner.email.email && errors.push('Must be valid e-mail')
      !this.$v.partner.email.required && errors.push('E-mail is required')
      return errors
    },
    companyErrors () {
      const errors = []
      if (!this.$v.partner.company.$dirty) return errors
      !this.$v.partner.company.required && errors.push('Company is required.')
      return errors
    }
  },
  methods: {
    sendMail: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.alert = true
        this.$v.$reset()
        axios
          .post('/api/mailer', this.partner)
          .then(() => {
            this.partner = Object.assign({}, empty)
            const a = setTimeout(() => {
              this.alert = false
              clearTimeout(a)
            }, 3000)
          })
          .catch(alert)
      }
    },
    reset: function () {
      this.$v.$reset()
      this.partner = Object.assign({}, empty)
    }
  }
}
</script>

<style>
.logo {
  font-size: 68px;
}
form {
  width: 100%;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.btn.info {
  margin-right: 0;
}
</style>

