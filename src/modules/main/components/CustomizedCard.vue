
<template>
    <div class="card" :style="{ backgroundColor: cardColor }">
        <div class="card-content" ref="card">
            <v-avatar color="grey-darken-3"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80">
            </v-avatar>
            <div class="title-username">
                <h1>{{ username }}</h1>
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

import { computed, ref, onMounted } from 'vue';

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
        const card = ref({});
        const text = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed fuga quam in modi tempore nihil tenetur assumenda consequuntur nisi consequatur amet sapiente odio. Ut anim commodo anim pariatur eu cillum aliqua occaecat nostrud tempor eu ex nulla dolor.');
        const acknowledgments = ref();

        onMounted(() => {

            if (card.value.offsetWidth > 400) {
                acknowledgments.value = text.value.length > 200 ? text.value.substring(0, 200) + '...' : text.value;
            } else {
                acknowledgments.value = text.value.length > 60 && text.value.substring(0, 60) + '...';
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


