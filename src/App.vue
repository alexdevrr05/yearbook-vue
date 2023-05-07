<template>
  <div class="container">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/modules/shared/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },

  setup() {

  }
}

</script>


<style scoped>
.container {
  background-color: #1d222b;
  ;
}
</style>
