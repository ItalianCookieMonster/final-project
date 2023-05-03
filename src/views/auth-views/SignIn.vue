<template>
    <div class="wrapper">
        <div class="container">
            <div class="row auth-row">
                <div class="col-md-6 side-image">
                    <img src="../../assets/images/white.png" alt="white png" class="imageSignIn" />
                </div>
                <div class="col-md-6 right">
                    <div class="input-box">
                        <header>Welcome to the chill task manager</header>
                        <div class="input-field">
                            <input type="email" id="email" v-model="userData.email" class="input" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <input type="password" id="password" v-model="userData.password" class="input" required>
                            <label for="password">Password</label>
                        </div>
                        <div class="input-field">
                            <button @click.prevent="_handelSignIn">Sign In</button>
                        </div>
                        <div class="signin">
                            <span>Not register yet?
                                <router-link :to="{ name: 'sign-up' }">Sign-up</router-link>
                            </span>
                        </div>
                        <div class="signin">
                            <span>Forgot password?
                                <router-link :to="{ name: 'forgot-password' }">Reset password</router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AuthAlertComp v-if="showAlert" :message="alertMessage" />
</template>

<script>
import { mapState, mapActions } from 'pinia';
import users from '../../stores/users';
import AuthAlertComp from '../../components/AuthAlertComp.vue';
// eslint-disable-next-line
import authStyle from '../../assets/auth.css';

export default {
    name: 'SignIn',

    components: {
        AuthAlertComp
    },

    data() {
        return {
            userData: {
                email: '',
                password: ''
            },

            showAlert: false,
            alertMessage: '',

        }
    },

    computed: {
        ...mapState(users, ['user'])
    },

    methods: {
        ...mapActions(users, ['signIn']),

        async _handelSignIn() {
            try {
                await this.signIn(this.userData)
                this.$router.push({ name: 'home' })
            } catch (err) {
                console.log(err)
                this.showAlert = true
                if (err.response && err.response.status === 401) {
                this.alertMessage = 'Your credentials are incorrect, please try again'
                } else if (err.response && err.response.status === 500) {
                this.alertMessage = 'The server is down, please try again later'
                } else {
                this.alertMessage = 'Something went wrong, please try again'
                }
            }
        }
    }
}

</script>

<style scoped>


</style>