<template>
    <div :class="alertClass">
        <div>icon</div>
        <div>
            {{ message }}
        </div>
        <button>Close</button>
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
                return 'alert success'
            } else {
                return 'alert error'
            }
        },
    },

}
</script>

<style scoped>
.alert {
    padding: 1rem;
    margin-top: 1rem;
}

.success {
    background-color: green;
    color: white;
}

.error {
    background-color: red;
    color: white;
}
</style>