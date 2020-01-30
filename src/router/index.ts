import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
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
    component: () => import(/* webpackChunkName: "about" */ '../views/Purgatory.vue')
  },
  {
    path: '/completed',
    name: 'completed',
    component: () => import('../views/Completed.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddPoem.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditPoem.vue')
  },
  {
    path: '/poem/:id',
    name: 'poem',
    component: () => import('../views/Poem.vue')
  },
  {
    path: '/authors-list',
    name: 'authors-list',
    component: () => import('../views/AuthorsList.vue')
  },
  {
    path: '/authors/:id',
    name: 'author',
    component: () => import('../views/Author.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
