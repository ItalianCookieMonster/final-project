<template>
    <div class="overlay">
        <div class="container container-with-overlay">
            <div class="alert" :class="alertClass" role="alert">
                <i v-if="message.includes('success')" class="bi bi-emoji-smile">
                    <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close" style="color:#0f5132 "
                        @click="_redirectHome"></button>
                </i>
                <i v-else class="bi bi-emoji-frown">
                    <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close" style="color:#842029; "
                        @click="_redirectHome"></button>
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
    name: 'AlertComp',

    props: {
        message: {
            type: String,
            required: true,
        },
    },
    computed: {
        title() {
            if (this.message.includes('success')) {
                return 'Well done!';
            } else {
                return 'Oh no!';
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
        _redirectHome() {
            this.$router.push({ name: 'home' })
        },
    }
}

</script>

<style scoped>
.container-with-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}

.alert {
    border-radius: 20px;
}

.btn-close {
    float: right;
    width: 5px;
    height: 5px;
}


.alert i {
    font-size: 2rem;
}
</style>