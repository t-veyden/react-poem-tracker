import Vue from 'vue';

const poems = {
  namespaced: true,

  state: {
    poems: [],
    poem: {},
    isAdded: false,
    isDeleted: false,
    isUpdated: false
  },

  getters: {
    newPoemStatus(state) {
      return state.isAdded;
    },

    completedPoems(state) {
      return state.poems.filter(poem => poem.completed);
    },

    pendingPoems(state) {
      return state.poems.filter(poem => !poem.completed);
    },

    currentPoems(state) {
      return state.poems.filter(poem => poem.in_progress);
    }
  },

  mutations: {
    getPoemsData(state, poems) {
      state.poems = poems;
    },

    getSinglePoem(state, poem) {
      state.poem = poem;
    },

    addPoem(state) {
      state.isAdded = true;
    },

    deletePoem(state) {
      state.isDeleted = true;
    },

    updatePoemInfo(state) {
      state.isUpdated = true;
    },

    clearMessage(state, target) {
      state[target] = false;
    }
  },

  actions: {
    getPoemsData({ commit }) {
      Vue.http
        .get('http://localhost:3000/poems')
        .then(response => {
          commit('getPoemsData', response.body);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },

    getSinglePoem({ commit }, id) {
      Vue.http
        .get(`http://localhost:3000/poems/${id}`)
        .then(response => {
          commit('getSinglePoem', response.body);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },

    addPoem({ commit }, payload) {
      Vue.http
        .post('http://localhost:3000/poems', payload)
        .then(response => response.json())
        .then(response => {
          // console.log(response)
          commit('addPoem');
          setTimeout(() => {
            commit('clearMessage', 'isAdded');
          }, 3000);
        });
    },

    updatePoemStatus({ commit, dispatch }, payload) {
      console.log(payload);
      Vue.http
        .patch(`http://localhost:3000/poems/${payload.id}`, payload.p, {
          'Content-Type': 'application/json'
        })
        .then(response => {
          console.log(response);
          response.json(); // what for?
        })
        .then(response => {
          console.log('PATCH');
          dispatch('getSinglePoem', payload.id);
        });
    },

    updatePoemInfo({ commit }, payload) {
      Vue.http
        .patch(`http://localhost:3000/poems/${payload.id}`, payload.body, {
          'Content-Type': 'application/json'
        })
        .then(response => {
          console.log(response);
        })
        .then(response => {
          commit('updatePoemInfo');
          setTimeout(() => {
            commit('clearMessage', 'isUpdated');
          }, 3000);
        });
    },

    deletePoem({ commit }, id) {
      Vue.http
        .delete(`http://localhost:3000/poems/${id}`)
        .then(response => response.json())
        .then(response => {
          commit('deletePoem');
          setTimeout(() => {
            commit('clearMessage', 'isDeleted');
          }, 3000);
        });
    }
  }
};

export default poems;
