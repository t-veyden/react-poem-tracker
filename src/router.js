import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
   return {
     x: 0,
     y: 0
   };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/purgatory',
      name: 'purgatory',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Purgatory.vue')
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('./views/Completed.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./views/AddPoem.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('./views/EditPoem.vue')
    },
    {
      path: '/poem/:id',
      name: 'poem',
      component: () => import('./views/Poem.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/SignIn.vue')
    }
  ]
})
