import Vue from "vue";
import Vuex from "vuex";
import admin from "./modules/admin";
import ux from "./modules/ux";
import poems from "./modules/poems";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    ux,
    poems
  }
});
