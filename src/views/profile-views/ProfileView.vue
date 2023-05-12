<template>
    <div class="overlay">
        <div class=" container-profile">
            <AuthAlertComp v-if="showAlert" :message="alertMessage" />
            <div class="container-header">
                <img src="../../assets/images/avatar.jpg" alt="avatar" class="img-fluid" />
                <h2 class="profile-title">{{ profile.first_name }}</h2>
                <router-link :to="{ name: 'home' }" class="close">
                    <i class="bi bi-x"></i>
                </router-link>
            </div>
            <ul>
                <li class="list-item">
                    <router-link :to="{ name: 'edit-profile' }">
                        Edit profile
                    </router-link>
                </li>
                <li class="list-item" @click="_handleDeleteProfile">Delete Account</li>
                <li class="list-item" @click="_handleSignOut">Sign out</li>
            </ul>

            <button>
            </button>
        </div>
    </div>
</template>



<script>
import AuthAlertComp from '../../components/popups-alerts/AuthAlertComp.vue';
import profiles from '../../stores/profiles';
import users from '../../stores/users';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'ProfileView',

    data() {
        return {
            showAlert: false,
            alertMessage: '',
            show: false
        }
    },

    components: {
        AuthAlertComp
    },

    computed: {
        ...mapState(profiles, ['profile'])
    },

    methods: {
        ...mapActions(users, ['signOut']),
        ...mapActions(profiles, ['_deleteProfile']),

        _handleSignOut() {
            try {
                this.signOut()
                this.$router.push({ name: 'sign-in' })
            } catch (err) {
                console.error(err)
                this.showAlert = true;
                this.alertMessage = 'Something went wrong, please try again'
            }

        },

        async _handleDeleteProfile() {
            try {
                console.log('here')
                await this._deleteProfile(this.profile.id)
                this.showAlert = true
                this.alertMessage = "The account was deleted, we're sorry to see you going."
            } catch (error) {
                this.showAlert = true;
                this.alertMessage = 'Something went wrong, please try again'
            }
        },

        showProfile() {
            this.show = true;
        },

        hideProfile() {
            this.show = false;
        },

    },

    mounted() {
        this.showProfile();
    },

    beforeUnmount() {
        this.hideProfile();
    }
}




</script>

<style scoped>
.container-profile {
    color: whitesmoke;
    width: 90%;
    background-image: url(../../assets/images/bgprofile.jpg);
    background-size: cover;
    background-position: center;
    min-height: 90vh;
}



.img-fluid {
    width: 80px;
    border-radius: 50%;
}

.container-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list-item {
    margin: 10px;
    padding: 20px;
    border-bottom: 1px solid whitesmoke;
    transition: background-color 0.3s ease-in-out;
}

.list-item:focus,
.list-item:active,
.list-item:hover {
    background-color: whitesmoke;
    color: rgb(9 44 78);
}

.list-item:focus a,
.list-item:active a,
.list-item:hover a {

    color: rgb(9 44 78);
}

.list-item a {
    text-decoration: none;
    color: whitesmoke;
}

.bi {
    align-self: flex-end;
    font-size: 2rem;
    color: whitesmoke;
}

.close {
    align-self: flex-start;
}

@media (min-width: 768px) {
    .container-profile {
        width: 80%;
    }

    .img-fluid {
        width: 100px;
    }
}

@media (min-width: 992) {
    .container-profile {
        width: 60%;
    }

    .img-fluid {
        width: 150px
    }
}
</style>