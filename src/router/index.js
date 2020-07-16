import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import appLogin from '../views/app-login.vue'
import userDetails from '../views/user-details.vue'
import expEdit from '../views/exp-edit.vue'
import expDetails from '../views/exp-details.vue'
import expApp from '../views/exp-app.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/exp',
    name: 'exp-app',
    component: expApp
  },
  {
    path: '/exp/:id',
    name: 'exp-details',
    component: expDetails
  },
  {
    path: '/exp/edit/:id?',
    name: 'exp-edit',
    component: expEdit
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  },
  {
    path: '/login',
    name: 'app-login',
    component: appLogin
  },

]

const router = new VueRouter({
  routes
})

export default router
