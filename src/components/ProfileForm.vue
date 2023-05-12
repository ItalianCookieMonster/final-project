<template>
    <div class="overlay">
        <div class="container rounded">
            <AuthAlertComp v-if="showAlert" :message="alertMessage" />
            <img class="img-fluid rounded" src="../assets/images/Welcome.jpg" alt="alien and astronaut meeting" />
            <div class="form-container">
                <h2 class="title">Tell us a bit more about you</h2>
                <form>
                    <div class="input-field">
                        <label for="name">Name:</label>
                        <input type="text" id="name" v-model="userData.first_name" class="input" required>
                        <div v-if="errors.name" class="error alert-danger">
                            Name must be filled
                            <i class="bi bi-exclamation-triangle-fill"></i>
                        </div>
                    </div>
                    <div class="input-field">
                        <label for="surname" class="form-lable">Surname:</label>
                        <input type="text" id="surname" v-model="userData.last_name" class="input" required>
                        <div v-if="errors.surname" class="error alert-danger">
                            Surname is required
                            <i class="bi bi-exclamation-triangle-fill"></i>
                        </div>
                    </div>
                    <div class="input-field">
                        <label for="age" class="form-lable">Age:</label>
                        <input type="number" id="age" v-model="userData.age" class="input" required>
                    </div>
                    <button type="submit" class="btn" @click.prevent="_handleSetProfile">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import AuthAlertComp from '../components/popups-alerts/AuthAlertComp.vue';
import profiles from '../stores/profiles';
import users from '../stores/users';
import { mapActions, mapState } from 'pinia';


export default {
    name: 'ProfileForm',

    components: {
        AuthAlertComp
    },

    data() {
        return {
            userData: {
                first_name: '',
                last_name: '',
                age: 0,
            },

            errors: {
                name: false,
                surname: false,
            },

            alertMessage: '',
            showAlert: false
        }
    },

    computed: {
        ...mapState(users, ['user'])
    },

    methods: {
        ...mapActions(profiles, ['_setProfile']),

        async _handleSetProfile() {
            console.log("I am here")
            await this._checkIfName()
            await this._checkIfSurname()
            try {
                await this._setProfile(this.userData.first_name, this.userData.last_name, this.user.email, this.userData.age, this.user.id);
                this.dismiss()
            } catch (error) {
                console.log(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'

            }
        },

        async _checkIfName() {
            if (this.userData.first_name === '') {
                this.errors.name = true;
                setTimeout(() => this.errors.name = false, 3000)
                throw new Error('Missing first name');
            }

        },

        async _checkIfSurname() {
            if (this.userData.surname === '') {
                this.errors.name = true
                setTimeout(() => this.errors.name = false, 3000)
                throw new Error('Missing last name')
            }

        },

        dismiss() {
            this.$emit('dismiss')
        }

    },

}



</script>


<style scoped>
.title {
    text-align: center;
    color: #212529;
    margin: 20px;
    font-size: 1.3rem;
}

.container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #eff7f6;
    width: 90%;
    margin-bottom: 20px;
}

.form-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.img-fluid {
    max-width: 50%;
}

.btn {
    width: 100%;
}

.bi {
    float: right;
}



@media (min-width: 768px) {

    .container {
        top: 5%;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 20px
    }

    .title {
        margin-bottom: 40px
    }

}


@media (min-width: 992px) {
    .container {
        width: 70%;
        top: 10%;
        justify-content: space-between;

    }

    .form-container {
        width: 50%;
    }
}
</style>