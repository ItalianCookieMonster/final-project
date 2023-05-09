<template>
    <div class="overlay">
        <div class="container container-with-overlay">
            <div class="row justify-content-center">
                <div class="col">
                    <form>
                        <div class="form-group">
                            <label class="lable" for="editedTask">Title</label>
                            <input type="text" v-model="editedTask" name="editedTask" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="lable" for="editedDescription">Description</label>
                            <textarea v-model="editedDescription" name="editedDescription" class="form-control" rows="4"></textarea>
                        </div>
                        <div class="btns-form">
                            <button @click.prevent="_handleEditing()" class="btn">Save</button>
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
import tasks from '../../stores/tasks';
import { mapActions, mapState } from 'pinia';
import AlertComp from '../../components/popups-alerts/AlertComp.vue';

export default {
    name: 'EditTask',

    components: {
        AlertComp
    },

    data() {
        return {
            editedTask: '',
            editedDescription: '',
            showAlert: false,
            alertMessage: '',
        }
    },

    computed: {
        ...mapState(tasks, ['singleTask']),
    },

    props: ['id'],

    methods: {
        ...mapActions(tasks, ['_editTask', '_fetchSingleTask']),

        _setDefaultTitle() {
            this.editedTask = this.singleTask.title;
        },


        async _fetchTask() {
            try {
                await this._fetchSingleTask(this.id);
            } catch (error) {
                console.error(error)
                this.$router.push({ name: 'home' });
            }

        },

        async _handleEditing() {
            try {
                await this._editTask({ title: this.editedTask, id: this.id });
                this.showAlert = true;
                this.alertMessage = 'Task updated successfully';
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }
        },

    },

    mounted() {
        this._fetchTask();
        this._setDefaultTitle();
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