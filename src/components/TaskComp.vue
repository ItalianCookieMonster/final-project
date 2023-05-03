<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-12 col-lg-6 border-bottom-0">
                <h3 class="h4 list-header">To do</h3>
                <ol class="list-group list-group-flush">

                    <li v-for="task in tasks" :key="task.id" class="list-group-item d-flex 
                justify-content-between 
                align-items-start
                list-group-item-action" >
                        <div class="ms-2 me-auto" >
                            <span>
                                {{ task.title }}
                            </span>
                        </div>
                        <span class="badge delete-icon">
                            <i class="bi bi-trash" @click="_handleDeleteTask(task.id)"> </i>
                        </span>
                        <span class="badge">
                            <router-link :to="{ name: 'edit-task', params: { id: task.id } }" class="edit-icon">
                                <i class="bi bi-pencil" ></i>
                            </router-link>
                        </span>

                        <span class="badge done-icon">
                            <i class="bi bi-check-lg" @click="_handleTaskCompleted(task.id)"></i>
                        </span>
                    </li>
                </ol>

            </div>


            <div class="col-sm-12 col-lg-6 border">
                <h3 class="h4 list-header">Done</h3>
                <ol class="list-group list-group-flush">
                    <li v-for="completedTask in completedTaskList" :key="completedTask.id" class="list-group-item d-flex 
                justify-content-between 
                align-items-start
                list-group-item-action">
                        <div class="ms-2 me-auto">
                            <span>
                                {{ completedTask.title }}
                            </span>
                        </div>
                        <span class="badge unchecked-icon">
                            <i class="bi bi-arrow-90deg-up"
                                @click="_handleTaskUndone(completedTask.id)"></i>
                        </span>
                        <span class="badge delete-icon">
                            <i class="bi bi-trash" @click="_handleDeleteTask(completedTask.id)"> </i>
                        </span>
                    </li>
                </ol>
            </div>
            <router-view></router-view>
        </div>
        
    </div>

    <AlertComp v-if="showAlert" :message="alertMessage" />

    <router-link :to="{ name: 'add-task' }" class="btn">Add Task</router-link>
    
</template>

<script>
import tasks from '../stores/tasks';
import users from '../stores/users';
import { mapActions, mapState } from 'pinia';
import AlertComp from './AlertComp.vue';
export default {
    name: 'TaskComp',

    components: {
        AlertComp,
    },

    data() {
        return {
            newTask: '',
            showAlert: false,
            alertMessage: '',
        }
    },

    computed: {
        ...mapState(tasks, ['tasks', 'completedTaskList']),
        ...mapState(users, ['user']),
    },

    methods: {
        ...mapActions(tasks, ['_deleteTask', '_taskCompleted', '_taskUndone']),

        async _handleDeleteTask(taskId) {
            try {
                await this._deleteTask(taskId);
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }
        },

        async _handleTaskCompleted(taskId) {
            try {
                await this._taskCompleted(taskId);
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }

        },

        async _handleTaskUndone(taskId) {
            try {
                await this._taskUndone(taskId);
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }
        }
    },

}

</script>

<style scoped>
.container{
    margin-bottom: 20px;

}

.list-header {
    padding: 20px 10px 20px 10px;
}

.delete-icon:focus,
.delete-icon:hover{
    color: red
}
.delete-icon,
.edit-icon,
.done-icon,
.unchecked-icon {
    color: black;
}

.edit-icon:hover,
.edit-icon:focus {
    color: rgb(255, 221, 0); 
}


.done-icon:hover,
.done-icon:focus {
    color: rgba(0, 255, 8, 0.772); 
}

.unchecked-icon:hover,
.unchecked-icon:focus {
    color: rgba(0, 162, 255, 0.772); 
}

@media (min-width: 992) {
    .badge {
        width: 30px;
    }

}



</style>