import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
import wysiwyg from 'vue-wysiwyg';
import Snackbar from './components/Snackbar.vue';

Vue.config.productionTip = false;

// global components
Vue.component('t-snackbar', Snackbar);

Vue.use(VueResource);

Vue.use(wysiwyg, {
  hideModules: {
    code: true,
    table: true,
    headings: true,
    link: true,
    orderedList: true,
    unorderedList: true,
    image: true,
    separator: true,
    underline: true
  },
  forcePlainTextOnPaste: true
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
