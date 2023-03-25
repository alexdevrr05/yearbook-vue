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
  max-width: 1200px;
  margin: 0 auto;
  background-color: #232935;
  ;
}
</style>
