<template>
    <div class="container main">
        <div class="row">
            <div class="col-md-6 side-image">
                <img src="../../assets/images/white.png" alt="white png" class="imageSignIn" />
                <!-- <div class="text">
                    <p class="text-dark">Join the community of chill almost organised people
                        <i>logo</i>
                    </p>
                </div> -->
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
                            <router-link :to="{ name: 'sign-up' }">Reset password</router-link>
                        </span>
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
                this.alertMessage = 'Your credentials are incorrect, please try again'
            }
        }
    }
}

</script>

<style>
.imageSignIn {
    width: 35px;
    position: absolute;
    top: 30px;
    left: 30px;
}

.side-image {
    background-image: url(../../assets/images/signIn.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 10px 0 0 10px;
}

.row {
    width: 900px;
    height: 550px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.text p {
    font-size: 18px;
}

i {
    font-weight: 400;
    font-size: 15px;
} */

.right {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.input-box {
    width: 330px;
    box-sizing: border-box;
}

.input-box header {
    font-weight: 700;
    text-align: center;
    margin-bottom: 45px;
}

.input-field {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0 10px 0 10px;
}

.input {
    height: 45px;
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    margin-bottom: 20px;
    color: #40414a;
}

.input-box .input-field label {
    position: absolute;
    top: 10px;
    left: 10px;
    pointer-events: none;
    transition: .5s;
}

.input-field .input:focus~label {
    top: -10px;
    font-size: 13px;
}

.input-field .input:valid~label {
    top: -10px;
    font-size: 13px;
    color: #5d5076;
}

.input-field .input:focus,
.input-field .input:valid {
    border-bottom: 1px solid #743ae1;
}

.submit {
    border: none;
    outline: none;
    height: 45px;
    background: #ececec;
    border-radius: 5px;
    transition: .4s;
}

.submit:hover {
    background: rgba(37, 95, 156, 0.9);
    color: #fff;
}

.signin {
    text-align: center;
    font-size: small;
    margin-top: 25px;
}

span a {
    text-decoration: none;
    font-weight: 700;
    color: #000;
    transition: .5s;
}

span a:hover {
    text-decoration: underline;
    color: #000;
}

@media only screen and (max-width: 768px) {
    .side-image {
        border-radius: 10px 10px 0 0;
    }

    img {
        width: 35px;
        position: absolute;
        top: 20px;
        left: 47%;
    }

    .text {
        position: absolute;
        top: 70%;
        text-align: center;
    }

    .text p,
    i {
        font-size: 17px;
    }

    .row {
        max-width: 420px;
        width: 100%;
    }
}
</style>