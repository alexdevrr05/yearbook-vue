<template>
    <div class="container-header">
        <header class="header-imagen">
        </header>
        <login-card />
        <div v-if="msgError">
            {{ showAlert() }}
        </div>
    </div>
</template>

<script>
import { createApp, computed, watch } from 'vue';
import { useStore } from 'vuex';
import LoginCard from '@/modules/main/components/LoginCard';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    components: {
        LoginCard,
    },

    setup() {
        const app = createApp({});
        const store = useStore();
        const msgError = computed(() => store.state.main.errorsInLogin);

        watch(
            () => store.state.main.errorsInLogin,
            (newErrors) => {
                store.state.main.errorsInLogin = newErrors
            }
        )

        app.use(VueSweetalert2);

        const showAlert = () => {
            app.config.globalProperties.$swal({
                title: 'Autenticación',
                text: msgError.value,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        };

        return {
            msgError,
            showAlert,
        }

    }
}


</script>

<style scoped>
.container-header {
    width: 100%;
}

.header-imagen {
    height: 100vh;
    background-image: url('@/assets/background-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    /*background-position: 50%;*/
}

@media (max-width: 463px) {
    .header-imagen {
        background-position: 20%;
    }
}
</style>