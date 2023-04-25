<template>
  <h1>
    Home View
  </h1>
  <TaskComp/>
  <button @click="_handleSignOut">Sign Out </button>
</template>

<script>
import tasks from '../stores/tasks';
import users from '../stores/users';
import { mapActions, mapState } from 'pinia';
import TaskComp from '../components/TaskComp.vue';
export default {
  name: 'HomeView',

  components: {
    TaskComp
  },
  
  computed: {
    ...mapState(users, ['user'])
  },

  methods: {
    ...mapActions(tasks, ['_fetchAllTasks']),
    ...mapActions(users, ['signOut']),

    _handleSignOut() {
      try {
        this.signOut()
        this.$router.push({ name: 'sign-in' })
      } catch (err) {
        console.error(err)
      }
    },

  },

  created() {
    this._fetchAllTasks()
  },

}
</script>
