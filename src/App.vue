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
