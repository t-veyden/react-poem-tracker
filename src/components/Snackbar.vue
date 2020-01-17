<template>
  <v-snackbar
    v-model="snackbar.snackState"
    :timeout="0"
    bottom
    class="snackbar"
  >
    <v-icon color="success" class="snackbar__icon">mdi-check</v-icon>
    <p class="snackbar__message">{{ snackbar.message }}</p>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Snackbar",
  computed: {
    ...mapState({
      snackbar(state) {
        return state.ux.snackbar;
      }
    })
  },

  watch: {
    "snackbar.snackState"(val) {
      if (val) {
        setTimeout(() => {
          this.close();
        }, 2000);
      }
    }
  },

  methods: {
    close() {
      this.$store.commit("ux/setSnackState", {
        message: "",
        snackState: false
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.snackbar {
  &__message {
    width: 100%;
    margin: 0;
    text-align: center;
  }
}
</style>
