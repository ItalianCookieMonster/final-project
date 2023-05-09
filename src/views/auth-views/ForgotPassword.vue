<template>
    <div class="wrapper container">
        <h2 class="title">Oh dear! Have you forgotten your password?</h2>
        <p class="text"> Don't worry, insert you're email and we'll send you a link to recover it.</p>
        <div class="form-group">
            <label class="label-email text" for="email">Email</label>
            <input type="email" name="email" id="email" v-model="email" class="form-control">
        </div>
        <button @click="_handleForgotPassword" class="btn">Recover</button>
        <PasswordAlertComp v-if="showAlert" :message="alertMessage" />
    </div>
</template>

<script>
import PasswordAlertComp from '../../components/popups-alerts/PasswordAlertComp.vue';
import users from '../../stores/users';
import { mapActions } from 'pinia';
export default {
    name: 'RecoverPassword',

    components: {
        PasswordAlertComp,
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

        async _handleForgotPassword() {
            try {
                await this.recoverPassword(this.email);
                this.showAlert = true;
                this.alertMessage = "We've sent you an email with a link to reset your password.";
            } catch (error) {
                this.showAlert = true;
                if (error.message.includes("invalid format")) {
                    this.alertMessage = 'Make sure you enter a valid email address.';
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