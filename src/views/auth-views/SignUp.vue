<template>
    <div class="container auth-container main">
        <AuthAlertComp v-if="showEmailVerification" :message="alertMessage" />

        <div class="row auth-row">
            <!-- This div contains a background image -->
            <div class="col-md-6 side-image">
            </div>
            <div class="col-md-6 right">
                <div class="input-box">
                    <header>Welcome to the chilled task manager</header>
                    <form>
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
                            <input type="password" id="confirmPassword" v-model="userData.confirmPassword" class="input"
                                required>
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
</template>

<script>
// eslint-disable-next-line
import authStyle from '../../assets/auth.css';
import { mapState, mapActions } from 'pinia';
import users from '../../stores/users';
import AuthAlertComp from '../../components/popups-alerts/AuthAlertComp.vue';

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

            } catch (err) {
                console.log(err)
                if (err.message.includes('Password' || 'password')) {
                    this.error.password = true;
                    this.invalidInput.password = 'invalid-input';
                    setTimeout(() => this.error.password = false, 3000)
                }
                else if (err.message.includes('To signup, please provide your email') || err.message.includes('invalid format')) {
                    this.error.email = true;
                    this.invalidInput.email = 'invalid-input';
                    setTimeout(() => this.error.email = false, 3000)
                }
                else {
                    this.showEmailVerification = true
                    this.alertMessage = 'Something went wrong, please try again later'
                    setTimeout(() => this.error.email = false, 3000)
                }
            }
        },

        async _checkConfirmPassword() {
            if (this.userData.confirmPassword !== this.userData.password) {
                this.error.confirmPassword = true;
                this.invalidInput.confirmPassword = 'invalid-input';
                throw new Error('Password does not match');
            }
            return
        }


    }
}

</script>

<style scoped>
.signin {
    margin-top: 50px;
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