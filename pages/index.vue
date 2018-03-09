<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="logo blue--text text--darken-4">
          TADA
        </h1>
      </v-flex>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-title>
            <v-form v-on:submit="sendMail">
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
                label="Address"
                v-model="partner.address"
                required
                ></v-text-field>
              <v-btn type="submit" color="info">Submit</v-btn>
            </v-form>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    return {
      partner: {
        name: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  },
  head () {
    return {
      title: 'TADA'
    }
  },
  methods: {
    sendMail: function () {
      const { name, email, phone, address } = this.partner
      axios.post('/api/mailer', {
        name, email, phone, address
      })
        .then(() => {
          window.alert('sent')
          window.location.href = '/'
        })
        .catch(e => {
          alert(e)
        })
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

