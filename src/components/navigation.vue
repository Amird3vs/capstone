<script>
export default {
    name: 'Navigation',
    mounted() {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(navLink => {
            navLink.addEventListener('mouseenter', () => {
                document.querySelector('.nav').classList.add('hovered');
                overlay.style.display = 'block';
            });
            navLink.addEventListener('mouseleave', () => {
                document.querySelector('.nav').classList.remove('hovered');
                overlay.style.display = 'none';
            });
        });
    }
}
</script>

<template>
    <nav class="nav animate__animated animate__bounceInLeft" id="nav">
        <div class="logo-container" id="logo-container">
            <img class="logo" src="../assets/img/logo.png">
            <router-link to="/" class="grpnme">
                SalinSenyas
            </router-link>
        </div>

        <router-link to="/" class="nav__link" exact-active-class="active">
            <i class="material-symbols-outlined nav__icon">sign_language</i>
            <span class="nav__text"></span>
            <div class="tooltip">
                <div class="tooltip-header">
                    <strong>Sign-to-Text translation</strong>
                </div>
                <div class="tooltip-description">
                    <p>Recognizes sign languages and converts them into readable texts.</p>
                </div>
            </div>
        </router-link>

        <router-link to="/Signin" target="_blank" class="nav__link" exact-active-class="active">
            <i class="material-symbols-outlined nav__icon">video_chat</i>
            <span class="nav__text"></span>
            <div class="tooltip">
                <div class="tooltip-header">
                    <strong>ChismiSign</strong>
                </div>
                <div class="tooltip-description">
                    <p>Translates inputted text into its corresponding sign language.</p>
                </div>
            </div>
        </router-link>

        <router-link to="/letterIndex" class="nav__link" exact-active-class="active">
            <i class="material-symbols-outlined nav__icon">font_download</i>
            <span class="nav__text"></span>
            <div class="tooltip">
                <div class="tooltip-header">
                    <strong>Letter Index</strong>
                </div>
                <div class="tooltip-description">
                    <p>An incremental index of the sign language alphabet.</p>
                </div>
            </div>
        </router-link>
    </nav>
    <div id="overlay"></div>
</template>

<style scoped>
@import url('../assets/css/navigation-style.css');

#overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    z-index: 1;
}
</style>