<template>
    <div class="overlay" v-if="showRelax">
        <div class="container rounded">
            <h3>Well done!</h3>
            <p class="relax-text">You've completed all your tasks. Now it's time for some rest</p>
            <img class="relax-image rounded" src="../assets/images/relax3.jpg" alt="relax image">
            <router-link :to="{ name: 'add-task' }" class="btn">Start over </router-link>
        </div>
    </div>
</template>

<script>
import tasks from '../stores/tasks';
import { mapState } from 'pinia';
export default {
    name: 'AllDone',

    props: {
        showRelax: {
            type: Boolean,
            default: false
        }
    },

    computed: {

        ...mapState(tasks, ['tasks', 'completedTasks']),
    }

    
}


</script>

<style scoped>
.relax-image {
    width: 80%;
}

.container {
    position: relative;
    top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    background-color: #eff7f6;
    width: 90%;
    margin-bottom: 20px;
}

@media (min-width: 768px) {
    .container {
        width: 70%;
        top: 5%;

    }
}

@media (min-width: 992px) {
    .container {
        width: 50%;

    }
}
</style>