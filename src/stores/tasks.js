import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('tasks', {
  state() {
    return {
      tasks: [],
      singleTask: [],
      completedTaskList: []
    }
  },

  actions: {
    async _fetchAllTasks() {
      const { data, error } = await supabase.from('tasks').select()

      if (error) {
        console.error(error)
        return
      }
      const allTasks = data
      this.tasks = allTasks.filter((task) => !task.is_complete)
      this.completedTaskList = allTasks.filter((task) => task.is_complete)
    },

    async _addNewTask({ title, description, priority, user_id }) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title, description, priority, user_id })
        .select()

      if (error) {
        throw new Error(error)
      }
      this.tasks.push(...data)
    },

    async _deleteTask(taskId) {
      const { data, error } = await supabase.from('tasks').delete().eq('id', taskId).select()

      if (error) {
        throw error
      }
      const taskToRemove = { ...data[0] }
      this.tasks = this.tasks.filter((task) => task.id !== taskToRemove.id)
      this.completedTaskList = this.completedTaskList.filter((task) => task.id !== taskToRemove.id)
    },

    async _editTask({ title, description, priority, id }) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title, description, priority })
        .eq('id', id)
        .select()

      if (error) {
        throw error
      }
      const taskToEdit = { ...data[0] }

      this.tasks.forEach((task) => {
        if (task.id === taskToEdit.id) {
          task.title = title
          task.description = description
          task.priority = priority
        }
      })
    },

    async _fetchSingleTask(id) {
      const { data, error } = await supabase.from('tasks').select().eq('id', id)

      if (error) {
        throw error
      }
      console.log(...data)
      if (data.length === 0) {
        throw error
      } else {
        this.singleTask = data[0]
      }
    },

    async _taskCompleted(id) {
      let { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: true })
        .eq('id', id)
        .select()

      if (error) throw error

      const completedTask = { ...data[0] }
      this.tasks = this.tasks.filter((task) => task.id !== completedTask.id)
      this.completedTaskList.push(completedTask)
    },

    async _taskUndone(id) {
      let { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: false })
        .eq('id', id)
        .select()

      if (error) throw error

      const undoneTask = { ...data[0] }
      this.completedTaskList = this.completedTaskList.filter((task) => task.id !== undoneTask.id)
      this.tasks.push(undoneTask)
    }
  }
})
