<template>
<div class="container main">
    <AlertComp v-if="showEmailVerification" :message="alertMessage" />

    <div class="row">
        <div class="col-md-6 side-image">
            <img src="../../assets/images/white.png" alt="white png" class="imageSignIn" />
            <!-- <div class="text">
                <p>Join the community of chill almost organised people
                    <i>logo</i>
                </p>
            </div> -->
        </div>
        <div class="col-md-6 right">
            <div class="input-box">
                <header>Welcome to the chill task manager</header>
                    <div class="input-field">
                        <input type="text" id="name" v-model="userData.name" class="input" required>
                        <label for="name">Name</label>
                    </div>
                    <div class="input-field">
                        <input type="text" id="surname" v-model="userData.surname" class="input" required>
                        <label for="surname">Surname</label>
                    </div>
                    <div class="input-field">
                        <input type="email" id="email" v-model="userData.email" class="input" required>
                        <label for="email">Email</label>
                    </div>
                    <div class="input-field">
                        <input type="password" id="password" v-model="userData.password" class="input" required>
                        <label for="password">Password</label>
                    </div>

                    <div class="input-field">
                        <button @click.prevent="_handleSignUp">Sign up</button>
                    </div>
                <div class="signin">
                    <span>Already registred?
                        <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
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
                email: '',
                password: '',
                name: '',
                surname: ''
            },

            showEmailVerification: false,
            alertMessage: ''

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

        async _handleSignUp() {
            try {
                await this.signUp(this.userData)
                this.showEmailVerification = true
                this.alertMessage = 'Success. Please check your email for verification'
                // Dovresti pensare a cosa fa l'usuario quando chiude l'alert
                // this.$router.push({name: 'home'})

            } catch (err) {
                console.log(err)
                this.showEmailVerification = true
                this.alertMessage = 'Something went wrong, please try again later'
            }
        }
    }
}

</script>

<style>

</style>