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

      console.log("I'm the data fetched on supabase ", data) 
      this.tasks = data
    }
  },

  // async _addNewTask(newTask){
  //   console.log('Trying to add new task')
  //   const {data, error} = await supabase
  //   .from ('tasks') 
  //   .insert(newTask)

  //   if (error){
  //     console.error(error)
  //     return
  //   }

  //   console.log("I'm the data returning from supabase", data)
  //   this.tasks.push(data)
  // }


}
)
