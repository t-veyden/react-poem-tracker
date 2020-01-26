interface Snackbar {
  message: string;
  snackState: boolean;
}

interface UxState {
  snackbar: Snackbar;
}

const ux = {
  namespaced: true,

  state: {
    snackbar: {
      message: '',
      snackState: false
    }
  },

  mutations: {
    setSnackState(state: UxState, { message, snackState }: Snackbar) {
      state.snackbar.message = message;
      state.snackbar.snackState = snackState;
    }
  }
};

export default ux;
