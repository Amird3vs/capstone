<script>
import Swal from 'sweetalert2';

export default {
    name: 'Join',
    data() {
        return {
            audioEnabled: true,
            videoEnabled: true,
            videoStream: null,
            selectedJoinAs: '',
            videoDevices: [],
            audioDevices: [],
            selectedVideoDeviceId: null,
            meetingCode: '',
            user: null,
            animateDropdown: false
        };
    },
    computed: {
        audioStatus() {
            return this.audioEnabled ? 'Mute' : 'Unmute';
        },
        videoStatus() {
            return this.videoEnabled ? 'Stop Video' : 'Start Video';
        }
    },
    methods: {
        async toggleAudio() {
            this.audioEnabled = !this.audioEnabled;
        },
        async toggleVideo() {
            this.videoEnabled = !this.videoEnabled;
            if (this.videoEnabled) {
                await this.startVideo();
            } else {
                this.stopVideo();
            }
        },
        async copyLink() {
            const linkContainer = document.getElementById('share-link-input');
            if (!linkContainer) {
                console.error('Element with ID "share-link-input" not found.');
                return;
            }
            const link = linkContainer.querySelector('p:nth-of-type(2)').textContent;
            try {
                await navigator.clipboard.writeText(link);
                this.showAlert('success', 'Link Copied!', 'The link has been copied to your clipboard.');
            } catch (error) {
                console.error('Failed to copy link:', error);
                this.showAlert('error', 'Error!', 'Failed to copy the link. Please try again.');
            }
        },
        showAlert(icon, title, text) {
            Swal.fire({
                icon: icon,
                title: title,
                text: text,
                timer: 2000,
                showConfirmButton: false
            });
        },
        stopVideo() {
            if (this.videoStream) {
                this.videoStream.getTracks().forEach(track => track.stop());
                this.$refs.videoElement.srcObject = null;
                this.videoStream = null;
            }
        },
        redirectToMeeting() {
            const meetingLink = document.querySelector('.linkp3').textContent;
            const displayName = document.querySelector('.meeting-input').value;
            const selectedJoinAs = this.selectedJoinAs;
            const updatedMeetingLink = `${meetingLink}?displayName=${encodeURIComponent(displayName)}&joinAs=${encodeURIComponent(selectedJoinAs)}`;
            window.location.href = updatedMeetingLink;
        },
        async changeCamera() {
            await this.stopVideo();
            await this.startVideo();
        },
        async initializeMediaDevices() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                const devices = await navigator.mediaDevices.enumerateDevices();

                this.videoDevices = devices.filter(device => device.kind === 'videoinput');
                this.audioDevices = devices.filter(device => device.kind === 'audioinput');

                stream.getTracks().forEach(track => track.stop());

                if (this.videoDevices.length > 0) {
                    this.selectedVideoDeviceId = this.videoDevices[0].deviceId;
                }
            } catch (error) {
                console.error('Error enumerating media devices:', error);
                this.showAlert('error', 'Error!', 'Failed to enumerate media devices. Please check your camera and microphone settings.');
            }
        },
        async startVideo() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: this.selectedVideoDeviceId } });
                this.$refs.videoElement.srcObject = stream;
                this.videoStream = stream;
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        },
        handleJoinClick() {
            if (!this.selectedJoinAs) {
                Swal.fire({
                    title: 'Choose an option',
                    text: 'Please select a mode before joining.',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    const joinSelect = this.$refs.joinSelect;
                    joinSelect.classList.add('animate-dropdown');

                    setTimeout(() => {
                        joinSelect.classList.remove('animate-dropdown');
                    }, 3000);
                });

                const joinSelect = this.$refs.joinSelect;
                joinSelect.focus();
            } else {
                this.redirectToMeeting();
            }
        }
    },
    beforeDestroy() {
        this.stopVideo();
    },
    mounted() {
        this.initializeMediaDevices();
        this.startVideo();
        this.meetingCode = this.$route.params.meetingCode;
    },
    watch: {
        '$route.params.meetingCode'(newValue) {
            this.meetingCode = newValue;
        }
    }
};
</script>

<template>
    <div class="container" v-if="user">
        <div class="chismisign animate__animated animate__slideInDown">
            <div class="logo-cont">
                <img class="logo" src="../assets/img/ChismiSign-logo-white.png">
                <h1>ChismiSign</h1>
            </div>
            <div class="account-d">
                <div class="email-prov">
                    <p class="email">{{ user.email }}</p>
                    <p class="provider">{{ user.providerData[0].providerId }}</p>
                </div>
                <img class="profile-photo" :src="user.photoURL ? user.photoURL : 'https://placekitten.com/150/150'"
                    alt="User Profile Picture">
            </div>
        </div>

        <div class="content-container">

            <div class="video-feed animate__animated animate__zoomInDown">
                <h3 class="feed-title">Set up your camera and microphone</h3>
                <div v-if="videoEnabled" class="video-container">
                    <video ref="videoElement" autoplay></video>
                </div>
                <div v-else class="overlay">
                    <P>Camera is off</P>
                </div>

                <div class="controls">
                    <button @click="toggleAudio" class="material-button smaller-font"
                        :class="{ 'active': audioEnabled, 'inactive': !audioEnabled }">
                        <span class="material-symbols-outlined custom-material-icon">{{ audioEnabled ? 'mic' : 'mic_off'
                            }}</span>
                    </button>
                    <button @click="toggleVideo" class="material-button smaller-font"
                        :class="{ 'active': videoEnabled, 'inactive': !videoEnabled }">
                        <span class="material-symbols-outlined custom-material-icon">{{ videoEnabled ? 'videocam' :
                            'videocam_off' }}</span>
                    </button>
                </div>

                <div class="device-selection-container">
                    <div class="device-selection camera-selection">
                        <span class="material-symbols-outlined icon-devices">videocam</span>
                        <select id="cameraSelect" @change="changeCamera" class="device-dropdown">
                            <option v-for="device in videoDevices" :key="device.deviceId" :value="device.deviceId">{{
                                device.label }}</option>
                        </select>
                    </div>

                    <div class="device-selection microphone-selection">
                        <span class="material-symbols-outlined icon-devices">mic</span>
                        <select id="microphoneSelect" @change="changeMicrophone" class="device-dropdown">
                            <option v-for="device in audioDevices" :key="device.deviceId" :value="device.deviceId">{{
                                device.label }}</option>
                        </select>
                    </div>
                </div>

            </div>

            <div class="Meeting-info animate__animated animate__bounceInRight">
                <h2 class="join-title">Meet info</h2>
                <div class="join-options">
                    <div class="fields">
                        <div class="meeting-name">
                            <div class="join-label">Your name:</div>
                            <input type="text" placeholder="e.g 'Juan Dela Cruz'" :value="user.displayName"
                                class="meeting-input" readonly>
                        </div>
                        <div class="joining-opt">
                            <div class="join-label">Joining as:</div>
                            <div class="dropdown">
                                <select v-model="selectedJoinAs" class="join-select" ref="joinSelect"
                                    :class="{ 'animate-dropdown': animateDropdown }">
                                    <option disabled value="">Select Mode</option>
                                    <option value="Hearing">Hearing</option>
                                    <option value="Deaf">Deaf</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="share-link">
                        <div class="share-text">
                            <p class="share">Share the link</p>
                        </div>
                        <div class="input-container">
                            <div class="share-link-input" id="share-link-input">
                                <p class="linkp">Copy link</p>
                                <p class="linkp2">http://salinsenyasv1.000webhostapp.com/Join/{{ meetingCode }}</p>
                                <p class="linkp3">https://webrtc-9u7q.onrender.com/{{ meetingCode }}</p>
                            </div>
                            <span id="copy-icon" class="material-symbols-outlined copy-icon"
                                @click="copyLink">content_copy</span>
                        </div>
                    </div>
                    <p class="joinp">Ready to join?</p>
                    <div class="buttons">
                        <button class="join-button" :class="{ 'disabled': !selectedJoinAs }"
                            @click="handleJoinClick">Join now</button>
                        <!-- <button class="present-button"> <span class="material-symbols-outlined present-icon">
                                screen_share
                            </span>Present</button> -->
                    </div>
                    <p class="copyright">&copy; 2024 SalinSenyas. All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Please sign in to access this page.</p>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const user = computed(() => store.state.user)
const router = useRouter()

onMounted(() => {

    if (!user.value) {
        showSignInAlert();
    }

})

function showSignInAlert() {
    Swal.fire({
        title: 'Please Sign In',
        text: 'To start using ChismiSign, please sign in.',
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

<style scoped>
@import url('../assets/css/join-style.css');
</style>