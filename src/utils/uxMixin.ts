import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class uxMixin extends Vue {
  showMessage(message: string) {
    this.$store.commit('ux/setSnackState', { message, snackState: true });
  }
};
