
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
                    <p class="sign-in-text">Sign in</p>
                </div>
                <div class="google-button-container">
                    <v-btn color="indigo-accent-2" rounded="lg" class="btn-google">Sign in with Google</v-btn>
                    <button class="btn-logo bg-orange"></button>
                </div>

                <!-- form -->
                <div class="form-container">
                    <form method="post">
                        <label>email address</label>
                        <input class="email-input" type="text" placeholder="alex@gmail.com">
                        <div class="password-container">
                            <label>password</label>
                            <p>fogot password?</p>
                        </div>
                        <input class="password-input" type="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;">


                        <v-btn color="black" rounded="lg" class="btn-sign-in" size="large">Sign in</v-btn>
                    </form>
                </div>
            </main>
        </div>
    </div>
</template>

<script>

</script>

<style src="@/modules/main/styles/components/login.card.css"></style>