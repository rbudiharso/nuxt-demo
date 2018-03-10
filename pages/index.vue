<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="logo blue--text text--darken-4">
          TADA
        </h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-snackbar
          color="success"
          top="true"
          v-model="alert"
        >
          <span text-xs-center>Thank you for being our partner</span>  
        </v-snackbar>
      </v-flex>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-card-title>
            <v-form v-on:submit.prevent="sendMail">
              <v-text-field
                label="Name"
                v-model="partner.name"
                required
                ></v-text-field>
              <v-text-field
                label="Phone"
                type="phone"
                v-model="partner.phone"
                required
                ></v-text-field>
              <v-text-field
                label="Email"
                type="email"
                v-model="partner.email"
                required
                ></v-text-field>
              <v-text-field
                label="Company"
                v-model="partner.company"
                required
                ></v-text-field>
              <v-btn type="submit" color="info">Submit</v-btn>
            </v-form>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <br />
        <span class="text-center grey--text text-lighten-1">Copyright &copy; TADA 2018</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'

const empty = {
  name: '',
  phone: '',
  email: '',
  company: ''
}

export default {
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
  methods: {
    sendMail: function () {
      this.alert = true
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
  }
}
</script>

<style>
.logo {
  text-align: center;
  font-size: 68px;
}
form {
  width: 100%;
}
</style>

