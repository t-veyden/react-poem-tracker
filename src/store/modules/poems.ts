import Vue from 'vue';

interface SingleAuthor {
  id: string;
  name: string;
}

interface SinglePoem {
  completed?: boolean;
  in_progress?: boolean;
  author?: SingleAuthor;
}

interface Poems {
  poems: object[];
  poem: SinglePoem;
  isAdded: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
}

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
    newPoemStatus(state: Poems) {
      return state.isAdded;
    },

    completedPoems(state: Poems) {
      return state.poems.filter((poem: SinglePoem) => poem.completed);
    },

    pendingPoems(state: Poems) {
      return state.poems.filter((poem: SinglePoem) => !poem.completed);
    },

    currentPoems(state: Poems) {
      return state.poems.filter((poem: SinglePoem) => poem.in_progress);
    },

    authorsList(state: Poems) {
      const ids = new Set(
        state.poems.map((poem: SinglePoem) => poem.author!.id)
      );
      const authors = state.poems.map((poem: SinglePoem) => poem.author);

      const authorsList: object[] = [];
      ids.forEach(id => {
        authorsList.push(authors.find(author => author.id === id));
      });
      return authorsList;
    },

    authorID(state: Poems) {
      return (name: string) =>
        state.poems.reduce((acc: string | null, poem: SinglePoem) => {
          if (poem.author!.name === name) {
            acc = poem.author!.id;
          }
          return acc;
        }, null);
    }
  },

  mutations: {
    getPoemsData(state: Poems, poems: object[]) {
      state.poems = poems;
    },

    getOwnPoems(state: Poems, poems: object[]) {
      // why get, if it all looks like set
      state.poems = poems;
    },

    getSinglePoem(state: Poems, poem: object) {
      state.poem = poem;
    },

    addPoem(state: Poems) {
      state.isAdded = true;
    },

    deletePoem(state: Poems) {
      state.isDeleted = true;
    },

    updatePoemInfo(state: Poems) {
      state.isUpdated = true;
    },

    clearMessage(state: Poems, target: string) {
      state[target] = false;
    }
  },

  actions: {
    getPoemsData({ commit }, path: string = 'poems') {
      Vue.http
        .get(`http://localhost:3000/${path}`)
        .then(response => {
          commit('getPoemsData', response.body);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },

    getSinglePoem({ commit }, path: string) {
      Vue.http
        .get(`http://localhost:3000/${path}`)
        .then(response => {
          commit('getSinglePoem', response.body);
        })
        .catch(error => {
          console.log(error.statusText);
        });
    },

    addPoem({ commit }, payload: { path: string; body: object }) {
      Vue.http
        .post(`http://localhost:3000/${payload.path}`, payload.body)
        .then(response => response.json())
        .then(response => {
          // console.log(response)
          commit('addPoem');
          setTimeout(() => {
            commit('clearMessage', 'isAdded');
          }, 3000);
        });
    },

    updatePoemStatus({ commit, dispatch }, payload: { p: object; id: string }) {
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

    updatePoemInfo({ commit }, payload: { body: object; path: string }) {
      Vue.http
        .patch(`http://localhost:3000/${payload.path}`, payload.body, {
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

    deletePoem({ commit }, path: string) {
      Vue.http
        .delete(`http://localhost:3000/${path}`)
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
