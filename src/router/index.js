import { createRouter, createWebHistory } from 'vue-router'
import SignToTextView from '../views/SignToTextView.vue'

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
      component: () => import('../views/LetterIndexView.vue'),
      meta: {
        title: 'Letter Index'
      }
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: () => import('../views/SignInView.vue'),
      meta: {
        title: 'Sign in'
      }
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        title: 'Profile'
      }
    },
    {
      path: '/Calls',
      name: 'Calls',
      component: () => import('../views/CallView.vue'),
      meta: {
        title: 'Calls'
      }
    },
    {
      path: '/Chismisign/',
      name: 'Chismisign',
      component: () => import('../views/SalinMeeting.vue'),
      meta: {
        title: 'Chismisign'
      }
    },
    {
      path: '/Tryy',
      name: 'Try',
      component: () => import('../views/Tryview.vue'),
      meta: {
        title: 'Predict text'
      }
    },
    {
      path: '/Join/:meetingCode',
      name: 'Join',
      component: () => import('../views/JoinView.vue'),
      meta: {
        title: 'Chismisgn'
      }
    },
  ]
})

export default router
