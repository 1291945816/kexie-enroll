import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/sign-up',
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/SignUp.vue')
  },
  {
    path: '/check',
    component: () => import(/* webpackChunkName: "CheckSignUp" */ '../views/CheckSignUp.vue')
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
