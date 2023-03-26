
<template>
    <div class="card" :style="{ backgroundColor: cardColor }">
        <div class="card-content">
            <h1>{{ username }}</h1>
        </div>
    </div>
</template>

<script>

export default {

    props: {
        cardColor: {
            String,
            default: '#6834a6',
        },
        username: {
            String,
            default: 'Pepe',
        }
    },

    setup() {

    },
}

</script>

<style scoped>
.card {
    background-color: black;
    border-radius: 8px;
    min-height: 200px;
}

.card-content {
    padding: 1rem;
}
</style>


