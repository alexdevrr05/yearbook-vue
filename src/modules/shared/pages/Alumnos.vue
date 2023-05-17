<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const currentUsers = ref(computed(() => store.getters[['main/getUsers']]));

</script>

<template>
    <div class="section">
        <div class="alumnos-container">
            <!-- <h1>Alumnos page</h1> -->
            <div class="card-container">
                <div class="card" v-for="user of currentUsers">
                    <div class="content-container">
                        <div class="image-container">
                            <img :src="user.image" alt="">
                        </div>
                        <p class="name-alumno">{{ user.nombre }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.section {
    display: flex;
    width: 100%;
    color: white;
    margin-bottom: unset;
    overflow-x: auto;
    white-space: nowrap;
}

.section::-webkit-scrollbar {
    width: 0.1em;
    /* Anchura de la barra de desplazamiento */
    height: 0.1em;
    /* Altura de la barra de desplazamiento */
}

.section::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Color del pulgar de la barra de desplazamiento */
}

.alumnos-container {
    padding: 0 1rem;
    padding-top: 1rem;
}

.content-container {
    display: flex;
    padding: 1rem;
    gap: 1rem;
    align-items: center;
}

.card-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.card {
    background: linear-gradient(90deg, rgba(251, 103, 90, 1) 0%, rgba(249, 104, 36, 1) 35%, rgba(250, 152, 63, 1) 100%);



    width: 200px;
    border-radius: 10px;
}


.image-container {
    border-radius: 10px;
    width: 30px;
    height: 30px;
}

.image-container img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.name-alumno {
    font-weight: bold;
}
</style>

