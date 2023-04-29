<template>
    <div :class="alertClass">
        <div>icon</div>
        <div>
            {{ message }}
        </div>
        <button @click="_redirectHome">Close</button>
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
            this.$router.push('/')
        },
    }

}
</script>

<style scoped>
</style>