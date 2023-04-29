
<template>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';
// import { mapActions, mapState } from 'pinia';
// import users from './stores/users';
// import { mapActions } from 'pinia';



export default {
  name: 'App',

  components: {
    RouterView,
  },

  // computed: {
  //   ...mapState(users, ['user'])
  // },

  // methods: {
  //   ...mapActions(users, ['fetchUser'])
  // },

  // async created() {
  //   try {
  //     await this.fetchUser()
  //   } catch (e) {
  //     console.error(e)
  //   }
  // },

  // async created(){
  //   await this.fetchUser()
  // },

  // watch: {
    // user: {
    //   handler() {
    //     console.log("I'm this.user in watch " , this.user)
    //     if (this.user) {
    //       // ("I'm in if")
    //       this.$router.push({ path: '/' })
    //     } else {
    //       // console.log("I'm in else")
    //       this.$router.push({ path: '/auth/sign-in' })
    //     }
    //   }, 
    //   immediate: true,

    // },
  

    // user() {
    //   console.log("I'm this.user in watch ", this.user)
    //   if (this.user) {
    //     ("I'm in if")
    //     this.$router.push({ path: '/' })
    //   } else {
    //     console.log("I'm in else")
    //     this.$router.push({ path: '/auth/sign-in' })
    //   }
    // }
  // }
}

</script>

<style scoped></style>
