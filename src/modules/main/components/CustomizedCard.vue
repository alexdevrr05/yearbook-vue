
<template>
    <div class="card" :style="{ backgroundColor: color }">
        <div class="card-content" ref="card">
            <v-avatar color="grey-darken-3"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80">
            </v-avatar>
            <div class="title-username">
                <h1>{{ userName }}</h1>
            </div>
            <div class="acknowledgments">
                <v-card-text class="text-h6">
                    {{ acknowledgments }}
                </v-card-text>

                <!-- <v-card-text class="text-h5 py-2">{{ acknowledgments }}<v-card-text /> -->
            </div>
        </div>
    </div>
</template>

<script>

import { ref, onMounted, toRefs } from 'vue';

export default {

    props: {
        color: {
            String,
            default: '#6834a6',
        },
        userName: {
            String,
            default: 'Pepe',
        },
        agradecimiento: {
            type: String,
        }
    },

    setup(props) {
        const card = ref({});
        const acknowledgments = ref();
        const { agradecimiento } = toRefs(props);


        onMounted(() => {
            if (card.value.offsetWidth > 400) {
                acknowledgments.value = agradecimiento.value.length > 200 ? agradecimiento.value.substring(0, 200) + '...' : agradecimiento.value;
            } else {
                acknowledgments.value = agradecimiento.value.length > 60 ? agradecimiento.value.substring(0, 60) + '...' : agradecimiento.value;
            }
        });

        return {
            acknowledgments,
            card
        }
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

.v-card-text {
    padding: unset
}
</style>


