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

// router.beforeEach( (to) => {
//   const { name } = to
//   console.log(name)
//   const store = users()
//   store.fetchUser().then (() => {
//     const { user } = store
//     console.log("I'm the user fetch in the router = ", user)

//     if (!user && name !== 'sign-in' && name !== 'sign-up') {
//       return { name: 'sign-in' }
//     }

//     if (user && name === 'sign-in' && name === 'sign-up') {
//       return { name: 'home' }
//     }

//     return { name }
//   })
// })

router.beforeEach((to) => {
  const store = users()
  const isAuth = store.user !== null;
  if (!isAuth && to.name !== 'sign-in' && to.name!=='sign-up') {
    return { name:'sign-in' }
  } 
  if (isAuth && to.name ==='sign-in' && to.name ==='sign-up') {
    return { name: 'home' }
  }

  console.log('I am in the router', store)

})
export default router
