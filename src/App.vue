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

    <t-snackbar/>

    <v-footer app>
      <span>&copy; OneManBand 2019</span>
    </v-footer>

    <v-bottom-navigation app class="bottom-nav">
      <div class="bottom-nav__item mr-4">
        <v-icon class="bottom-nav__icon">mdi-fire</v-icon>
        <router-link class="bottom-nav__link" to="/purgatory">Purgatory</router-link>
      </div>
      <div class="bottom-nav__item mr-4">
        <v-icon class="bottom-nav__icon">mdi-anchor</v-icon>
        <router-link class="bottom-nav__link" to="/completed">Completed</router-link>
      </div>
      <div class="bottom-nav__item">
        <v-icon class="bottom-nav__icon">mdi-plus</v-icon>
        <router-link class="bottom-nav__link" to="/add">Add New</router-link>
      </div>
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
.home-link {
  text-decoration: none;
}

.home-link {
  color: rgba(0, 0, 0, 0.87);
}

.top-bar::v-deep .v-toolbar__content {
  justify-content: space-between;
}

.bottom-nav {
  &__item {
    position: relative;
    padding: 4px;
    opacity: 0.7;
  }

  &__icon.v-icon {
    display: block;
    height: 28px;
    width: 28px;
    margin: 0 auto 2px;
  }

  &__link {
    display: block;
    font-size: 12px;
    text-decoration: none;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
