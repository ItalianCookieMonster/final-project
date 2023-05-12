<template>
    <div class="container auth-container">
        <div class="row auth-row">
            <!--This div contains a background image-->
            <div class="col-md-6 side-image"></div>
            <div class="col-md-6 right">
                <div class="input-box">
                    <header>Welcome to the chilled task manager</header>
                    <form class="needs-validation">
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
                    </form>
                    <div class="signin">
                        <span>Not registered yet?
                            <router-link :to="{ name: 'sign-up' }">Sign-up</router-link>
                        </span>
                        <button @click.prevent="_handelGoogleSignIn">Register with
                            <img src="../../assets/images/Google-logo.png" alt="google" class="google" />
                        </button>
                        <router-link :to="{ name: 'forgot-password' }">Reset password</router-link>
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
import AuthAlertComp from '../../components/popups-alerts/AuthAlertComp.vue';
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
        ...mapActions(users, ['signIn', 'signInWithGoogle', 'signInWithGitHub']),

        async _handelSignIn() {
            try {
                await this.signIn(this.userData)
                this.$router.push({ name: 'home' })
            } catch (err) {
                console.log(err)
                this.showAlert = true

                if (err.message.includes('Invalid')) {
                    this.alertMessage = 'Your credentials are incorrect'
                } else if (err.message.includes('Email not confirmed')) {
                    this.alertMessage = 'You should check your email'
                }
                else {
                    this.alertMessage = 'Something went wrong, please try again'
                }
            }
        },

        async _handelGoogleSignIn() {
            try {
                await this.signInWithGoogle()
                this.$router.push({ name: 'home' })
            } catch (err) {
                console.log(err)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }
        },

    }
}

</script>

<style scoped>
.google {
    width: 20%;
    filter: grayscale(1)
}

.google:hover,
.google:focus {
    filter: grayscale(0)
}

.signin {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px
}
</style>