<script setup>
import { ref, computed, createApp } from 'vue';
import { useStore } from 'vuex';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { postProjects } from '../services/projects';
import useProjects from '../composables/projects/useProjects';

const store = useStore();

const originalPlaceholder = ref('Escribe un título para tu proyecto');
const originalPlaceholderProjectDesc = ref('Describe de qué trata tu proyecto');

const txtPlaceholder = ref(originalPlaceholder.value);
const txtPlaceholderProjectDesc = ref(originalPlaceholderProjectDesc.value);

const projectTitleInput = ref('');
const projectDescInput = ref('');

const msgError = ref();
const msgSuccess = ref();
const isActiveModal = ref(false);
const currentUserSession = ref(computed(() => store.getters[['main/getUserSession']]));
const file = ref(null);

const app = createApp({});

const onFocus = () => {
    txtPlaceholder.value = '';
    isActiveModal.value = false;
}

const removeFocus = () => {
    txtPlaceholder.value = originalPlaceholder.value;
    msgSuccess.value = null;
    msgError.value = null;
    isActiveModal.value = false;
}

const getText = ($event) => {
    if ($event.code === "Escape") {
        projectTitleInput.value = '';
        txtPlaceholder.value = originalPlaceholder.value;
        msgSuccess.value = null;
        msgError.value = null;
        isActiveModal.value = false;
    }
}

app.use(VueSweetalert2);

const showAlert = () => {
    app.config.globalProperties.$swal({
        title: 'Gracias por compartir tu proyecto!',
        text: msgSuccess.value,
        icon: 'success',
    });
};

const isValidForm = computed(() => projectTitleInput.value.length <= 10 || projectDescInput.value.length <= 10 || !file.value);

const handleSubmitForm = async () => {
    const formData = new FormData()

    const userName = currentUserSession.value;

    formData.append('title', projectTitleInput.value);
    formData.append('description', projectDescInput.value);
    formData.append('file', file.value);
    formData.append('ownerProject', userName);

    if (projectDescInput.value.length === 0 || projectTitleInput.value.length === 0 || !file.value) {
        msgError.value = 'Todos los campos son obligatorios...';
        return
    }
    if (projectDescInput.value.length > 10) {
        try {
            const response = await postProjects(formData);
            if (response.status === 200) {
                msgSuccess.value = response.msg;
                msgError.value = null;
                projectDescInput.value = '';
                projectTitleInput.value = '';
                file.value.value = null;
                txtPlaceholder.value = originalPlaceholder.value;
                txtPlaceholderProjectDesc.value = originalPlaceholderProjectDesc.value;

                const { projects } = useProjects(store);
                store.commit('main/setProjects', projects);
                isActiveModal.value = true;
            } else {
                msgSuccess.value = null;
                msgError.value = response.msg;
            }

        } catch (error) {
            console.log(error);
        }
        return;
    }

    msgError.value = 'El agradecimiento es demasiado corto...';

}

const onFileChange = (event) => {
    file.value = event.target.files[0];
}

</script>

<template>
    <div class="section">
        <div class="container-form">
            <!-- form -->
            <h1 class="motivation">Comparte tus proyectos</h1>
            <p class="motivation">Felicidades por haber terminado este semestre, es un logro que merece ser reconocido y
                celebrado</p>

            <form class="form-container" @submit.prevent="handleSubmitForm" enctype="application/json">
                <div class="inputs-container">
                    <!-- title -->
                    <input @keyup="getText($event)" :class="msgError ? 'border-red' : ''" class="ui-textarea"
                        :placeholder="txtPlaceholder" @focus="onFocus" v-model="projectTitleInput" @blur="removeFocus" />
                    <!-- description -->
                    <input @keyup="getText($event)" :class="msgError ? 'border-red' : ''" class="ui-textarea"
                        :placeholder="txtPlaceholderProjectDesc" v-model="projectDescInput" @blur="removeFocus" />

                    <!-- image -->
                    <v-file-input accept="image/*" label="Sube tu imagen" variant="outlined" class="input-field"
                        color="white" @change="onFileChange"></v-file-input>


                    <p class="msgError" v-if="msgError">{{ msgError }}</p>

                    <div class="container-button">
                        <v-btn block class="transparent-btn" :disabled="isValidForm"
                            @click="handleSubmitForm(projectTitleInput, projectDescInput, onFileChange)">enviar</v-btn>
                        <!-- <button type="submit">enviar</button> -->
                    </div>
                </div>
            </form>
        </div>

        <div v-if="isActiveModal">
            {{ showAlert() }}
        </div>

        <div class="container-ilustration">
            <!-- ilustration -->
            <!-- <h1>ilustration</h1> -->
        </div>
    </div>
</template>


<style src="@/modules/main/styles/modules/layouts/FormProjectsLayout.css"></style>