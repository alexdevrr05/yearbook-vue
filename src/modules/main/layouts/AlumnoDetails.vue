<script setup>
import { watch, onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import useAlumno from '../composables/alumnos/useAlumno';

const store = useStore();
const router = useRouter();
const route = useRoute();

const useDetails = ref(computed(() => store.getters[['main/getUserDetails']]));;

onMounted(() => {
    if (store.state.main.userSession) {
        store.dispatch("main/loadUserSession")
    }
});

const { isLoading, alumno, searchAlumno } = useAlumno(store, route.params.id);

watch(
    // el parametro que queremos escuchar
    () => route.params.id,
    // la función a ejecutar al cambiar el parametro
    () => searchAlumno(route.params.id),

    () => store.state.main.userSession,
    (newSession) => {
        if (newSession) {
            store.state.main.userSession = newSession;
        } else {
            router.push('/login');
        }
    }
)

const getText = ($event) => {
    if ($event.code === "Escape") {
    }
}

</script>

<template>
    <div class="section">

        <div v-if="isLoading">
            <h1>Loading...</h1>
        </div>

        <div v-else class="container">
            <h1>Actualiza la información de {{ alumno?.usuario.nombre }}</h1>
            <div>
                <form action="post" class="form-container">
                    <input v-model="useDetails.nombre" class="ui-textarea" />
                    <input v-model="useDetails.email" class="ui-textarea" />
                    <!-- <p class="msgError" v-if="msgError">{{ msgError }}</p> -->

                    <div class="container-button">
                        <v-btn block class="transparent-btn"
                            @click="handleSubmitForm(agradecimientoTextarea)">enviar</v-btn>
                    </div>
                </form>

            </div>

        </div>
    </div>
</template>

<style scoped>
.section {
    color: white;
    margin-top: 3rem;
    text-align: center;
}


.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ui-textarea {
    width: 100%;
    height: 70px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #673AB7;
    border-radius: 5px;
    transition-property: box-shadow;
    transition-duration: 300ms;
    resize: vertical;
    color: white;
}

.ui-textarea::placeholder {
    color: #b5b3b3;
}

.ui-textarea:focus {
    outline: none;
    box-shadow: 0px 0px 8px #554177;
}
</style>