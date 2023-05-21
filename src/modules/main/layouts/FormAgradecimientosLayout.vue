<script setup>
import { ref, computed, createApp } from 'vue';
import { useStore } from 'vuex';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { postAgradecimientos } from '../services/agradecimientos';
import useAgradecimientos from '../composables/agradecimientos/useAgradecimientos';

const store = useStore();

const originalPlaceholder = ref('Reconoce y honra el esfuerzo de los demás...');
const txtPlaceholder = ref(originalPlaceholder.value);
const agradecimientoTextarea = ref('Felicidades por haber terminado este semestre');
const msgError = ref();
const msgSuccess = ref();
const isActiveModal = ref(false);
const currentUserSession = ref(computed(() => store.getters[['main/getUserSession']]));

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
        agradecimientoTextarea.value = '';
        txtPlaceholder.value = originalPlaceholder.value;
        msgSuccess.value = null;
        msgError.value = null;
        isActiveModal.value = false;
    }
}

app.use(VueSweetalert2);

const showAlert = () => {
    app.config.globalProperties.$swal({
        title: 'Gracias por tu gratitud!',
        text: msgSuccess.value,
        icon: 'success',
    });
};

const handleSubmitForm = async (text) => {
    msgSuccess.value = null;

    if (text.length === 0) {
        msgError.value = 'Vamos! No seas malagradecido...';
        return
    }

    if (text.length > 10) {
        const userName = currentUserSession.value.nombre;
        const userImage = currentUserSession.value.image;
        const userEmail = currentUserSession.value.email;

        try {
            const response = await postAgradecimientos(userName, text, userImage, userEmail);
            if (response.status === 200) {
                msgSuccess.value = response.msg;
                msgError.value = null;
                agradecimientoTextarea.value = '';
                txtPlaceholder.value = originalPlaceholder.value;
                const { agradecimientos, foundsAllsQty, currentPageQty } = useAgradecimientos(store);

                store.commit('main/setAgradecimientos', agradecimientos);
                store.commit('main/setAllFoundsAcknowledgmentsQty', foundsAllsQty);
                store.commit('main/setCurrentPageAcknowledgmentsQty', currentPageQty);
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

</script>

<template>
    <div class="section">
        <div class="container-form">
            <!-- form -->
            <h1 class="motivation">Expresa tu gratitud</h1>
            <p class="motivation">Felicidades por haber terminado este semestre, es un logro que merece ser reconocido y
                celebrado</p>

            <form action="post" class="form-container">
                <textarea @keyup="getText($event)" :class="msgError ? 'border-red' : ''" class="ui-textarea"
                    :placeholder="txtPlaceholder" @focus="onFocus" v-model="agradecimientoTextarea"
                    @blur="removeFocus"></textarea>
                <p class="msgError" v-if="msgError">{{ msgError }}</p>

                <div class="container-button">
                    <v-btn block class="transparent-btn" :disabled="agradecimientoTextarea.length <= 10"
                        @click="handleSubmitForm(agradecimientoTextarea)">enviar</v-btn>
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


<style scoped>
.section {
    color: white;
    margin-bottom: 5rem;
    display: flex;
    align-items: center;

}

.container-ilustration {
    flex: 1;
    background-color: #12151b;
}

h1 {
    font-size: 2.5rem;
}


.form-container {
    display: flex;

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
    color: #D1D1D1;
}

.ui-textarea:focus {
    outline: none;
    box-shadow: 0px 0px 8px #554177;
}

.container-button {
    width: 120px;
}

.transparent-btn {
    background-color: transparent;
    border: 1px solid #673AB7;
    margin-top: 1rem;
    color: white;
    animation: all 300ms;
    border-radius: 5px;
}

.transparent-btn:hover {
    background-color: #4CAF50;
    border: 1px solid #4CAF50;
}

.border-red {
    border: 1px solid rgb(198, 52, 52);
}

.msgError {
    color: rgb(198, 52, 52);
}


.container-form {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
}

@media (min-width: 768px) {
    .container-form {
        display: flex;
        justify-content: center;
        padding: unset;
    }

    .ui-textarea {
        width: 70%;
        height: 50px;
    }

}
</style>