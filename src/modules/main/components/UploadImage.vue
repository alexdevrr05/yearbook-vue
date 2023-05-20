<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.getters['main/getUserSession']);
const file = ref(null);
const fileName = ref(null);

const handleFileInputChange = (event) => {
    // fileInputRef.value = event.target.files[0];
    file.value = event.target.files[0];
    fileName.value = file.value ? file.value.name : null;
}

const sortFileName = (fileName) => {
    if (fileName) {
        return fileName.length > 15 ? fileName.substring(0, 15) + '...' : fileName
    }
};

</script>
  

<template>
    <div class="profile-img">
        <div class="container-form-image">
            <div class="imagen-container">
                <img :src="user.image" :alt="user.nombre + '-img'">
                <!-- <input type="file" ref="fileInputRef" @change="handleFileChange"> -->
                <div class="file-input">
                    <input type="file" ref="fileInput" @change="handleFileInputChange" class="file">
                    <label class="file-label">{{ sortFileName(fileName) || 'Seleccionar archivo' }}</label>
                </div>

                <h1>{{ user.nombre }}</h1>
            </div>
        </div>
    </div>
</template>
  
  
<style scoped src="@/modules/main/styles/components/upload.image.css"></style>
