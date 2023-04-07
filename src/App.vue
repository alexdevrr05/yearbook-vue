<template>
  <div class="container">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'App',
  components: {
    Navbar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */ '@/modules/shared/components/Navbar'))
  }
}

</script>


<style scoped>
.container {
  background-color: #1d222b;
  ;
}
</style>
