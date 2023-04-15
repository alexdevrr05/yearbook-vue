<template>
  <div id="navbar">
    <div class="navbar-container d-flex w-100 align-center">
      <div class="navbar-logo flex-1">
        <h3>alex<span style="color: #FA983F;">.</span></h3>
      </div>

      <!-- logo and routes -->
      <div class="flex-3">
        <custom-link v-for="link of links" :key="link.to" :link="link" />
      </div>

      <!-- search and login -->
      <div class="d-flex text-white gap-1 align-center">
        <input type="search" placeholder="Search" class="search">
        <div class="example"></div>
        <v-btn block rounded="xl" size="small" class="button min-w-u p-1" color="deep-purple">Login</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    CustomLink: defineAsyncComponent(() => import('./CustomLink')),
  },

  data() {
    return {
      links: [
        { to: 'home', name: 'Home' },
        { to: 'login', name: 'Login' },
        // { to: 'pokemon-id', name: 'By id', id: 151 },
        // { to: 'https://google.com', name: 'Google' },
      ],
    };
  },
};
</script>

<style scoped> .gap-1 {
   gap: .5rem;
 }

 .p-1 {
   padding: 1rem;
 }

 .flex-1 {
   flex: 1;
 }

 .flex-3 {
   flex: 3;
 }

 .min-w-u {
   min-width: unset !important;
 }

 .search {
   border-radius: 30px;
   border: 1px solid white;
   padding: 2px 1rem;
   color: gray;
 }

 .search::placeholder {
   color: white;
 }

 .example {
   width: .5px;
   height: 10px;
   background-color: white;
   opacity: .5;
 }

 #navbar {
   position: fixed;
   width: 100vw;
   left: 0;
   top: 0;
   z-index: 1;
   background: rgba(36, 45, 53, 0.25);
   backdrop-filter: blur(4px);
   -webkit-backdrop-filter: blur(4px);
 }

 .navbar-container {
   padding: .5rem 1rem;
   max-width: 1200px;
   margin: 0 auto;
 }

 @media (min-width: 1280px) {
   .navbar-container {
     padding: .5rem 0;
   }
 }

 .navbar-logo {
   color: white;
 }
</style>
