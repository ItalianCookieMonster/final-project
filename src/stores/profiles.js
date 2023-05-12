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
            this.profile = { ...data[0] }
        },

        async _setProfile(first_name, last_name, email, age, id) {
            const { data, error } = await supabase
                .from('profiles')
                .update({ first_name, last_name, email, age })
                .eq('id', id)
                .select()

            if (error) {
                throw error
            }
            this.profile = {...data[0]}
        },

        async _deleteProfile(user_id) {
            const { error } = await supabase.from('profiles').delete().eq('id', user_id ).select()

            if (error) {
                throw error
            }
        }
    }
})
