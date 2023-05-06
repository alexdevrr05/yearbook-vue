<template>
  <div class="container">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import { onMounted, watch } from 'vue';
import { useStore } from 'vuex';

import router from './router';
import Navbar from '@/modules/shared/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },

  setup() {
    const store = useStore();

    const setUserSession = (credentials) => {
      store.state.main.userSession.token = credentials;
    }

    // onMounted(() => {
    //   if (!localStorage.getItem('token')) {
    //     router.push({ name: "login" });
    //   } else {
    //     setUserSession(localStorage.getItem('token'));
    //   }
    // });


    watch(
      () => store.state.main.userSession.token,
      (newToken) => {
        if (newToken) {
          store.state.main.userSession.token = newToken;
        } else {
          window.location.reload();
          router.push({ name: "login" });
        }
      }
    )

  }
}

</script>


<style scoped>
.container {
  background-color: #1d222b;
  ;
}
</style>
