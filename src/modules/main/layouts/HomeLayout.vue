<template>
    <div class="container">
        <router-view />
        <header-component />
        <content-cards />
    </div>
</template>
  
<script>

import { defineAsyncComponent } from 'vue';

export default {
    components: {
        HeaderComponent: defineAsyncComponent(() => import(/* webpackChunkName: "Header" */ '@/modules/main/components/Header')),
        ContentCards: defineAsyncComponent(() => import(/* webpackChunkName: "ContentCardsLayout" */ './ContentCardsLayout'))
    }
}

</script>

<style scoped>
.container {
    padding-top: 2.5rem;
}
</style>
  