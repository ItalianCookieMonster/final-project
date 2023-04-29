<template>
    <h2>Update your password</h2>
    <input type="password" name="password" placeholder="Password" v-model="newPassword" />
    <button @click="handleUpdatePasword">Submit</button>
</template>

<script>
import users from '../../stores/users';
import { mapActions } from 'pinia';

export default {
    name: 'ResetPassword',

    data() {
        return {
            newPassword: ''
        }
    },

    methods: {
        ...mapActions(users, ['updatePassword']),

        async handleUpdatePasword() {
            console.log("I am in handleUpdatePasword")
            try {
                console.log("I am inside the try", this.newPassword)
                await this.updatePassword(this.newPassword);
                this.$router.push({name: 'home'});
            } catch (error) {
                console.log(error);
            }

        }
    }


}




</script>