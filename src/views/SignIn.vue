<template>
  <div>
    sign in to load your stuff

    <form @submit.prevent="submitForm">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="signInData.email">
      <label for="email">Password</label>
      <input type="password" name="password" id="password" v-model="signInData.password">
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signInData: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    submitForm() {
      this.$store.dispatch('admin/signIn', this.signInData)
    }
  }
}
</script>
