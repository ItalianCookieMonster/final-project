<template>
    <div class="alert" :class="alertClass" role="alert">
        <i v-if="message.includes('Success') || message.includes('sent')" class="bi bi-emoji-smile">
            <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close" style="color:#0f5132 "
                @click="_redirectHome">
            </button>
        </i>

        <i v-else class="bi bi-emoji-frown">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </i>
        <h4>{{ title }}</h4>
        <p>
            {{ message }}
        </p>
    </div>
</template>


<script>
export default {
    name: 'PasswordAlert',

    props: {
        message: {
            type: String,
            required: true
        }
    },

    computed: {

        title() {
            if (this.message.includes('Success')|| this.message.includes('sent')) {
                return 'All right!';
            } else {
                return 'Ooops!';
            }
        },
        alertClass() {
            if (this.message.includes('Success') || this.message.includes('sent')) {
                return 'alert-success'
            } else {
                return 'alert-danger'
            }
        },
    },

    methods: {
        _redirectHome() {
            this.$router.push({name: 'home'})
        },
    }
}




</script>

<style scoped>
.btn-close {
    float: right;
    width: 5px; 
    height: 5px
}

.bi {
    font-size: 1.5rem;
}


</style>