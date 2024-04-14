import { createRouter, createWebHistory } from 'vue-router'
import SignToTextView from '../views/SignToTextView.vue'
import letterIndex from '../views/LetterIndexView.vue'
import SignInView from '../views/SignInView.vue'
import ProfileView from '../views/ProfileView.vue'
import CallView from '../views/CallView.vue'
import JoinView from '../views/JoinView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'signToText',
      component: SignToTextView
    },
    {
      path: '/letterIndex',
      name: 'letterIndex',
      component: letterIndex,
      meta: {
        title: 'Letter Index'
      }
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: SignInView,
      meta: {
        title: 'Sign in'
      }
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: ProfileView,
      meta: {
        title: 'Profile'
      }
    },
    {
      path: '/Calls',
      name: 'Calls',
      component: CallView,
      meta: {
        title: 'Calls'
      }
    },
    {
      path: '/Join/:meetingCode',
      name: 'Join',
      component: JoinView,
      meta: {
        title: 'Chismisgn'
      }
    },
  ]
})

export default router
