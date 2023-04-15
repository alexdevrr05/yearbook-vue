
<template>
    <div class="card-login">
        <div class="card-login-container">
            <div class="header">
                <div class="logo-container">
                    <span class="logo text-header">alex</span><span class="text-header text-orange">.</span>
                </div>
                <div class="sign-or-login-container">
                    <span>No account?</span>
                    <router-link :to="{ name: 'home' }" class="sign-or-login">Sign up</router-link>
                </div>
            </div>

            <main class="content">
                <div class="title-container">
                    <p v-if="isLoginOption" class="sign-in-text">Login</p>
                    <p v-else class="sign-in-text">Sign in</p>
                </div>
                <div class="google-button-container">
                    <v-btn color="indigo-accent-2" rounded="lg" class="btn-google">Sign in with Google</v-btn>
                    <button class="btn-logo bg-orange"></button>
                </div>

                <!-- TODO: form login -->
                <div class="form-container">
                    <form v-if="isLoginOption" method="post" @submit.prevent="onSubmitLogin">
                        <label>email address</label>
                        <input class="input" id="email" :error="!isEmailValid && 'Invalid email address'" type="email"
                            name="email" placeholder="vue@gmail.com" v-model="loginEmail">
                        <div class="password-container">
                            <label>password</label>
                            <p>fogot password?</p>
                        </div>
                        <input class="input" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            v-model="loginPassword">

                        <v-btn @click="onSubmitLogin" :disabled="!loginIsFormValid" color="black" rounded="lg"
                            class="btn-sign-in" size="large">Send</v-btn>
                    </form>

                    <!-- TODO: form sign in -->
                    <form v-else method="post" @submit.prevent="onSubmitRegister">
                        <label>username</label>
                        <input class="input" id="name" type="name" name="name" placeholder="vue55vuex" v-model="name">

                        <label>email address</label>
                        <input class="input" id="email" :error="!isEmailValid && 'Invalid email address'" type="email"
                            name="email" placeholder="vue@gmail.com" v-model="email">
                        <div class="password-container">
                            <label>password</label>
                            <p>fogot password?</p>
                        </div>
                        <input class="input" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            v-model="password">


                        <v-btn @click="onSubmitRegister" :disabled="!isFormValid" color="black" rounded="lg"
                            class="btn-sign-in" size="large">Sign
                            in</v-btn>
                    </form>


                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import useRegisterForm from '@/modules/main/composables/useRegisterForm';
import useLoginForm from '@/modules/main/composables/useLoginForm';

export default {

    setup() {

        const { name, email, password, isEmailValid, isFormValid, register } = useRegisterForm();
        const { login, loginEmail, loginPassword, loginIsFormValid } = useLoginForm();
        const route = useRoute();

        const onSubmitRegister = () => {
            if (isFormValid.value) {
                register();
            }
        };

        const onSubmitLogin = () => {
            if (loginIsFormValid.value) {
                login();
            }
        };

        return {
            name,
            email,
            password,
            isEmailValid,
            isFormValid,
            onSubmitRegister,

            isLoginOption: computed(() => route.name === "login" ? true : false),

            loginEmail,
            loginPassword,
            loginIsFormValid,
            onSubmitLogin
        }
    }
}

</script>

<style src="@/modules/main/styles/components/login.card.css"></style>