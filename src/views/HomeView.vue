
<template>
  <h1>
    Home View
  </h1>
  <div>
    <p v-for="task in tasks" :key="task.id">{{ task.title }}</p>
    <label for="newTask">New Task</label> 
    <input type="text" name="newTask" v-model="newTask">
    <!-- <button @click="_addNewTask({ title: this.newTask, user_id: this.user.user.id })">Add Task</button> --> -->
    <!-- <button @click="signOut">Sign Out </button> -->
    <button @click="_addNewTask(newTask)">Add new task</button>
    <button @click="_handleSignOut">Sign Out </button>
  </div>
</template>

<script>
import tasks from '../stores/tasks';
import users from '../stores/users';
import { mapActions, mapState } from 'pinia';
export default {
  name: 'HomeView',
  data() {
    return {
      newTask: ''
    }
  },

  computed: {
    ...mapState(tasks, ['tasks']),
    ...mapState(users, ['user'])
  },

  methods: {
    ...mapActions(tasks, ['_fetchAllTasks', '_addNewTask']),
    ...mapActions(users, ['signOut']),

    _handleSignOut() {
      try {
        this.signOut()
        this.$router.push({ name: 'sign-in' })
      } catch (err) {
        console.error(err)
      }
    },

    created() {
      // console.log('Created Hello World')
      this._fetchAllTasks()
    },
  }
}
</script>
