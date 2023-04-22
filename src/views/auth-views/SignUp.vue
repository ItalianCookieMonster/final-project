<template>
    <p>Sign up view</p>

    <AlertComp v-if="showEmailVerification"/> 
    
    <form>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="userData.name">
        <label for="surname">Surname</label>
        <input type="text" id="surname" v-model="userData.surname">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="userData.email">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="userData.password">
        <!-- <button @click="_handleSignUp">Sign up</button> -->
    </form>
    <button @click.prevent="_handleSignUp">Sign up</button>
    <p>Already registred?</p>
    <router-link :to="{name: 'sign-in'}">Sign in</router-link>


</template>

<script>
import { mapState, mapActions } from 'pinia';
import users from '../../stores/users';
import AlertComp from '../../components/AlertComp.vue';

export default {
    name: 'SignUp',
    components: {
        AlertComp
    },

    data() {
        return {
            userData: {
            email: 'user@example.com',
            password: 'password',
            name: 'Your Name',
            surname: 'Your Surname'
            },

            showEmailVerification: false

        }
    },
    computed: {
        ...mapState(users, ['user'])
    },

    methods: {
        ...mapActions(users, ['signUp']),

        // _handleSignUp(){
        //     this.signUp(this.userData)
        // }

        async _handleSignUp(){
            try {
                await this.signUp(this.userData)
                this.showEmailVerification = true
                // Dovresti pensare a cosa fa l'usuario quando chiude l'alert
                // this.$router.push({name: 'home'})
                
            } catch (err) {
                console.log(err)
            }
        }
    }
}

</script>