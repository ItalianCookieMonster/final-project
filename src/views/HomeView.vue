<template>
  <!-- <button @click="_handleSignOut" class="">Sign Out </button> -->
  <div class="container wrapper rounded">
    <h1 class="h2 title">
      Hello there!
    </h1>
    <p class="text-secondary">
      <small>Let's plan what we have to get done!</small>
    </p>
    <TaskComp />
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
.container {
  padding-top: 15px;
  padding-bottom: 15px;
}

title-text {
  font-size: 16px;
  font-weight: 200;
}
</style>
