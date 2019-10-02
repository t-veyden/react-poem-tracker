import Vue from 'vue'

const poems = {
  namespaced: true,

  state: {
    poems: [],
    isAdded: false
  },

  getters: {
    newPoemStatus(state) {
      return state.isAdded;
    },

    completedPoems(state) {
      return state.poems.filter(poem => poem.status === 'completed');
    },

    pendingPoems(state) {
      return state.poems.filter(poem => poem.status === 'pending');
    },

    currentPoems(state) {
      return state.poems.filter(poem => poem.status === 'current');
    }
  },

  mutations: {
    getPoemsData(state, poems) {
      state.poems = poems;
    },

    addPoem(state) {
      state.isAdded = true;
    },

    clearMessage(state) {
      state.isAdded = false;
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
    },

    addPoem({commit}, payload) {
      Vue.http.post('http://localhost:3000/poems', payload)
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        commit('addPoem');
        setTimeout(() => {
          commit('clearMessage');
        }, 3000);
      })
    }
  }
}

export default poems;
