<script>
import { defineAsyncComponent, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import useAgradecimientos from '../composables/agradecimientos/useAgradecimientos';
import useProjects from '../composables/projects/useProjects';


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
        const { agradecimientos, foundsAllsQty, currentPageQty, isLoading, nextPage, prevPage } = useAgradecimientos(store);
        const { isLoadingProjects, foundsAllsQtyProjects, currentPageQtyProjects, prevPageProjects, nextPageProjects } = useProjects(store);

        onMounted(() => {
            if (store.state.main.userSession) {
                store.dispatch("main/loadUserSession")
                store.dispatch("main/loadUsers")
                store.commit('main/setAgradecimientos', agradecimientos);

                store.commit('main/setAllFoundsAcknowledgmentsQty', foundsAllsQty);
                store.commit('main/setCurrentPageAcknowledgmentsQty', currentPageQty);
                // store.commit('main/setCurrentNumberPage', currentPage);

                store.commit('main/setAllFoundsProjectsQty', foundsAllsQtyProjects);
                store.commit('main/setCurrentPageProjectsQty', currentPageQtyProjects);
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

            foundsAllsQtyProjects: computed(() => store.getters['main/getAllFoundsProjectsQty']),
            currentPageQtyProjects: computed(() => store.getters['main/getCurrentPageProjectsQty']),
            currentPageProject: computed(() => store.getters['main/getCurrentNumberPageProjects']),

            // currentPage,
            isLoading,
            isLoadingProjects,


            prevPageProjects,
            nextPageProjects,
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
        <projects-layout :isLoading="isLoadingProjects" :prevPage="prevPageProjects" :nextPage="nextPageProjects"
            :foundsAllsQtyState="foundsAllsQtyProjects" :currentPageQty="currentPageQtyProjects"
            :currentPage="currentPageProject" />
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
  