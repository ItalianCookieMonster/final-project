import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('users', {
  state: () => ({
    // user: undefined,
    user: null
  }),

  actions: {
    async fetchUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      // console.log("I'm user in fetchUser =", user)
      this.user = user
      // console.log("I'm this.user in fetchUser", this.user)
    //   if (!user) throw new Error('User not exists')
    },

    async signIn({ email, password }) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      if (data) this.user = data
    },

    async signUp({ email, password }) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error
      if (data) this.user = data
    },

    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.user = null
    }
  }
})
