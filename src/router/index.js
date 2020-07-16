import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import appLogin from '../views/app-login.vue'
import userDetails from '../views/user-details.vue'
import tripTypes from '../views/trip-types.vue'
import tripDestinations from '../views/trip-destinations.vue'
import tripEdit from '../views/trip-edit.vue'
import tripDetails from '../views/trip-details.vue'

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
    path: '/trip',
    name: 'trip-app',
    component: tripApp
  },
  {
    path: '/trip/type',
    name: 'trip-types',
    component: tripTypes
  },
  {
    path: '/trip/destination',
    name: 'trip-destinations',
    component: tripDestinations
  },
  {
    path: '/trip/:id',
    name: 'trip-details',
    component: tripDetails
  },
  {
    path: '/trip/edit/:id?',
    name: 'trip-edit',
    component: tripEdit
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
