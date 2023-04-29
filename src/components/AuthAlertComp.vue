<template>
    <div :class="alertClass">
        <div>icon</div>
        <div>
            {{ message }}
        </div>
        <button @click="_redirectUser">Close</button>
    </div>
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
            if (this.$route.path === '/sign-in') {
                this.$router.push('/sign-in')
            } else if (this.$route.path === '/sign-up') {
                this.$router.push('/sign-up')
            }
        },
    }

}
</script>

