<template>
   <div class="overlay">
        <div class="container container-with-overlay">
            <div class="alert" :class="alertClass" role="alert">
                    <i v-if="message.includes('success')" class="bi bi-emoji-smile">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="color:#0f5132 "
                        @click="_redirectUser">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </i>
                    <i v-else class="bi bi-emoji-frown">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="color:#842029; "
                        @click="_redirectUser">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </i>

                <h4>{{ title }}</h4>
                <p>
                    {{ message }}
                </p>

            </div>
        </div>
    </div>⁄
</template>

<script>

export default {
    name: 'AuthAlertComp',

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
            if (this.message.includes('success')) {
                this.$router.push({ name: 'sign-in' })
            }
            if (this.$route.path === '/sign-in') {
                this.$router.push({ name: 'sign-in' })
            } else if (this.$route.path === '/sign-up') {
                this.$router.push({ name: 'sign-up' })
            }
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

.close {
    float: right;
    width: 1.5rem;
}

.close span {
    font-size: 1.5rem;
}

.alert i {
    font-size: 2rem;
}

</style>

