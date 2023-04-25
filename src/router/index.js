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
      component: HomeView
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

  if (!user && to.name !== 'sign-up' && to.name !== 'sign-in') {
    return { name: 'sign-in' }
  }
})


export default router
