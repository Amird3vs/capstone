<script>
import { signInWithGoogle, signInWithFacebook, signInWithTwitter, handleSuccessfulLogin } from '../api/firebase.js';
import { useRouter } from 'vue-router';

export default {
    name: 'Signin',
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.$router.push({ name: 'Profile' });
        }
    },
    methods: {
        signInWithGoogle() {
            const router = useRouter();
            signInWithGoogle()
                .then(user => handleSuccessfulLogin(user, router))
                .catch(error => {
                    console.error('Error logging in with Google:', error.message);
                });
        },
        signInWithFacebook() {
            const router = useRouter();
            signInWithFacebook()
                .then(user => handleSuccessfulLogin(user, router))
                .catch(error => {
                    console.error('Error logging in with Facebook:', error.message);
                });
        },
        signInWithTwitter() {
            const router = useRouter();
            signInWithTwitter()
                .then(user => handleSuccessfulLogin(user, router))
                .catch(error => {
                    console.error('Error logging in with Twitter:', error.message);
                });
        },
    },
};
</script>

<template>
    <div class="container-main">
        <div class="forms-container">
            <div class="signin">
                <div class="sign-in-form">
                    <h2 class="title">Sign in</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="Password" />
                    </div>
                    <input type="button" value="Login" class="btn solid" />
                    <p class="social-text">Or Sign in with social platforms</p>
                    <div class="social-media">
                        <button @click="signInWithFacebook" class="social-icon">
                            <i class="fa-brands fa-facebook-f"></i>
                        </button>
                        <button @click="signInWithTwitter" class="social-icon">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button @click="signInWithGoogle" class="social-icon">
                            <i class="fab fa-google"></i>
                        </button>
                    </div>
                    <div class="copyrigh-container">
                        <p class="copyright">&copy; 2024 SalinSenyas. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>New to our ChismiSign?</h3>
                    <p>
                        Discover a world of possibilities! Join us and explore a vibrant
                        community where ideas flouriesh and connections thrive.
                    </p>
                </div>
                <img src="../assets/img/sign-language.jpg" class="image" alt="" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('../assets/css/signIn-style.css');
</style>