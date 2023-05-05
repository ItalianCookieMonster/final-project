<template>
  <div class="wrapper rounded">
    <h1 class="h2 title">
      Hello there!
    </h1>
    <p class="text-secondary">
      <small>Let's plan what we have to get done!</small>
    </p>
    <TaskComp />
    <router-link :to="{ name: 'add-task' }" class="btn">Add Task</router-link>
  </div>

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

  },

  created() {
    this._fetchAllTasks()
  },

}
</script>

<style scoped>

.wrapper {
  min-height: 80vh;
}

title-text {
  font-size: 16px;
  font-weight: 200;
}
</style>
