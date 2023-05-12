<template>
    <div class="wrapper container">
        <h2 class="title">Update your password</h2>
        <form>
            <div class="form-group">
                <label for="password" class="text">New Password</label>
                <input type="password" name="password" placeholder="Password" v-model="newPassword" class="form-control" />
            </div>
            <div class="form-group">
                <label for="confirmPassword" class="text">Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Password" v-model="confirmPassword"
                    class="form-control" />
            </div>
            <div v-if="error" class="error alert-danger">
                Password does not match
                <i class="bi bi-exclamation-triangle-fill"></i>
            </div>
            <button @click.prevent="handleUpdatePasword" class="btn">Submit</button>
        </form>
        <PasswordAlertComp v-if="showAlert" :message="alertMessage" />
    </div>
</template>

<script>
import users from '../../stores/users';
import { mapActions } from 'pinia';
import PasswordAlertComp from '../../components/popups-alerts/PasswordAlertComp.vue';

export default {
    name: 'ResetPassword',

    components: {
        PasswordAlertComp
    },

    data() {
        return {
            newPassword: '',
            confirmPassword: '',
            showAlert: false,
            error: false,
            alertMessage: ''
        }
    },

    methods: {
        ...mapActions(users, ['updatePassword']),

        async handleUpdatePasword() {
            await this._checkConfirmPassword()
            try {
                await this.updatePassword(this.newPassword);
                this.showAlert = true;
                this.alertMessage = 'Success! You have a brand new password';
            } catch (error) {
                console.error(error);
                this.showAlert = true;
                if (error.message === ('Password should be at least 6 characters')) {
                    console.log("I am inside the if")
                    this.alertMessage = 'Password should be at least 6 characters';
                } else {
                    this.alertMessage = 'Something went wrong please try again';
                }

            }

        },

        async _checkConfirmPassword() {
            if (this.newPassword !== this.confirmPassword) {
                this.error = true;
                throw new Error('Passwords do not match');
            } else {
                return true;
            }
        }
    }


}




</script>

<style scoped>
.form-control {
    margin-top: 5px;
    margin-bottom: 5px;
}

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


@media (min-width: 768px) {
    .error {
        margin-top: -5px;
    }
}
</style>