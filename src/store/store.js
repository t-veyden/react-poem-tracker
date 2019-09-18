import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'
import poems from './modules/poems'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    poems
  }
})
