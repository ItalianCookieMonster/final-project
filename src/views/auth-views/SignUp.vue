<template>
    <div class="wrapper">
        <div class="container auth-container main">
            <AuthAlertComp v-if="showEmailVerification" :message="alertMessage" />

            <div class="row auth-row">
                <div class="col-md-6 side-image">
                    <img src="../../assets/images/white.png" alt="white png" class="imageSignIn" />
                </div>
                <div class="col-md-6 right">
                    <div class="input-box">
                        <header>Welcome to the chilled task manager</header>
                        <form>
                            <div class="input-field">
                                <input type="text" id="name" v-model="userData.name" class="input" required >
                                <label for="name">Name</label>
                            </div>
                            <div class="input-field">
                                <input type="text" id="surname" v-model="userData.surname" class="input" required>
                                <label for="surname" class="form-lable">Surname</label>
                            </div>

                            <div class="input-field" :class="invalidInput.email">
                                <input type="email" id="email" v-model="userData.email" class="input" required>
                                <label for="email" class="form-lable">Email</label>
                                <div v-if="error.email" class="error alert-danger"> 
                                    Invalid Email
                                    <i class="bi bi-exclamation-triangle-fill"></i>
                                </div>
                            </div>
                            <div class="input-field" :class="invalidInput.password">
                                <input type="password" id="password" v-model="userData.password" class="input" required>
                                <label for="password">Password</label>
                                <div v-if="error.password" class="error alert-danger"> 
                                    Invalid password
                                    <i class="bi bi-exclamation-triangle-fill"></i>
                                </div>
                            </div>
                            <div class="input-field" :class="invalidInput.confirmPassword">
                                <input type="password" id="confirmPassword" v-model="userData.confirmPassword" class="input" required>
                                <label for="confirmPassword">Confirm Password</label>
                                <div v-if="error.confirmPassword" class="error alert-danger"> 
                                    Password does not match
                                    <i class="bi bi-exclamation-triangle-fill"></i>
                                </div>
                            </div>

                            <div class="input-field">
                                <button @click.prevent="_handleSignUp" type="submit">Sign up</button>
                            </div>
                        </form>
                        <div class="signin">
                            <span>Already registred?
                                <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line
import authStyle from '../../assets/auth.css';
import { mapState, mapActions } from 'pinia';
import users from '../../stores/users';
import AuthAlertComp from '../../components/AuthAlertComp.vue';

export default {
    name: 'SignUp',
    components: {
        AuthAlertComp
    },

    data() {
        return {
            userData: {
                email: '',
                password: '',
                name: '',
                surname: '',
                confirmPassword: ''
            },

            showEmailVerification: false,
            alertMessage: '',
            error: {
                password: false,
                email: false,
                confirmPassword: false
            },

            invalidInput: {
                email: false,
                password: false,
                confirmPassword: false
            }

        }
    },
    computed: {
        ...mapState(users, ['user'])
    },

    methods: {
        ...mapActions(users, ['signUp']),

        async _handleSignUp() {
            await this._checkConfirmPassword()
            try {
                await this.signUp(this.userData)
                this.showEmailVerification = true
                this.alertMessage = 'Your registration was successful, please check your email'
                // Dovresti pensare a cosa fa l'usuario quando chiude l'alert
                // this.$router.push({name: 'home'})

            } catch (err) {
                console.log(err)
                if (err.message.includes('Signup requires a valid password')) {
                    this.error.password = true;
                    this.invalidInput.password = 'invalid-input';
                }
                else if (err.message.includes('To signup, please provide your email')){
                    this.error.email = true;
                    this.invalidInput.email = 'invalid-input';
                }
                else {
                    this.showEmailVerification = true
                    this.alertMessage = 'Something went wrong, please try again later'
                }
            }
        },

        async _checkConfirmPassword() {
            if (this.userData.confirmPassword !== this.userData.password) {
                this.error.confirmPassword = true;
                this.invalidInput.confirmPassword = 'invalid-input';
                throw new Error('Signup requires a valid password');
            }
            return 
        }

    }
}

</script>

<style scoped>
.error {
    font-size: smaller;
    background-color: white;
    padding: 5px;
    margin-top: 0;
    margin-bottom: 20px;
    border-radius: 5px;
}

.bi {
    float: right;
}

.invalid-input input {
    border-bottom: 1px solid #dc3545
}

@media (min-width: 768px) {
    .error {
        margin-top: -5px;
    }
}
</style>