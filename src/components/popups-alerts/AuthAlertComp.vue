<template>
    <div class="overlay" v-if="alertDisplay">
        <div class="container container-with-overlay">
            <div class="alert" :class="alertClass" role="alert">
                <i v-if="message.includes('success')" class="bi bi-emoji-smile">
                    <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close" style="color:#0f5132 "
                        @click="_redirectUser">
                    </button>
                </i>

                <i v-else class="bi bi-emoji-frown">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="toggleAlert" style="color:#842029;"></button>
                </i>
                <h4>{{ title }}</h4>
                <p>
                    {{ message }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AuthAlertComp',

    data(){
        return {
            alertDisplay: true,
                    
        }
    },

    props: {
        message: {
            type: String,
            required: true,
        },
    },
    computed: {

        title() {
            if (this.message.includes('success')) {
                return 'Welcome to the crew!';
            } else {
                return 'Ooops!';
            }
        },
        alertClass() {
            if (this.message.includes('success')) {
                return 'alert-success'
            } else {
                return 'alert-danger'
            }
        },
    },

    methods: {
        _redirectUser() {
            this.$router.push({name: 'sign-in'});
        },

        toggleAlert() {
                    this.alertDisplay = false
                },
    }

}
</script>

<style scoped>


.container-with-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    top: 5%;
}

.alert {
    border-radius: 20px;
}

.btn-close {
    float: right;
    width: 5px;
    height: 5px;
}

.close span {
    font-size: 1.5rem;
}

.alert i {
    font-size: 2rem;
}
</style>

