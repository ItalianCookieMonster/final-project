<template>
    <div class="task-container">
        <div class="toDo-container">
            <h3 class="h4 list-header">To do</h3>
            <ol class="list-group list-group-flush">

                <li v-for="task in tasks" :key="task.id" class="list-group-item
                justify-content-between 
                align-items-start
                list-group-item-action">
                    <div class="icons-wrapper">
                        <div class="priority-container">
                            <div class="priority" :class="priorityClass(task.priority)"></div>
                        </div>
                        <div class="icons-container">
                            <span class="badge">
                                <router-link :to="{ name: 'edit-task', params: { id: task.id } }" class="edit-icon">
                                    <i class="bi bi-pencil"></i>
                                </router-link>
                            </span>
                            <span class="badge done-icon">
                                <i class="bi bi-check-lg" @click="_handleTaskCompleted(task.id)"></i>
                            </span>
                            <span class="badge delete-icon">
                                <i class="bi bi-trash" @click="_handleDeleteTask(task.id)"> </i>
                            </span>
                        </div>
                    </div>
                    <div>
                        <p class="task-text">
                            {{ task.title }}
                        </p>
                        <p class="text-muted">
                            {{ task.description }}
                        </p>
                    </div>
                </li>
            </ol>

        </div>

        <div class="done-container">
            <h3 class="h4 list-header">Done</h3>
            <ol class="list-group list-group-flush">
                <li v-for="completedTask in completedTaskList" :key="completedTask.id" class="list-group-item
                justify-content-between 
                align-items-start
                list-group-item-action">
                    <div class="icons-wrapper">
                        <div class="priority-container">
                            <div class="priority" :class="priorityClass(completedTask.priority)"></div>
                        </div>
                        <div class="icons-container">
                            <span class="badge unchecked-icon">
                                <i class="bi bi-arrow-90deg-up" @click="_handleTaskUndone(completedTask.id)"></i>
                            </span>
                            <span class="badge delete-icon">
                                <i class="bi bi-trash" @click="_handleDeleteTask(completedTask.id)"> </i>
                            </span>
                        </div>
                    </div>
                    <div class="text-container">
                        <p  class="task-text">
                            <del>{{ completedTask.title }}</del>
                        </p>
                        <p class="text-muted">
                            <del>{{ completedTask.description }}</del>
                        </p>
                    </div>

                </li>
            </ol>
        </div>
    </div>


    <AllDone :showRelax="showRelax"></AllDone>

    <router-view></router-view>
    <AlertComp v-if="showAlert" :message="alertMessage" />
</template>

<script>
import tasks from '../stores/tasks';
import users from '../stores/users';
import { mapActions, mapState } from 'pinia';
import AlertComp from './popups-alerts/AlertComp.vue';
import AllDone from './popups-alerts/AllDone.vue';

export default {
    name: 'TaskComp',

    components: {
        AlertComp,
        AllDone
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

        showRelax() {
            if (this.tasks.length === 0) {
                return true
            } else {
                return false
            }
        }

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
        },

        hideShowRelax() {
            this.showRelax = false;
        },

        priorityClass(priority) {
            console.log(priority)
            if (priority === 'high') {
                return 'priority-high';
            } else if (priority === 'medium') {
                return 'priority-medium';
            } else if (priority === 'low') {
                return 'priority-low';
            } else {
                return '';
            }
        },

    },

}

</script>

<style scoped>

.icons-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.task-text{
    font-size: 18px;
}

.text-container {
    display: block;
    width: 100%;
    font-size: 16px;
}

.task-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.toDo-container,
.done-container {
    background: #fff;
    height: 100%;
    width: 100%;
    margin: 10px;
    border-radius: 5px;
}

.list-header {
    padding: 10px;
}

/* Icons hover styles */

.delete-icon:focus,
.delete-icon:hover {
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

/* Priority settings */

.priority {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid black
}

.priority-high {
    background-color: #e7acac;
}

.priority-medium {
    background-color: #fde493;
}

.priority-low {
    background-color: #a2e2a2;
}




@media (min-width: 992px) {

    .task-container {
        flex-direction: row;

    }

    .task-text {
        font-size: 1.2rem
    }

    .badge i {
        font-size: 1.2rem;
    }

    .h4 {
        text-align: center;
    }

    .priority {
        width: 20px;
        height: 20px
    }
}
</style>