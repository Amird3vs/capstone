<template>
    <main>
        <div class="app-title animate__animated animate__slideInLeft">
            <span class="app-name"><strong>Chismisign</strong></span>
            <span class="app-author"> by SalinSenyas</span>
        </div>

        <div class="video-container animate__animated animate__backInRight">

            <div class="wrapper-container" :class="{ 'centered': !isPopupVisible }">
                <div class="local-container">
                    <video :srcObject="localStream" autoplay muted ref="localVideo" class="video"></video>
                    <div v-for="(stream, index) in remoteStreams" :key="index">
                        <video :srcObject="stream" autoplay></video>
                    </div>
                </div>

                <div class="popup-container animate__animated animate__slideInRight" v-if="isPopupVisible">
                    <div class="popup">
                        <div class="popup-content">

                            <div v-if="popupContent === 'chat'">
                                <div class="popup-header">
                                    <p class="popup-title">In-call messages</p>
                                    <button class="close-button" @click="closePopup">&#10006;</button>
                                </div>
                            </div>

                            <div v-else-if="popupContent === 'group'">
                                <div class="popup-header">
                                    <p class="popup-title">People</p>
                                    <button class="close-button" @click="closePopup">&#10006;</button>
                                </div>
                                <div class="people-info">
                                    <button class="add-people-button">
                                        <span class="material-symbols-outlined">person_add</span>
                                        Add People
                                    </button>
                                    <div class="search-container">
                                        <input type="text" placeholder="Search for people">
                                    </div>
                                    <div class="inmeeting-d">
                                        <p class="inmeeting">IN MEETING</p>
                                    </div>

                                    <div class="participant-list">
                                        <div class="participant-title" @click="toggleParticipantList">
                                            Hearing participants
                                            <div class="partcounts">
                                                <span class="number-badge">{{ numberOfParticipants }}</span>
                                                <span v-if="!showParticipants"
                                                    class="material-symbols-outlined expand-icon">expand_more</span>
                                                <span v-else
                                                    class="material-symbols-outlined expand-icon">expand_less</span>
                                            </div>
                                        </div>
                                        <div :class="{ 'participant-container': true, 'show': showParticipants }">
                                            <div class="participant">
                                                <div class="participant-avatar">
                                                    <img src="" alt="Participant Picture">
                                                </div>
                                                <div class="participant-info">
                                                    <div class="name-container">
                                                        <p class="participant-name">Bili, Amir-khan A.</p>
                                                        <p class="host-info">Meeting host</p>
                                                    </div>
                                                    <span class="material-symbols-outlined participant-icon">mic</span>
                                                </div>
                                                <div class="ellipsis-menu">
                                                    <span class="material-symbols-outlined">more_vert</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="inmeeting-d">
                                        <p class="inmeeting">IN MEETING ALSO</p>
                                    </div>

                                    <div class="participant-list">
                                        <div class="participant-title" @click="toggleDeafParticipantList">
                                            Deaf participants
                                            <div class="partcounts">
                                                <span class="number-badge">{{ numberOfParticipants }}</span>
                                                <span v-if="!showDeafParticipants"
                                                    class="material-symbols-outlined expand-icon">expand_more</span>
                                                <span v-else
                                                    class="material-symbols-outlined expand-icon">expand_less</span>
                                            </div>
                                        </div>
                                        <div :class="{ 'participant-container': true, 'show': showDeafParticipants }">
                                            <div class="participant">
                                                <div class="participant-avatar">
                                                    <img src="" alt="Participant Picture">
                                                </div>
                                                <div class="participant-info">
                                                    <div class="name-container">
                                                        <p class="participant-name">Dela cruz, Juan C.</p>
                                                        <p class="host-info"></p>
                                                    </div>
                                                    <span class="material-symbols-outlined participant-icon">mic</span>
                                                </div>
                                                <div class="ellipsis-menu">
                                                    <span class="material-symbols-outlined">more_vert</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div v-else-if="popupContent === 'info'">
                                <div class="popup-header">
                                    <p class="popup-title">Meeting details</p>
                                    <button class="close-button" @click="closePopup">&#10006;</button>
                                </div>
                                <div class="joining-info">
                                    <p class="joining-info-title">Joining info</p>
                                    <div class="link-container">
                                        <input type="text" :value="meetingLink" readonly>
                                        <button @click="copyLink" class="copy-button">
                                            <span class="material-symbols-outlined link-icon">content_copy</span>
                                            Copy joining info
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="controls animate__animated animate__bounceInUp">

            <div class="left-controls">
                <div class="current-time-code">
                    {{ currentTime }} | {{ meetingCode }}
                </div>
            </div>

            <div class="center-controls">
                <button @click="toggleMic" class="material-button smaller-font" :class="{ active: isMicOn }">
                    <span class="material-symbols-outlined">{{ isMicOn ? 'mic' : 'mic_off' }}</span>
                </button>
                <button @click="toggleCamera" class="material-button smaller-font" :class="{ active: isCameraOn }">
                    <span class="material-symbols-outlined">{{ isCameraOn ? 'videocam' : 'videocam_off' }}</span>
                </button>
                <button @click="toggleScreenSharing" class="material-button smaller-font"
                    :class="{ active: isScreenSharing }">
                    <span class="material-symbols-outlined">{{ isScreenSharing ? 'stop_screen_share' : 'screen_share'
                        }}</span>
                </button>
                <div class="reactions-container">
                    <button @click="togglePopup" class="material-button" :class="{ active: showPopup }">
                        <span class="material-symbols-outlined">insert_emoticon</span>
                    </button>
                    <div class="reactions-popup" v-show="showPopup">
                        <button @click="react('heart')" class="animate__animated animate__tada">
                            <img src="../assets/img/reactions/favorite.png" alt="Favorite">
                        </button>
                        <button @click="react('thumbs_up')" class="animate__animated animate__tada">
                            <img src="../assets/img/reactions/smile.png" alt="Thumbs Up">
                        </button>
                        <button @click="react('clap')" class="animate__animated animate__tada">
                            <img src="../assets/img/reactions/hands.png" alt="Clap">
                        </button>
                        <button @click="react('laugh')" class="animate__animated animate__tada">
                            <img src="../assets/img/reactions/laugh.png" alt="Laugh">
                        </button>
                        <button @click="react('Wow')" class="animate__animated animate__tada">
                            <img src="../assets/img/reactions/wow.png" alt="Wow">
                        </button>
                        <button @click="react('Sad')" class="animate__animated animate__tada">
                            <img src="../assets/img/reactions/sad-face.png" alt="Sad">
                        </button>
                    </div>
                </div>
                <button @click="endCall" class="material-button end-call">
                    <span class="material-symbols-outlined">call_end</span>
                </button>
            </div>

            <div class="right-controls">
                <button @click="openPopup('chat')" class="material-button round-not">
                    <span class="material-symbols-outlined smaller-font">chat</span>
                </button>

                <button @click="openPopup('group')" class="material-button round-not">
                    <span class="material-symbols-outlined smaller-font">group</span>
                </button>

                <button @click="openPopup('info')" class="material-button round-not">
                    <span class="material-symbols-outlined smaller-font">info</span>
                </button>
            </div>

        </div>
    </main>
</template>

<script>
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import Peer from 'peerjs';

export default {
    name: 'MeetingPlace',
    data() {
        return {
            socket: null,
            roomId: null,
            messages: [],
            newMessage: '',
            peer: null,
            peerId: null,
            localStream: null,
            remoteStreams: [],
            isMicOn: true,
            isCameraOn: true,
            isScreenSharing: false,
            showPopup: false,
            currentTime: "",
            meetingCode: "",
            meetingLink: "",
            isPopupVisible: false,
            popupContent: null,
            showParticipants: false,
            showDeafParticipants: false,
            numberOfParticipants: 10,
        };
    },
    mounted() {
        this.setupLocalVideo();
        this.updateCurrentTime();
        setInterval(this.updateCurrentTime, 1000);
        this.meetingCode = this.$route.params.meetingCode || "";
        this.meetingLink = `http://localhost:5173/video-conference/${this.$route.params.meetingCode}`;

        this.initializeSocket();
        this.initializePeer();
    },
    methods: {
        initializeSocket() {
            this.socket = io('http://localhost:5173');
            this.roomId = this.$route.params.roomId;
            this.setupSocketListeners();
        },
        setupSocketListeners() {
            this.socket.on('message', (message) => {
                this.messages.push(message);
            });
        },
        initializePeer() {
            this.peer = new Peer({
                host: '127.0.0.1',
                port: 3000,
                path: '/peerjs',
                config: {
                    iceServers: [
                        { url: 'stun:stun01.sipphone.com' },
                        { url: 'stun:stun.ekiga.net' },
                        { url: 'stun:stunserver.org' },
                        { url: 'stun:stun.softjoys.com' },
                        { url: 'stun:stun.voiparound.com' },
                        { url: 'stun:stun.voipbuster.com' },
                        { url: 'stun:stun.voipstunt.com' },
                        { url: 'stun:stun.voxgratia.org' },
                        { url: 'stun:stun.xten.com' },
                        {
                            url: 'turn:192.158.29.39:3478?transport=udp',
                            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                            username: '28224511:1379330808'
                        },
                        {
                            url: 'turn:192.158.29.39:3478?transport=tcp',
                            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                            username: '28224511:1379330808'
                        }
                    ]
                },
                debug: 3
            });

            this.peer.on('open', (id) => {
                this.peerId = id;
            });

            this.peer.on('call', (call) => {
                call.answer(this.localStream);
                call.on('stream', (remoteStream) => {
                    this.addRemoteStream(remoteStream);
                });
            });
        },
        startVideoCall(remotePeerId) {
            const call = this.peer.call(remotePeerId, this.localStream);
            call.on('stream', (remoteStream) => {
                this.addRemoteStream(remoteStream);
            });
        },
        addRemoteStream(stream) {
            this.remoteStreams.push(stream);
        },
        async setupLocalVideo() {
            try {
                this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        },
        toggleMic() {
            this.isMicOn = !this.isMicOn;
            const audioTracks = this.localStream.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = this.isMicOn;
            });
        },
        toggleCamera() {
            this.isCameraOn = !this.isCameraOn;
            const videoTracks = this.localStream.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = this.isCameraOn;
            });
        },
        togglePopup() {
            this.showPopup = !this.showPopup;
        },
        openPopup(content) {
            if (this.isPopupVisible && this.popupContent === content) {
                this.closePopup();
            } else {
                this.popupContent = content;
                this.isPopupVisible = true;
            }
        },
        closePopup() {
            this.isPopupVisible = false;
        },
        updateCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const minutes = now.getMinutes().toString().padStart(2, '0');
            this.currentTime = `${hours}:${minutes} ${ampm}`;
        },
        toggleParticipantList() {
            this.showParticipants = !this.showParticipants;
        },
        toggleDeafParticipantList() {
            this.showDeafParticipants = !this.showDeafParticipants;
        },
        copyLink() {
            const inputElement = document.createElement('input');
            inputElement.value = this.meetingLink;
            document.body.appendChild(inputElement);
            inputElement.select();
            document.execCommand('copy');
            document.body.removeChild(inputElement);
            Swal.fire({
                icon: 'success',
                title: 'Meeting link copied!',
                timer: 1500,
                showConfirmButton: false
            });
        }
    },
};
</script>

<style>
@import url('../assets/css/SalinMeeting-style.css');
</style>