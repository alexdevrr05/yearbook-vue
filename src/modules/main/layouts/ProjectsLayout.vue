<script setup>
import { computed, defineProps, ref } from 'vue';
import { useStore } from 'vuex';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const store = useStore();

const projectsState = computed(() => store.getters['main/getProjects']);

const descLengthController = (description) => description.length > 130 ? description.substring(0, 130) + '...' : description;
const titleLengthController = (title) => title.length > 40 ? title.substring(0, 40) + '...' : title;

const colorPurple = ref("#673AB7");

const props = defineProps({
    foundsAllsQtyState: {
        type: Number,
    },
    currentPageQty: {
        type: Number,
    },
    isLoading: {
        type: Boolean,
    },
    nextPage: {
        type: Function,
    },
    prevPage: {
        type: Function,
    },
    currentPage: {
        type: Number,
    },
});

</script>

<template>
    <div class="section">
        <div class="container">
            <div class="titles-container">
                <h1 class="text-center">¿Quieres ver lo que nuestros estudiantes han estado creando?</h1>
                <h2 class="text-center">¡Mira nuestros proyectos del semestre!</h2>
            </div>

            <div v-if="props.isLoading" class="container-spinner">
                <PulseLoader :color="colorPurple" />
            </div>

            <div v-else class="cards-container">
                <div class="card" v-for="project in projectsState" :key="project._id">
                    <div class="card-img-container">
                        <img :src="'https://rest-node-mongo-prod.up.railway.app/' + project.image"
                            :alt="project.title + 'img'">
                    </div>
                    <div class="container-desc">
                        <h4 class="title-card">{{ titleLengthController(project.title) }}</h4>
                        <p>{{ descLengthController(project.description) }}</p>
                        <p class="owner">Creado por: {{ project.ownerProject }}</p>
                    </div>
                    <!-- <a href="#">Leer más</a> -->
                </div>
            </div>

            <div class="container-pagination">
                <div class="container-more-or-back">
                    <v-btn v-if="props.currentPage > 1" class="more-or-back-text" rounded="lg" color="grey-darken-4"
                        size="small" @click="props.prevPage">
                        Volver
                    </v-btn>
                </div>

                <div class="container-more-or-back">
                    <v-btn color="deep-purple" v-if="props.foundsAllsQtyState > 6 && props.currentPageQty >= 6"
                        class="more-or-back-text" rounded="lg" size="small" @click="props.nextPage">
                        Ver más
                    </v-btn>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.section {
    color: white;
    margin-bottom: 5rem;
}

.container {
    width: 100%;
    min-height: 766px;
}

.cards-container {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
}

h1 {
    font-size: 2.2rem;
}

h2 {
    font-size: 1.8rem;
}

.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    flex: 0 1 calc(100% - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1rem;
    max-height: 400px;
}

@media (min-width: 463px) {
    .card {
        flex: 0 1 calc(33% - 1rem);
    }
}

.container-pagination {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.card-img-container {
    height: 200px;
    margin-bottom: 10px;
}


.title-card {
    line-height: 22px;
}

.container-desc {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
    object-fit: cover;
}

.container-spinner {
    display: flex;
    justify-content: center;
    /*padding: 15rem;*/
    padding: 5rem 0;
    width: 100%;
}

.card h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}

.card a {
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
}

.card a:hover {
    background-color: #0062cc;
}

.owner {
    font-weight: bold;
}
</style>