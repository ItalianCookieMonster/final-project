import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('profiles', {
    state() {
        return {
            profile: {}
        }
    },

    actions: {
        async _getProfile() {
            const { data } = await supabase.from('profiles').select()

            console.log('1', data)
            this.profile = { ...data[0] }
            console.log('2', this.profile)
        },

        async _setProfile(first_name, last_name, email, id) {
            const { data, error } = await supabase
                .from('profiles')
                .update({ first_name, last_name, email })
                .eq('id', id)
                .select()

            if (error) {
                throw error
            }
            this.profile = data
        },

        async _deleteProfile(user_id) {
            const { data, error } = await supabase.from('profiles').delete().eq('id', user_id ).select()

            if (error) {
                throw error
            }

            console.log("Inside delete profile", data)
        }
    }
})
