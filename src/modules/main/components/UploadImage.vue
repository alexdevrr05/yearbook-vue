<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.getters['main/getUserSession']);
const file = ref(null);
const fileName = ref(null);

const handleFileInputChange = (event) => {
    file.value = event.target.files[0];
    fileName.value = file.value ? file.value.name : null;

    const idUser = user.value.uid;
    const rol = user.value.rol;

    store.dispatch('main/updateImageUser', {
        idUser,
        file,
        rol,
    });
}

const sortFileName = (fileName) => {
    if (fileName) {
        return fileName.length > 15 ? fileName.substring(0, 15) + '...' : fileName
    }
};

const isExternalUrl = (url) => url?.startsWith('https');

</script>
  

<template>
    <div class="profile-img">
        <div v-if="!user" class="">
            <h1>Loading...</h1>
        </div>
        <div v-else class="container-form-image">
            <div class="imagen-container">
                <img v-if="isExternalUrl(user?.image)" :src="user.image" :alt="user?.nombre + '-img'">
                <img v-else :src="'http://localhost:4000/' + user.image" :alt="user?.nombre + '-img'">
                <!-- <input type="file" ref="fileInputRef" @change="handleFileChange"> -->
                <div class="file-input">
                    <input type="file" ref="fileInput" @change="handleFileInputChange" class="file">
                    <label class="file-label">{{ sortFileName(fileName) || 'Cambiar imagen' }}</label>
                </div>
            </div>
        </div>
        <div class="text-white">
            <h2 class="text-center">{{ user?.nombre }}</h2>
            <h3 class="text-center">{{ user?.email }}</h3>
            <h3 class="text-center">{{ user?.rol }}</h3>
        </div>
    </div>
</template>
  
  
<style scoped src="@/modules/main/styles/components/upload.image.css"></style>
