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

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  name: 'Snackbar',
  computed: mapState('ux', ['snackbar'])
})
export default class Snackbar extends Vue {
  @Watch('snackbar.snackState')
  handler(val: boolean) {
    if (val) {
      setTimeout(() => {
        this.close();
      }, 2000);
    }
  }

  close() {
    this.$store.commit('ux/setSnackState', {
      message: '',
      snackState: false
    });
  }
}
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
