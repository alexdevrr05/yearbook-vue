
<template>
    <div class="card" :style="{ backgroundColor: color }">
        <div class="card-content" ref="card">
            <v-avatar v-if="isExternalUrl(image)" color="grey-darken-3" :image="isExternalUrl(image) && image">
            </v-avatar>
            <v-avatar v-else color="grey-darken-3" :image="'http://localhost:4000/' + image">
            </v-avatar>
            <div class="title-username">
                <h2>{{ userName }}</h2>
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
        },
        image: {
            type: String,
        },
    },

    setup(props) {
        const card = ref({});
        const acknowledgments = ref();
        const { agradecimiento } = toRefs(props);


        const isExternalUrl = (url) => url?.startsWith('https');

        onMounted(() => {
            if (card.value.offsetWidth > 400) {
                acknowledgments.value = agradecimiento.value.length > 200 ? agradecimiento.value.substring(0, 200) + '...' : agradecimiento.value;
            } else {
                acknowledgments.value = agradecimiento.value.length > 60 ? agradecimiento.value.substring(0, 60) + '...' : agradecimiento.value;
            }
        });

        return {
            acknowledgments,
            card,
            isExternalUrl
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

.text-h6 {
    line-height: 19px;
}
</style>


