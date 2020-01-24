const ux = {
  namespaced: true,

  state: {
    snackbar: {
      message: '',
      snackState: false
    }
  },

  mutations: {
    setSnackState(state, { message, snackState }) {
      state.snackbar.message = message;
      state.snackbar.snackState = snackState;
    }
  }
};

export default ux;
