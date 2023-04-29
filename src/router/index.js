import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/auth-views/AuthView.vue'
import SignIn from '../views/auth-views/SignIn.vue'
import SignUp from '../views/auth-views/SignUp.vue'
import users from '../stores/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'edit-task/:id',
          name: 'edit-task',
          component: () => import('../views/tasks-views/EditTask.vue'),
          props: true
        },
        {
          path: 'add-task',
          name: 'add-task',
          component: () => import('../views/tasks-views/AddTask.vue')
        }
      ]
    },

    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: SignIn
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUp
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../../src/views/auth-views/ForgotPassword.vue')
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('../../src/views/auth-views/ResetPassword.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const { name } = to
  console.log(name)
  const store = users()
  await store.fetchUser()

  const { user } = store
  console.log("I'm the user fetch in the router = ", user)

  if (
    !user &&
    to.name !== 'sign-up' &&
    to.name !== 'sign-in' &&
    to.name !== 'reset-password' &&
    to.name !== 'forgot-password'
  ) {
    return { name: 'sign-in' }
  }
})

export default router
