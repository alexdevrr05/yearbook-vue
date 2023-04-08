<template>
    <div class="container">
        <div v-for="user in users" :key="user.uid">
            {{ user }}
        </div>
        <router-view />
        <header-component />
        <content-cards />

    </div>
</template>
  
<script>
import { defineAsyncComponent, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        HeaderComponent: defineAsyncComponent(() => import(/* webpackChunkName: "Header" */ '@/modules/main/components/Header')),
        ContentCards: defineAsyncComponent(() => import(/* webpackChunkName: "ContentCardsLayout" */ './ContentCardsLayout'))
    },


    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch("loadUsers")
        });

        return {
            users: store.state['users'],
        }
    }
}

</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2.5rem;
}
</style>
  