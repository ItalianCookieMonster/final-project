<template>
    <nav class="navbar navbar-expand-md navbar-dark dark-background">
        <div class="container-xxl">
            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <span class="fw-bold">Chilled task manager</span>
            </router-link>

            <!--Toggle button for mobile etc... -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
                aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--Nav bar links -->
            <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'profile' }" class="nav-link">Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <button @click="_handleSignOut" class="nav-link">Sign Out </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import users from '../stores/users';
import { mapActions } from 'pinia';

export default {
    name: 'NavBar',

    methods: {
        ...mapActions(users, ['signOut']),
        _handleSignOut() {
            try {
                this.signOut()
                this.$router.push({ name: 'sign-in' })
            } catch (err) {
                console.error(err)
            }

        }}


    }


</script>

<style>

button {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.dark-background {
    border-radius: 10px;
    background-color: rgba(9, 44, 78, 0.327)
}



</style>