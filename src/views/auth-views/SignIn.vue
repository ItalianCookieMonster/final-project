<template>
    <p>Sign In view</p>
    <form>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="userData.email">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="userData.password">
    </form>
    <button @click="_handelSignIn">Sign In</button> <!--Chiedi se prevent o submit-->
    <p>Not register yet?</p>
    <router-link :to="{name: 'sign-up'}">Go to sign-up</router-link>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import users from '../../stores/users';
export default {
    name: 'SignIn',
    data() {
        return {
            userData: {
                email: 'user@example.com',
                password: 'password'
            }
            
        }
    },

    computed: {
        ...mapState(users, ['user'])
    },

    methods: {
        ...mapActions(users, ['signIn']),

        // _handelSignIn(){
        //     this.signIn(this.userData)
        // }

        async _handelSignIn(){
            try {
                await this.signIn(this.userData)
                this.$router.push({name: 'home'})
            } catch(err) {
                console.log(err)
            }
        }
    }
}

</script>

<style>



</style>