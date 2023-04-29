import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('users', {
  state: () => ({
    user: undefined,
  }),

  actions: {
    async fetchUser() {
      const {data: { user }} = await supabase.auth.getUser()
      this.user = user
      console.log("I'm this.user in fetchUser", this.user)
      // if (!user) throw new Error('User not exists')
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
  
      
    },

    async recoverPassword(email) {
      console.log("I am inside of resetPassword in store")
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) throw error
      
    },

    async updatePassword(newPassword) {
      console.log("I am inside of updatePassword in store")
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error
      console.log(data)
    }
  }
})
