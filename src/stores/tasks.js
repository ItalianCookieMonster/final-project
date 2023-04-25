import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('tasks', {
  state() {
    return {
      tasks: []
    }
  },

  actions: {
    async _fetchAllTasks() {
      const { data, error } = await supabase
        .from('tasks') // Da dove prendo il mio progetto supabase
        .select()

      if (error) {
        console.error(error)
        return
      }

      // console.log("I'm the data fetched on supabase ", data)
      this.tasks = data
    },

    async _addNewTask({ title, user_id }) {
      console.log('Trying to add new task')
      const { data, error } = await supabase.from('tasks').insert({ title, user_id }).select()

      if (error) {
        throw new Error(error)
      }
      console.log(data)
      this.tasks.push(...data)
    },

    async _deleteTask(taskId) {
      const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .select()

      if (error) {
        throw error
      }
      console.log(data)
      const taskToRemove = {...data[0]}
      console.log(taskToRemove)
      this.tasks = this.tasks.filter(task => task.id !== taskToRemove.id)

    },

    async _editTask({title, id}) {
      const { data, error } = await supabase
      .from('tasks')
      .update({ title })
      .eq('id', id)
      .select()

      if (error) {
        throw error
      }

      console.log(data)
  }

}
})
