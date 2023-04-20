import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore ('tasks', {
  state() {
    return {
      tasks: []
    }
  },

  actions: {
    async _fetchAllTasks(){
      const {data, error} = await supabase
      .from ('tasks') // Da dove prendo il mio progetto supabase
      .select()

      if (error){
        console.error(error)
        return
      }

      console.log(data)
      this.tasks = data
    }
  },


}
)
