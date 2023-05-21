<script setup>
import { onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import UploadImage from "@/modules/main/components/UploadImage.vue";

const store = useStore();
const router = useRouter();

onMounted(() => {
    if (store.state.main.userSession) {
        store.dispatch('main/loadUserSession')
    }
})

watch(
    () => store.state.main.userSession,
    (newSession) => {
        if (newSession) {
            store.state.main.userSession = newSession;
        } else {
            router.push('/login');
        }
    }
);

</script>

<template>
    <div class="container">
        <h2 class="title text-white text-center">Editar perfil</h2>
        <upload-image />
    </div>
</template>

<style scoped>
.container {
    margin-top: 4rem;
}
</style>