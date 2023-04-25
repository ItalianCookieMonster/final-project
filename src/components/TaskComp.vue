<template>
    <ul>
        <li v-for="task in tasks" :key="task.id">
            <span>{{ task.title }}</span>
            <input v-if="taskIsEditing" type="text" v-model="editedTask"/>
            <button @click="_handleEditTask(task.id)">{{ editButton }}</button>
            <button @click="_handleDeleteTask(task.id)">Delete</button>
            <button @click="doneTask()">Done</button>
        </li>
    </ul>   
    <label for="newTask">New Task</label>
    <input type="text" name="newTask" v-model="newTask">
    <button @click="_handleAddNewTask">Add new task</button>

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
            taskIsEditing: false,
            editButton: 'Edit',
        }
    },

    computed: {
        ...mapState(tasks, ['tasks']),
        ...mapState(users, ['user']),
    },

    methods: {
        ...mapActions(tasks, ['_addNewTask', '_deleteTask', '_editTask']),

        async _handleAddNewTask() {
            try {
                await this._addNewTask({ title: this.newTask, user_id: this.user.id });
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }

        },

        async _handleDeleteTask(taskId) {
            try {
                console.log(taskId)
                await this._deleteTask(taskId);
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'}
            },
        
        _handleEditTask(taskId){
            if (this.taskIsEditing) { 
                this.taskIsEditing = false;
                this.editButton = 'Edit'
                this._editingTask(taskId, this.editedTask);
            } else {
                this.taskIsEditing = true;
                this.editButton = 'Done'
            }
        },

        async _editingTask(taskId, editedTask){
            try {
                console.log(taskId)
                console.log(editedTask)
                await this._editTask({ title: editedTask, id: taskId }); 
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }
        }
    }
}

</script>