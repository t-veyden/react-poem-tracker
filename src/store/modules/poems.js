import Vue from 'vue'

const poems = {
  namespaced: true,

  state: {
    poems: []
  },

  mutations: {
    getPoemsData(state, poems) {
      state.poems = poems;
    }
  },

  actions: {
    getPoemsData({commit}) {
      Vue.http.get('http://localhost:3000/poems')
        .then(response => {
          commit('getPoemsData', response.body)
        })
        .catch(error => {
          console.log(error.statusText)
        })
    }
  }
}

export default poems;
