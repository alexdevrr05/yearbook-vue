<script setup>
import { watch, onMounted, computed, ref, createApp } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import useAlumno from '../composables/alumnos/useAlumno';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp({});

const store = useStore();
const router = useRouter();
const route = useRoute();

const useDetails = ref(computed(() => store.getters[['main/getUserDetails']]));;
const isCorrectIcon = ref();
const isActiveModal = ref(false);
const titleAlert = ref('Usuario actualizado!');

let nombreAlumno = ref('none');
const msgSuccess = ref('Actualización exitosa');

onMounted(() => {
    if (store.state.main.userSession) {
        store.dispatch("main/loadUserSession")
    }
});

const { isLoading, searchAlumno, errorMsg } = useAlumno(store, route.params.id);


if (useDetails.value) {
    nombreAlumno = ref(computed(() => useDetails.value.nombre));
}

const updateUser = async (id) => {
    isCorrectIcon.value = '';
    if (nombreAlumno) {
        const response = await store.dispatch("main/updateUserDetails", { id, nombre: nombreAlumno.value })
        if (response.error) {
            titleAlert.value = 'Error',
                msgSuccess.value = 'Algo ha salido mal';
            isCorrectIcon.value = 'error';
            isActiveModal.value = true;
            return;
        }

        isActiveModal.value = true;
        isCorrectIcon.value = 'success';
    }
}

app.use(VueSweetalert2);

const showAlert = () => {
    app.config.globalProperties.$swal({
        title: titleAlert.value,
        text: msgSuccess.value,
        icon: isCorrectIcon.value,
    }).then(() => {
        isActiveModal.value = false;
    });
};

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

</script>

<template>
    <div class="section-edit">
        <div v-if="errorMsg || !useDetails">
            <h1>
                {{ errorMsg || 'No se pudo encontrar ese usuario' }}
            </h1>
        </div>

        <div v-if="isLoading">
            <h1>Loading...</h1>
        </div>

        <div v-else class="container-edit">
            <template v-if="!errorMsg && useDetails">
                <h1>Actualiza la información de {{ useDetails.nombre }}</h1>
                <div>
                    <form action="post" class="form-container" @submit.prevent="updateUser(useDetails.uid)">
                        <input v-model="useDetails.nombre" class="ui-textarea" />
                        <!-- <input v-model="useDetails.uid" class="ui-textarea" /> -->

                        <div class="container-button">
                            <v-btn block class="transparent-btn" type="submit"
                                @click="updateUser(useDetails.uid)">enviar</v-btn>
                        </div>
                    </form>
                </div>
            </template>
            <div v-if="isActiveModal">
                {{ showAlert() }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.section-edit {
    color: white;
    margin-top: 3rem;
    text-align: center;
}


.container-edit {
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