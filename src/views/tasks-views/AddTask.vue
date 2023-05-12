<template>
    <div class="overlay">
        <div class="container container-with-overlay">
            <div class="row justify-content-center">
                <div class="col">
                    <form>
                        <div class="form-group">
                            <label class="lable" for="newTask">Title</label>
                            <input type="text" v-model="newTask" name="newTask" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="newTaskDescription" class="lable">Description</label>
                            <textarea type="text-area" v-model="description" name="newTaskDescription" rows="4"
                                class="form-control"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="priority" class="lable">Priority</label>
                            <select class="form-select" name="priority" aria-label="Default select example" v-model="priority">
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        <div class="btns-form">
                            <button @click.prevent="_handleAddNewTask" class="btn">Save</button>
                            <router-link :to="{ name: 'home' }" class="btn">Cancel</router-link>
                        </div>
                    </form>

                    <AlertComp v-if="showAlert" :message="alertMessage" />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import AlertComp from '../../components/popups-alerts/AlertComp.vue';
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
            alertMessage: '',
            priority: ''
        }
    },

    computed: {
        ...mapState(users, ['user']),
    },

    methods: {

        ...mapActions(tasks, ['_addNewTask']),

        async _handleAddNewTask() {
            await this._checkIfTitle()
            try {
                await this._addNewTask({ title: this.newTask, user_id: this.user.id, description: this.description, priority: this.priority });
                this.showAlert = true;
                this.alertMessage = 'Task added successfully';
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'

            }

        },

        async _checkIfTitle() {
            if (this.newTask.length === 0) {
                this.showAlert = true
                this.alertMessage = 'You forgot to insert a title'
                throw new Error
            }

            return
        }
    }



}
</script>

<style scoped>
.row {
    padding: 10px;
    height: auto;
}

.col {
    height: auto;
}

.lable {
    padding: 10px;
}
</style>