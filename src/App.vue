<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Poetry</span>
        <span class="font-weight-light">Tracker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2">Do nothing</span>
        <v-icon>mdi-diving-helmet</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="container">
      <div class="temp">
        <v-btn text><router-link to="/poem/:id">Single Poem</router-link></v-btn>
        <v-btn text><router-link to="/about">Smth</router-link></v-btn>
      </div>
      <router-view/>
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
