<template>
    <ul>
        <li v-for="task in taskList" :key="task.id">
            <span>{{ task.title }}</span>
            <router-link :to="{ name: 'edit-task', params: { id: task.id } }">>Edit</router-link>
            <button @click="_handleDeleteTask(task.id)">Delete</button>
            <button @click="_handleTaskCompleted(task.id)">Done</button>
        </li>
    </ul>   
    <router-link :to="{ name: 'add-task' }">Add Task</router-link>
    
    <ul>
        <li v-for="completedTask in completedTasksList" :key="completedTask.id">
            <span>{{ completedTask.title }}</span>
            <button @click="_handleTaskUndone(completedTask.id)">Uncheck</button>
        </li>
    </ul>

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
            // editedTask: '',
        }
    },

    computed: {
        ...mapState(tasks, ['tasks']),
        ...mapState(users, ['user']),

        taskList(){
            return this.tasks.filter(task => task.is_complete === false)
        },

        completedTasksList() {
            return this.tasks.filter(task => task.is_complete === true);
        }
    },

    watch: {

    },

    methods: {
        ...mapActions(tasks, ['_deleteTask', '_taskCompleted', '_taskUndone']),

        async _handleDeleteTask(taskId) {
            try {
                await this._deleteTask(taskId);
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'}
            },
        
        async _handleTaskCompleted(taskId) {
            try {
                await this._taskCompleted(taskId);
            } catch (error){
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }

        },

        async _handleTaskUndone(taskId) {
            
            try {
                await this._taskUndone(taskId);
                this._filterTaskList
            } catch (error){
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }
        }
    }
}

</script>