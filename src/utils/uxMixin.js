export default {
  methods: {
    showMessage(message) {
      this.$store.commit('ux/setSnackState', { message, snackState: true });
    }
  }
};
