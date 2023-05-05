<template>
    <div class="wrapper container">
        <h2>Oh dear! Have you forgotten your password?</h2>
        <p> Don't worry, insert you're email and we'll send you a link to recover it.</p>
        <label class="label-email" for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email" class="input-email">
        <button @click="_handleForgotPassword" class="btn">Recover</button>
        <AlertComp v-if="showAlert" :message="alertMessage" />
    </div>
</template>

<script>
import AlertComp from '../../components/AlertComp.vue';
import users from '../../stores/users';
import { mapActions } from 'pinia';
export default {
    name: 'RecoverPassword',

    components: {
        AlertComp,
    },

    data() {
        return {
            email: '',
            showAlert: false,
            alertMessage: '',
        }
    },

    methods: {

        ...mapActions(users, ['recoverPassword']),

        async validateEmail() {
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (this.email.match(regex)) {
                console.log("Valid email")
                return true;
            } else {
                throw new Error("Invalid email");
            }
        },

        async _handleForgotPassword() {
            await this.validateEmail();
            try {
                await this.recoverPassword(this.email);
                this.showAlert = true;
                this.alertMessage = "We've sent you an email with a link to reset your password.";
            } catch (error) {
                this.showAlert = true;
                if (error.message === 'Invalid email') {
                this.alertMessage = 'Invalid email'
                } else {
                this.alertMessage = 'Something went wrong. Please try again'
                }
                console.error(error);
            }
        },



    }
}






</script>

<style scoped>
.label-email {
    font-size: 20px;
    margin: 10px;
}

.input-email {
   width: 50%;
}

</style>