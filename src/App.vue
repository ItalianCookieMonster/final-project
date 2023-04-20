
<template>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';
import { mapActions,} from 'pinia';
import tasks from './stores/tasks';


export default {
  name: 'App',

  components: {
    RouterView,
  },

  methods: {
    ...mapActions(tasks, ['_fetchAllTasks'])
  },

  created(){
    console.log('Created Hello World')
    this._fetchAllTasks()
  }
}
</script>

<style scoped>



</style>
