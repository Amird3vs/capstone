<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'Calls',
    components: {
        Swal
    },
    data() {
        return {
            showModal: false,
            loading: false,
            showcallsCont: false,
            meetingCode: null,
            roomID: ''
        };
    },
    methods: {
        createCall() {
            this.loading = true;
            setTimeout(() => {
                axios.get('http://localhost:3000')
                    .then(response => {
                        const meetingCode = response.data;
                        this.loading = false;
                        Swal.fire({
                            icon: 'success',
                            title: 'Call created successfully',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            this.$router.push({ name: 'Join', params: { meetingCode } });
                            // window.open(`http://localhost:3000/${meetingCode}`, '_blank');
                        });
                    })
                    .catch(error => {
                        this.loading = false;
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to create call',
                            confirmButtonText: 'OK'
                        });
                        console.error('Error making request:', error);
                    });
            }, 1000);
        },
        joinRoom() {
            const roomIDPattern = /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/;
            const roomID = this.roomID.trim();

            if (!roomID || typeof roomID !== 'string' || !roomID.match(roomIDPattern)) {
                this.showModal = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Room ID',
                    text: 'The provided room ID is invalid. Please provide a valid room ID.',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                }).then(() => {
                    this.showModal = true;
                });
                return;
            }
            this.$router.push({ name: 'Join', params: { meetingCode: this.roomID } });
        },
    },
}
</script>

<template>
    <template v-if="user">
        <Sidebar />
        <Navigation />
        <div class="Pages">
            <div v-if="loading" class="overlay">
                <div class="darksoul-layout">
                    <div class="darksoul-grid">
                        <div class="item1"></div>
                        <div class="item2"></div>
                        <div class="item3"></div>
                        <div class="item4"></div>
                    </div>
                    <div class="darksoul-loader-h">Creating a call, please wait...</div>
                </div>
            </div>
            <div id="calls-section" class="calls-container hidden">
                <div class="head-title">
                    <h1 class="title-page">Join or Create a Call</h1>
                </div>
                <div class="page-content">
                    <div class="callsConts">
                        <div class="callsCont animate__animated animate__slideInUp">
                            <div class="header"></div>
                            <div class="callsContent">
                                <div class="contIcon">
                                    <img id="userProfilePicture" alt="User Profile Picture"
                                        src="../assets/img/make-call.jpg">
                                </div>
                                <div class="callInfo">
                                    <h3 class="callTitle">Start a call</h3>
                                    <p class="callDesc">To start the call, click the button below. Share the link with
                                        others to let them join.
                                    </p>
                                </div>
                                <button class="button" @click="createCall">
                                    <span class="label">Create call</span>
                                    <span class="arrow right-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                    <span class="arrow left-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div class="callsCont animate__animated animate__slideInRight">
                            <div class="header"></div>
                            <div class="callsContent">
                                <div class="contIcon">
                                    <img id="userProfilePicture" alt="User Profile Picture"
                                        src="../assets/img/join-call.jpg">
                                </div>
                                <div class="callInfo">
                                    <h3 class="callTitle">Join with a code</h3>
                                    <p class="callDesc">To join the call, enter the 9-character shared code, such as
                                        "AbC-123-xyz"
                                    </p>
                                </div>
                                <button class="button" @click="showModal = true">
                                    <span class="label">Join a call</span>
                                    <span class="arrow right-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                    <span class="arrow left-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SalinModal :showModal="showModal" @close="showModal = false">
            <template #header>
                <h3 class="modal-title">Join with a code</h3>
            </template>

            <template #body>
                <div class="input-container">
                    <input id="modal-input" v-model="roomID" type="text"
                        pattern="[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}" placeholder=" " required>
                    <label for="modal-input">Enter room code</label>
                </div>
            </template>

            <template #footer>
                <button class="modal-button" @click="joinRoom">Proceed</button>
            </template>
        </SalinModal>
    </template>
</template>

<style scoped>
@import url('../assets/css/call-style.css');
@import url('../assets/css/modal-style.css');
</style>

<script setup>
import Navigation from '../components/nav.vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
import Sidebar from '../components/sidebar.vue'
import SalinModal from '../components/customModal.vue';
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.state.user)
const router = useRouter()


if (!user.value) {
    showSignInAlert()
}

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
</script>