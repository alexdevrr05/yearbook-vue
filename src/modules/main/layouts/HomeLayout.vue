<template>
    <div class="container">
        <header-component />
        <router-view />
    </div>
</template>
  
<script>

import { defineAsyncComponent } from 'vue';

export default {
    components: {
        HeaderComponent: defineAsyncComponent(() => import(/* webpackChunkName: "Header" */ '@/modules/main/components/Header'))
    }
}

</script>

<style scoped>
.container {
    padding-top: 2.5rem;
}
</style>
  