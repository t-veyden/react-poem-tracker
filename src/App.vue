<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase mr-2">
        <router-link class="home-link" to="/">
          <span>Poetry</span>
          <span class="font-weight-light">Tracker</span>
        </router-link>
      </v-toolbar-title>

      <v-btn text><router-link class="btn-link" to="/purgatory">Purgatory</router-link></v-btn>
      <v-btn text><router-link class="btn-link" to="/completed">Completed</router-link></v-btn>
      <v-btn text><router-link class="btn-link" to="/add">Add New</router-link></v-btn>

      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2">Do nothing</span>
        <v-icon>mdi-diving-helmet</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="container">
      <router-view />
    </v-content> 

    <v-content></v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>

<style lang="scss" scoped>
  .home-link, 
  .btn-link {
    text-decoration: none;
  }

  .home-link {
    color: rgba(0, 0, 0, 0.87);
  }
</style>
