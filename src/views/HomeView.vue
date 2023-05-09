<template>
  <div class="wrapper rounded">
    <h1 class="h2 title">
      Hello {{ profile.first_name }}!
    </h1>
    <p class="text-secondary">
      <small class="text">Let's plan what we have to get done!</small>
    </p>
    <div class="container">
      <TaskComp />
      <router-link :to="{ name: 'add-task' }" class="btn">Add Task</router-link>
    </div>
  </div>

  <router-view></router-view>
</template>

<script>
import tasks from '../stores/tasks';
import users from '../stores/users';
import profiles from '../stores/profiles';
import { mapActions, mapState } from 'pinia';
import TaskComp from '../components/TaskComp.vue';

export default {
  name: 'HomeView',

  components: {
    TaskComp
  },

  computed: {
    ...mapState(users, ['user']),
    ...mapState(profiles, ['profile'])
  },

  methods: {
    ...mapActions(tasks, ['_fetchAllTasks']),

  },

  created() {
    this._fetchAllTasks()
  },

}
</script>

<style scoper>




</style>


