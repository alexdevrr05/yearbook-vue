<script>
import { defineAsyncComponent, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import useAgradecimientos from '../composables/agradecimientos/useAgradecimientos';


export default {
    components: {
        HeaderComponent: defineAsyncComponent(() => import(/* webpackChunkName: "Header" */ '@/modules/main/components/Header')),
        ContentCards: defineAsyncComponent(() => import(/* webpackChunkName: "ContentCardsLayout" */ './ContentCardsLayout'))
    },

    setup() {
        const store = useStore();
        const router = useRouter();
        const agradecimientosData = useAgradecimientos();
        const { agradecimientos, foundsQty } = agradecimientosData;

        onMounted(() => {
            if (store.state.main.userSession) {
                store.dispatch("main/loadUserSession")
                store.dispatch("main/loadUsers")
            }
        });

        watch(
            () => store.state.main.userSession,
            (newSession) => {
                if (newSession) {
                    store.state.main.userSession = newSession;
                } else {
                    router.push('/login');
                }
            }
        )

        return {
            users: computed(() => store.getters['main/getUsers']),
            agradecimientos,
            foundsQty,
        }
    }
}

</script>

<template>
    <div class="container">
        <router-view />
        <header-component />
        <content-cards :agradecimientos="agradecimientos" :foundsQty="foundsQty" />

    </div>
</template>
  
<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2.5rem;
}
</style>
  