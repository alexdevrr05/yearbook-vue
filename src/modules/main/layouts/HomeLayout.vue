<script>
import { defineAsyncComponent, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import useAgradecimientos from '../composables/agradecimientos/useAgradecimientos';


export default {
    components: {
        HeaderComponent: defineAsyncComponent(() => import(/* webpackChunkName: "Header" */ '@/modules/main/components/Header')),
        ContentCards: defineAsyncComponent(() => import(/* webpackChunkName: "ContentCardsLayout" */ './ContentCardsLayout')),
        FormLayout: defineAsyncComponent(() => import(/* webpackChunkName: "FormAgradecimientosLayout" */ './FormAgradecimientosLayout.vue')),
        ProjectsLayout: defineAsyncComponent(() => import(/* webpackChunkName: "ProjectsLayout" */ './ProjectsLayout.vue')),
        FormProjectsLayout: defineAsyncComponent(() => import(/* webpackChunkName: "FormProjectsLayout" */ './FormProjectsLayout.vue'))
    },

    setup() {
        const store = useStore();
        const router = useRouter();
        const { agradecimientos, foundsAllsQty, currentPageQty, currentPage, isLoading, nextPage, prevPage } = useAgradecimientos(store);

        onMounted(() => {
            if (store.state.main.userSession) {
                store.dispatch("main/loadUserSession")
                store.dispatch("main/loadUsers")
                store.commit('main/setAgradecimientos', agradecimientos);

                store.commit('main/setAllFoundsAcknowledgmentsQty', foundsAllsQty);
                store.commit('main/setCurrentPageAcknowledgmentsQty', currentPageQty);
                // store.commit('main/setCurrentNumberPage', currentPage);
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
        );

        return {
            users: computed(() => store.getters['main/getUsers']),
            agradecimientosState: computed(() => store.getters['main/getAgradecimientos']),
            foundsAllsQtyState: computed(() => store.getters['main/getAllFoundsAcknowledgmentsQty']),
            currentPageQty: computed(() => store.getters['main/getCurrentPageAcknowledgmentsQty']),
            currentPage: computed(() => store.getters['main/getCurrentNumberPage']),

            // currentPage,
            isLoading,
            nextPage,
            prevPage,
        }
    }
}

</script>

<template>
    <div class="container">
        <router-view />
        <header-component />
        <content-cards :foundsAllsQtyState="foundsAllsQtyState" :currentPageQty="currentPageQty" :currentPage="currentPage"
            :isLoading="isLoading" :prevPage="prevPage" :nextPage="nextPage" :agradecimientosState="agradecimientosState" />
        <form-layout />
        <projects-layout />
        <form-projects-layout />
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2.5rem;
}
</style>
  