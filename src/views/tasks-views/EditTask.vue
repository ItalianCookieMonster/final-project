<template>
    <form>
        <label for="editedTask">Title</label>
        <input type="text" v-model="editedTask" name="editedTask">
        <input type="text-area" v-model="editedDescription" name="editedDescription">
        <button @click.prevent="_handleEditing()">Save</button>
        <router-link :to="{name: 'home'}">Cancel</router-link>
    </form>

    <AlertComp v-if="showAlert" :message="alertMessage" />
</template>

<script>
import tasks from '../../stores/tasks';
import { mapActions, mapState } from 'pinia';
import AlertComp from '../../components/AlertComp.vue';

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

        _setDefaultTitle(){
            this.editedTask = this.singleTask.title;
        },


        async _fetchTask(){
            try {
                await this._fetchSingleTask(this.id);
            } catch (error) {
                console.error(error)
                this.$router.push({ name: 'home' });
            }

        },

        async _handleEditing(){
            try {
                await this._editTask({ title: this.editedTask, id: this.id}); 
                this.showAlert = true;
                this.alertMessage = 'Task added successfully';
            } catch (error) {
                console.error(error)
                this.showAlert = true
                this.alertMessage = 'Something went wrong, please try again'
            }
        },

    },

    mounted(){
        this._fetchTask();
        this._setDefaultTitle();
    }
}
</script>