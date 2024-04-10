<script>
export default {
    name: 'Profile'
};
</script>

<template>
    <template v-if="user">
        <Sidebar />
        <Navigation />
        <div class="Pages">
            <div class="Profile-section">
                <div class="head-title">
                    <h1 class="title-page">My profile</h1>
                </div>
                <div class="page-content">

                    <div class="container">
                        <div class="profile-container animate__animated animate__zoomIn">
                            <div class="header"></div>
                            <div class="profile-content">
                                <div class="profile-image">
                                    <img id="userProfilePicture" alt="User Profile Picture"
                                        :src="user.photoURL ? user.photoURL : 'https://placekitten.com/150/150'">
                                </div>
                                <div class="user-details">
                                    <h3 class="userName">{{ user.displayName }}</h3>
                                    <p class="userEmail">{{ user.email }}</p>
                                    <div class="tags">
                                        <span v-if="user && user.providerData && user.providerData.length > 0"
                                            class="tag design">
                                            {{ user.providerData[0].providerId }}
                                        </span>
                                        <span class="tag developer">{{ user.emailVerified }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accDetails-container animate__animated animate__slideInUp">
                            <h4 class="accDetailsHead">Account Details:</h4>
                            <div class="accDetails-content">
                                <div class="accDetails">
                                    <div class="accDetails-title">User UID: </div>
                                    <div class="accDetails-status">{{ user.uid }}</div>
                                </div>
                                <div class="accDetails">
                                    <div class="accDetails-title">Account Creation Time: </div>
                                    <div class="accDetails-status"
                                        v-if="user && user.metadata && user.metadata.creationTime">
                                        {{ user.metadata.creationTime }}
                                    </div>
                                    <div class="accDetails-status" v-else>
                                        {{ user && user.createdAt ? formatDate(user.createdAt) : 'Unknown' }}
                                    </div>
                                </div>
                                <div class="accDetails">
                                    <div class="accDetails-title">Last Sign-in Time: </div>
                                    <div class="accDetails-status"
                                        v-if="user && user.metadata && user.metadata.lastSignInTime">
                                        {{ user.metadata.lastSignInTime }}
                                    </div>
                                    <div class="accDetails-status" v-else>
                                        {{ user && user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Unknown' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container2">
                        <div class="additional-container animate__animated animate__slideInRight">
                            <h2 class="additional-title">About <span class="additional">ChismiSign</span></h2>
                            <p class="additional-text">Explore ChismiSign for innovative and connected chats. Join us in
                                blending technology and human touch for seamless communication, elevating virtual
                                conversations with vibrant sign language!
                            </p>
                        </div>
                        <div class="event animate__animated animate__zoomIn">
                            <div class="event-content">
                                <img src="../assets/img/video-call-banner.png" alt="Concert Maneskin"
                                    class="event-banner" />
                                <div class="info-event">
                                    <h2 class="title-event">ChismiSign</h2>
                                    <div class="location-event">No gesture goes unnoticed.</div>
                                </div>
                            </div>

                            <div class="features-container">
                                <h2 class="features-title">Special Features</h2>

                                <div class="feature">
                                    <div class="icon-container">
                                        <i class="icons fas fa-link"></i>
                                    </div>
                                    <div class="text-content">
                                        <h3 class="featureHead">Invite With a Link</h3>
                                        <p class="featureDesc">Start a video call with anyone just by sending a link.
                                        </p>
                                    </div>
                                </div>

                                <div class="feature">
                                    <div class="icon-container">
                                        <i class="icons fas fa-user-secret"></i>
                                    </div>
                                    <div class="text-content">
                                        <h3 class="featureHead">Join Without an Account</h3>
                                        <p class="featureDesc">There is nothing to download or install.</p>
                                    </div>
                                </div>

                                <div class="feature">
                                    <div class="icon-container">
                                        <i class=" icons fas fa-laptop"></i>
                                    </div>
                                    <div class="text-content">
                                        <h3 class="featureHead">Use Any Device</h3>
                                        <p class="featureDesc">Anyone can join from their computer, phone, or tablet.
                                        </p>
                                    </div>
                                </div>

                                <router-link to="/Calls" class="get-event">Try ChismiSign now!</router-link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div>Loading or user not available</div>
    </template>
</template>

<style scoped>
@import url('../assets/css/Profile-style.css');
</style>

<script setup>
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
import Sidebar from '../components/sidebar.vue'
import Navigation from '../components/nav.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.state.user)
const router = useRouter()

onMounted(() => {
    if (!user.value) {
        showSignInAlert()
    }
})

function showSignInAlert() {
    Swal.fire({
        title: 'Please Sign In',
        text: 'To view your profile, please sign in.',
        icon: 'warning',
        confirmButtonText: 'Sign In',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            router.push({ name: 'Signin' });
        }
    });
}

const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(parseInt(timestamp));
    return date.toUTCString();
};
</script>