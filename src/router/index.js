import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import appLogin from '../views/app-login.vue'
import userDetails from '../views/user-details.vue'
import experienceTypes from '../views/experience-types.vue'
import experienceDestinations from '../views/experience-destinations.vue'
import experienceEdit from '../views/experience-edit.vue'
import experienceDetails from '../views/experience-details.vue'
import experienceApp from '../views/experience-app.vue'

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
    path: '/experience',
    name: 'experience-app',
    component: experienceApp
  },
  {
    path: '/experience/type',
    name: 'experience-types',
    component: experienceTypes
  },
  {
    path: '/experience/destination',
    name: 'experience-destinations',
    component: experienceDestinations
  },
  {
    path: '/experience/:id',
    name: 'experience-details',
    component: experienceDetails
  },
  {
    path: '/experience/edit/:id?',
    name: 'experience-edit',
    component: experienceEdit
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
