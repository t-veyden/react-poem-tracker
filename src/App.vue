<template>
  <v-app>
    <v-app-bar class="top-bar" app>
      <v-toolbar-title class="headline text-uppercase mr-2">
        <router-link class="home-link" to="/">
          <span>Poetry</span>
          <span class="font-weight-light">Tracker</span>
        </router-link>
      </v-toolbar-title>

      <v-btn text>
        <v-icon>mdi-diving-helmet</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid full-height>
        <router-view />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; OneManBand 2019</span>
    </v-footer>

    <v-bottom-navigation app>
      <v-btn icon text large class="mr-4">
        <router-link class="btn-link" to="/purgatory">Purgatory</router-link>
        <v-icon>mdi-fire</v-icon>
      </v-btn>
      <v-btn icon text large class="mr-4">
        <router-link class="btn-link" to="/completed">Completed</router-link>
        <v-icon>mdi-anchor</v-icon>
      </v-btn>
      <v-btn icon text large>
        <router-link class="btn-link" to="/add">Add New</router-link>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-bottom-navigation>
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

.top-bar::v-deep .v-toolbar__content {
  justify-content: space-between;
}
</style>
