<template>
    <form>
        <label for="newTask">Title</label>
        <input type="text" v-model="newTask" name="newTask">
        <input type="text-area" v-model="description" name="editedDescription">
        <button @click.prevent="_handleAddNewTask">Add new task</button>
        <router-link :to="{name: 'home'}">Cancel</router-link>
    </form>

    <AlertComp v-if="showAlert" :message="alertMessage" />
</template>

<script>
import AlertComp from '../../components/AlertComp.vue';
import tasks from '../../stores/tasks';
import users from '../../stores/users';
import { mapActions, mapState } from 'pinia';

export default {
    name: 'AddTask',

    components: {
        AlertComp
    },

    data() {
        return {
            newTask: '',
            description: '',
            showAlert: false,
            alertMessage: ''
        }
    },

    computed: {
        ...mapState(users, ['user']),
    },

    methods: {

        ...mapActions(tasks, ['_addNewTask']),

        async _handleAddNewTask() {
            try {
                console.log(this.user.id)
                await this._addNewTask({ title: this.newTask, user_id: this.user.id });
                this.showAlert = true;
                this.alertMessage = 'Task added successfully';
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }

        },
    }



}
</script>