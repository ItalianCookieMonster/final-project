<template>
    <h2>Oh dear! Have you forgotten your password?</h2>
    <p> Don't worry, insert you're email and we'll send you a link to recover it.</p>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="email">
    <button @click="_handleForgotPassword">Recover</button>
</template>

<script>
import users from '../../stores/users';
import { mapActions } from 'pinia';
export default {
    name: 'RecoverPassword',

    data() {
        return {
            email: ''
        }
    },

    methods: {

        ...mapActions(users, ['recoverPassword']),

        validateEmail() {
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (this.email.match(regex)) {
                console.log("Valid email")
                return true;
            } else {
                console.log('Email not valid')
                return false;
            }
        },

        async _handleForgotPassword() {
            this.validateEmail();
            try {
                await this.recoverPassword(this.email);
            } catch (error) {
                console.error(error);
            }
        },



    }
}






</script>