import Vue from 'vue'

const admin = {
  namespaced: true,

  state: {
    id: null
  },

  getters: {

  },

  mutations: {
    authUser(state, authData) {
      state.id = authData.id
    }
  },

  actions: {
    signIn({commit}, payload) {
      Vue.http.post('http://localhost:3000/users', {...payload})
      .then(response => response.json())
      .then(authData => {
        commit('authUser', {
          ...authData
        });
        localStorage.setItem('id', authData.id)
      })
    }
  }
}

export default admin;
