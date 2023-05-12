<template>
  <NavBar />
  <div class="wrapper rounded main">
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
  <ProfileForm v-if="showProfileform" @dismiss="dismissForm" />

  <router-view></router-view>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import ProfileForm from '../components/ProfileForm.vue';
import tasks from '../stores/tasks';
import users from '../stores/users';
import profiles from '../stores/profiles';
import { mapActions, mapState } from 'pinia';
import TaskComp from '../components/TaskComp.vue';

export default {
  name: 'HomeView',

  components: {
    TaskComp,
    ProfileForm,
    NavBar
  },

  data() {
    return {
      name: '',
      showProfileform: false
    }
  },

  computed: {
    ...mapState(users, ['user']),
    ...mapState(profiles, ['profile'])
  },

  methods: {
    ...mapActions(tasks, ['_fetchAllTasks']),
    ...mapActions(profiles, ['_getProfile']),

    _setName() {
      if (this.profile.first_name === null) {
        this.showProfileform = true;
      }
    },

    dismissForm() {
      this.showProfileform = false;
    }

  },

  mounted() {
    this._setName()
  },

  created() {
    this._fetchAllTasks()
    this._getProfile()
  },

}
</script>

<style scoper>
.transition-container {
  transition: 0.5s
}

.main {
  transition: margin-left .5s;
  padding: 16px;
}
</style>


