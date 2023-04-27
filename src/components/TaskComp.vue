<template>
    <ul>
        <li v-for="task in tasks" :key="task.id">
            <span>{{ task.title }}</span>
            <!-- <button @click="_handleEditTask(task.id)">{{ editButton }}</button> -->
            <router-link :to="{ name: 'edit-task', params: { id: task.id } }">>Edit</router-link>
            <button @click="_handleDeleteTask(task.id)">Delete</button>
            <button @click="doneTask()">Done</button>
        </li>
    </ul>   
    <router-link :to="{ name: 'add-task' }">Add Task</router-link>
    <!-- <label for="newTask">New Task</label>
    <input type="text" name="newTask" v-model="newTask">
    <button @click="_handleAddNewTask">Add new task</button> -->

    <router-view></router-view>
    <AlertComp v-if="showAlert" :message="alertMessage" />
</template>

<script>
import tasks from '../stores/tasks';
import users from '../stores/users';
import { mapActions, mapState } from 'pinia';
import AlertComp from './AlertComp.vue';
export default {
    name: 'TaskComp',

    components: {
        AlertComp
    },

    data() {
        return {
            newTask: '',
            showAlert: false,
            alertMessage: '',
            editedTask: '',
            // taskIsEditing: false,
            // editButton: 'Edit',
        }
    },

    computed: {
        ...mapState(tasks, ['tasks']),
        ...mapState(users, ['user']),
    },

    methods: {
        ...mapActions(tasks, ['_deleteTask', ]),

        async _handleDeleteTask(taskId) {
            try {
                console.log(taskId)
                await this._deleteTask(taskId);
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'}
            },
    
    }
}

</script>