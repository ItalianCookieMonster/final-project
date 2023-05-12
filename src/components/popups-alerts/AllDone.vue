<template>
    <div class="overlay" v-if="showRelaxCopy">
        <div class="container rounded">
            <h3>Well done!</h3>
            <p class="relax-text">You've completed all your tasks. Now it's time for some rest</p>
            <img class="relax-image rounded" src="../../assets/images/spaceRelax.jpg" alt="relax image">
            <div class="btn-container">
                <router-link :to="{ name: 'add-task' }" class="btn">Start over </router-link>
                <button class="btn" @click="_hideShowRelax">Go back</button>
            </div>

        </div>
    </div>
</template>

<script>
import tasks from '../../stores/tasks';
import { mapState } from 'pinia';
export default {
    name: 'AllDone',

    data() {
        return {
            showRelaxCopy: false,
        }
    },

    props: {
        showRelax: {
            type: Boolean,
            default: false
        }
    },

    computed: {

        ...mapState(tasks, ['tasks', 'completedTasks']),
    },

    watch: {
        showRelax(newValue) {
            this.showRelaxCopy = newValue;
        }
    },

    methods: {
        _hideShowRelax() {
            this.showRelaxCopy = false;
        }
    }



}


</script>

<style scoped>
.btn-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

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

    .relax-image {
        width: 70%;
    }
}
</style>