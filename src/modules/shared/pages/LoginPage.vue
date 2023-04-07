<template>
    <div class="container-header">
        <header class="header-imagen">
        </header>
        <login-card />
    </div>
</template>

<script setup>
import LoginCard from '@/modules/main/components/LoginCard';

</script>

<style scoped>
.container-header {
    width: 100%;
}

.header-imagen {
    height: 100vh;
    background-image: url('@/assets/background-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    /*background-position: 50%;*/
}

@media (max-width: 463px) {
    .header-imagen {
        background-position: 20%;
    }
}
</style>