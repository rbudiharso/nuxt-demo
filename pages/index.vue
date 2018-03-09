<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="logo">
          TADA
        </h1>
      </v-flex>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-title>
            <v-form>
              <v-text-field
                label="Name"
                v-model="partner.name"
                required
                ></v-text-field>
              <v-text-field
                label="Phone"
                v-model="partner.phone"
                required
                ></v-text-field>
              <v-text-field
                label="Email"
                v-model="partner.email"
                required
                ></v-text-field>
              <v-text-field
                label="Address"
                v-model="partner.address"
                required
                ></v-text-field>
              <v-btn color="info">Submit</v-btn>
            </v-form>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from '~/plugins/axios'

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

