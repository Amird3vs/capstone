<script>
import { signOutUser } from '../api/firebase.js'

export default {
    name: 'Sidebar',
    methods: {
        async handleLogout() {
            try {
                await signOutUser();
            } catch (error) {
                console.error('Error logging out:', error.message);
            }
        }
    }
}
</script>

<template>
    <div class="Side-bar">
        <div class="Box-logo">SalinSenyas</div>
        <div class="Box-menu">
            <ul class="ul-menu">
                <router-link to="/Profile" class="li-mneu" exact-active-class="Active-menu">
                    <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"
                        width="512" height="512">
                        <path
                            d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z" />
                        <path
                            d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z" />
                        <path
                            d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z" />
                        <path
                            d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z" />
                    </svg>
                    <div class="title-menu">Profile</div>
                </router-link>

                <router-link to="/Calls" class="li-mneu" exact-active-class="Active-menu">
                    <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                        viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M22.5,21H5.5A2.5,2.5,0,0,1,3,18.5V1.5a1.5,1.5,0,0,0-3,0v17A5.506,5.506,0,0,0,5.5,24h17a1.5,1.5,0,0,0,0-3Z" />
                        <path d="M9.5,9A1.5,1.5,0,0,0,8,10.5v7a1.5,1.5,0,0,0,3,0v-7A1.5,1.5,0,0,0,9.5,9Z" />
                        <path d="M14,13.5v4a1.5,1.5,0,0,0,3,0v-4a1.5,1.5,0,0,0-3,0Z" />
                        <path d="M20,9.5v8a1.5,1.5,0,0,0,3,0v-8a1.5,1.5,0,0,0-3,0Z" />
                        <path
                            d="M6,7.5a1.487,1.487,0,0,0,.936-.329L9.214,5.35a2.392,2.392,0,0,1,3.191.176,5.43,5.43,0,0,0,7.3.3l3.764-3.185A1.5,1.5,0,1,0,21.531.355L17.768,3.54A2.411,2.411,0,0,1,14.526,3.4a5.389,5.389,0,0,0-7.186-.4L5.063,4.829A1.5,1.5,0,0,0,6,7.5Z" />
                    </svg>
                    <div class="title-menu">Calls</div>
                </router-link>

                <li class="li-mneu logout" @click="handleLogout">
                    <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                        viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M11.476,15a1,1,0,0,0-1,1v3a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7.476a3,3,0,0,1,3,3V8a1,1,0,0,0,2,0V5a5.006,5.006,0,0,0-5-5H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7.476a5.006,5.006,0,0,0,5-5V16A1,1,0,0,0,11.476,15Z" />
                        <path
                            d="M22.867,9.879L18.281,5.293a1,1,0,1,0-1.414,1.414L21.13,10.97,6,11a1,1,0,0,0,0,2H6l15.188-.03-4.323,4.323a1,1,0,1,0,1.414,1.414l4.586-4.586A3,3,0,0,0,22.867,9.879Z" />
                    </svg>
                    <div class="title-menu">Logout</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.Side-bar {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: #3C5448;
}

.Box-logo {
    color: white;
    font-size: 1.8em;
    margin: 20px 50px;
    width: 118px;
    font-weight: bold;
}

.li-mneu {
    display: flex;
    padding: 14px 24px;
    margin-bottom: 6px;
    cursor: pointer;
    position: relative;
    width: 15%;
    animation-name: li-Menu;
    text-decoration: none;
}

.Active-menu {
    background: linear-gradient(92deg, rgb(151, 175, 163) -229%, transparent 94%);
    border-left: 4px solid rgb(151, 175, 163)
}

.icon-menu {
    width: 17px;
    height: 17px;
    fill: white;
    margin-right: 16px;
    animation-name: Icon-Menu;
}

div.title-menu {
    color: white;
    font-size: 14px;
    animation-name: Font-Menu;
}

.logout {
    margin-top: 400px;
}

.info-user-animation {
    animation: InfoUser 1.8s ease forwards;
}

.li-mneu {
    animation: li-Menu 1.8s ease forwards;
}

@media screen and (max-width: 1280px) {
    .Box-logo {
        font-size: 1.5em;
    }
}

@media screen and (max-width: 1080px) {
    .Box-logo {
        margin: 20px 30px;
    }
}

@media screen and (max-width: 980px) {
    .Box-logo {
        margin: 20px 50px;
    }
}

@media screen and (max-width: 768px) {
    .Box-logo {
        font-size: 1.3em;
        margin: 20px 50px;
    }

    .li-mneu {
        width: 20%;
    }

    div.title-menu {
        font-size: 10px;
    }

    .icon-menu {
        width: 15px;
        height: 15px;
    }
}
</style>