<script setup>
import { ref, computed, watch, createApp } from 'vue';
import { useStore } from 'vuex';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const store = useStore();

const app = createApp({});
const currentUsers = ref(computed(() => store.getters[['main/getUsers']]));
const currentUserDeleted = ref(computed(() => store.getters[['main/getUserDeleted']]));
const isExternalUrl = (url) => url?.startsWith('https');
const isActiveModal = ref(false);

const deleteUser = (id) => {
    store.dispatch("main/deleteUser", id)
}

watch(currentUserDeleted, (newValue, oldValue) => {
    if (oldValue !== newValue) {
        store.dispatch("main/loadUsers")
        isActiveModal.value = true;
        return;
    }

    isActiveModal.value = false;
});

app.use(VueSweetalert2);

const showAlert = () => {
    app.config.globalProperties.$swal({
        title: 'Elimnado',
        text: `Usuario ${currentUserDeleted.value} eliminado`,
        icon: 'success',
    });
};


</script>

<template>
    <div class="section">
        <div class="alumnos-container">
            <div v-if="isActiveModal">
                {{ showAlert() }}
            </div>
            <div class="card-container" v-for="user of currentUsers">
                <div class="card" v-if="user.rol !== 'ADMIN_ROLE'">
                    <div class="content-container">
                        <div class="image-container">
                            <!-- <img :src="isExternalUrl(user.image)" alt=""> -->
                            <img v-if="isExternalUrl(user?.image)" :src="user.image" :alt="user?.nombre + '-img'">
                            <img v-else :src="'http://localhost:4000/' + user.image" :alt="user?.nombre + '-img'">
                        </div>
                        <p class="name-alumno">{{ user.nombre }}</p>
                    </div>
                    <div class="btn-delete">
                        <button class="delete-button" @click="deleteUser(user.uid)">&times;</button>
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
    display: flex;
    gap: 2rem;
    padding-top: 1rem;
}

.content-container {
    display: flex;
    padding: 0.5rem;
    gap: 0.1rem;
    align-items: center;
}

.card-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.card {
    width: 100px;
    background: linear-gradient(90deg, rgba(251, 103, 90, 1) 0%, rgba(249, 104, 36, 1) 35%, rgba(250, 152, 63, 1) 100%);
    border-radius: 10px;
    position: relative;
}

.name-alumno {
    font-weight: bold;
    font-size: 10px;
}


@media (min-width: 768px) {
    .card {
        width: 200px;
    }

    .content-container {
        padding: 1rem;
        gap: 1rem
    }

    .name-alumno {
        font-size: unset;
    }
}


.image-container {
    border-radius: 10px;
    width: 30px;
    height: 30px;
    display: flex;
}

.image-container img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}


.btn-delete {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}

.delete-button {
    position: absolute;
    top: -1rem;
    right: -1rem;
    background-color: rgb(194, 47, 59);
    color: white;
    border: none;
    height: 20px;
    width: 20px;
    border-radius: 20px;
    cursor: pointer;
}


@media (min-width: 768px) {
    .delete-button {
        height: 30px;
        width: 30px;
        right: -1.5rem;
    }
}
</style>

