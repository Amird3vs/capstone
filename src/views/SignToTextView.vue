<script>
import Swal from 'sweetalert2';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import Handsigns from '../api/handsigns';
import { drawHand } from '../api/handpose-utils';

export default {
    name: 'SignToTextView',
    data() {
        return {
            loading: true,
            gamestate: 'loading',
            predictedLetter: '',
            userInput: '',
            isChecked: true,
            stream: null,
            synth: window.speechSynthesis,
            phraseInitialsMapping: {
                'aaip': 'Ano ang iyong pangalan?',
                'Aaipp': 'Ano ang iyong paboritong pagkain?',
                'kk': 'Kamusta ka?',
                'Kknb': 'Kumain ka na ba?',
                'mkbmk': 'Mayroon ka bang mga kapatid?',
                'skn': 'Saan ka nag-aaral?',
                'gknksm': 'Gaano ka na katagal sa trabaho mo?',
                'skpns': 'Saan ka pupunta ngayong Sabado?',
                'imbkanagmsb': 'Iniisip mo ba kung ano ang gagawin mo sa bakasyon?',
                'mmkkbms': 'May mga kaibigan ka bang malapit sa\'yo?',
                'kaam': 'Kumusta ang araw mo?',
                'mkbn': 'Minsan ka bang nagluluto?',
                'aknmapmp': 'Anong klase ng musika ang paborito mong pakinggan?',
                'skmppmr': 'Saan ka madalas pumunta para mag-relax?',
                'aokgb': 'Anong oras ka gigising bukas?',
                'mbkt': 'Magandang buhay!',
                'kkn': 'Kamusta ka na?',
                'tbdom': 'Tag-araw ba dyan o maulan?',
                'nkbpstomskg': 'Naglalakad ka ba papunta sa trabaho o may sasakyan kang gamit?',
                'bp': 'Bakit ka malungkot?',
                'pbkt': 'Puwede ba kitang tulungan?',
                'mskbgohms': 'May sports ka bang gusto o hilig mong subukan?',
                'sakmsb': 'Sino ang kasama mo sa bahay?',
                'gknknd': 'Gaano ka na katagal nakatira dyan?',
                'kkhknpmp': 'Kailan ka huling kumain ng paborito mong pagkain?',
                'ubsin': 'Umuulan ba sa inyo ngayon?',
                'aagmgkpm': 'Ano ang gusto mong gawin kapag maulan?',
                'oklb': 'Okey ka lang ba?',
                'an': 'Anong nangyari?',
                "at": "Ano 'to?",
                'kawm': 'Kamusta ang weekend mo?',
                'Aapmn': 'Ano ang pinaka-nagustuhan mong nangyari?',
                'aaipapnt': 'Ano ang iyong paboritong aktibidad pagkatapos ng trabaho?',
                'sakm': 'Sino ang kasama mo?',
                'agn': 'Anong ginagawa niyo?',
                'tgs': 'Taga saan ka?',
                'aipot': 'Ano ang iyong propesyon o trabaho?',
                'mmpkbsb': 'May mga pets ka ba sa bahay',
                'aapn': 'Ano ang pangalan nila?',
                'kk': 'Kailan ka huling kumain?',
                'aaim': 'Ano ang inorder mo?',
                'w': 'welcome',
                'k': 'kumusta?',
                'mh': 'Magandang hapon!',
                'mu': 'Magandang umaga!',
                'mg': 'Magandang gabi!',
                'skim': 'Saan ko ito makikita?',
                'QCU': 'Quezon City University'
            },
            showWordWindow: false,
            splitWords: []
        };
    },
    methods: {
        async toggleCamera(event) {
            this.isChecked = event.target.checked;
            if (this.isChecked) {
                await this.initializeCamera();
            } else {
                this.stopCamera();
                await new Promise(resolve => setTimeout(resolve, 500));
                this.clearAndResizeCanvas();
            }
        },
        stopCamera() {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.$refs.video.srcObject = null;
                this.stream = null;
            }
        },
        clearCanvas() {
            this.$refs.canvas.getContext('2d').clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        },
        setCanvasSize() {
            const video = this.$refs.video;
            const canvas = this.$refs.canvas;
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
        },
        clearAndResizeCanvas() {
            this.clearCanvas();
            this.setCanvasSize();
        },
        async initializeCamera() {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = this.$refs.video;
                video.srcObject = this.stream;
                video.play();
                video.addEventListener('loadedmetadata', this.setCanvasSize);
            } catch (error) {
                this.handleCameraError(error);
            }
        },
        handleCameraError(error) {
            let title, text, confirmButtonText;

            if (error.name === 'NotAllowedError') {
                title = 'Camera Access Required';
                text = 'To capture recognized signs, you need to allow camera access. Please click "Allow" and follow the browser prompts.';
                confirmButtonText = 'Try again';
            } else if (error.name === 'PermissionDismissedError') {
                title = 'Reminder';
                text = 'Camera access is required to capture signs. You dismissed the permission prompt earlier. Please click "Allow" when prompted again.';
                confirmButtonText = 'Allow';
            } else {
                title = 'Oops!';
                text = "We can't find your camera. Please refresh the page and try again.";
                confirmButtonText = 'Refresh Page';
            }

            Swal.fire({
                title,
                text,
                icon: ['NotAllowedError', 'PermissionDismissedError'].includes(error.name) ? 'warning' : 'error',
                confirmButtonColor: '#3085d6',
                showCancelButton: error.name !== 'NotAllowedError',
                cancelButtonColor: '#aaa',
                cancelButtonText: 'Close'
            }).then(result => {
                if (result.isConfirmed && error.name !== 'NotAllowedError') {
                    window.location.reload();
                }
            });
        },
        async loadHandpose() {
            try {
                const handposeModule = await import('@tensorflow-models/handpose');
                const handpose = await handposeModule.load();
                this.detectHand(handpose);
            } catch (error) {
                this.loading = false;
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to load handpose model. Please try again later.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        },
        async detectHand(net) {
            const video = this.$refs.video;
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');
            const GE = new fp.GestureEstimator(Object.values(Handsigns));

            let lastFrameTime = performance.now();
            const frameInterval = 1000 / 30;
            let lastPredictionTime = 0;
            const predictionDelay = 1000;

            const animate = async () => {
                const currentTime = performance.now();
                if (currentTime - lastFrameTime >= frameInterval && video.readyState === video.HAVE_ENOUGH_DATA) {
                    lastFrameTime = currentTime;

                    const handData = await net.estimateHands(video);
                    if (this.gamestate === 'loading') {
                        document.querySelector('.darksoul-loader-h').innerText = 'Make a 👍 gesture with your hand to start';
                        if (handData && handData.length > 0 && handData[0].landmarks[4][1] < handData[0].landmarks[8][1]) {
                            this.gamestate = 'started';
                        }
                    } else if (this.gamestate === 'started') {
                        this.loading = false;
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                        drawHand(handData, ctx);

                        if (handData.length > 0) {
                            const gesture = GE.estimate(handData[0].landmarks, 8.5);
                            const mostConfidentPrediction = gesture.gestures[0];

                            if (mostConfidentPrediction && currentTime - lastPredictionTime >= predictionDelay) {
                                this.updateUserInput(mostConfidentPrediction.name);
                                lastPredictionTime = currentTime;
                                this.synth.speak(new SpeechSynthesisUtterance(mostConfidentPrediction.name));
                            }
                            this.predictedLetter = mostConfidentPrediction ? mostConfidentPrediction.name : '';
                        } else {
                            this.predictedLetter = '';
                        }
                    }
                }
                requestAnimationFrame(animate);
            };
            animate();
        },
        updateUserInput(letter) {
            this.userInput += letter;
            this.handleInput();
        },
        clearUserInput() {
            this.userInput = '';
        },
        readContent() {
            this.synth.speak(new SpeechSynthesisUtterance(this.userInput));
        },
        handleInput() {
            const userInput = this.userInput.trim().toLowerCase();
            if (userInput === '') {
                this.showSuggestions = false;
                return;
            }

            const matchingPhrases = Object.keys(this.phraseInitialsMapping)
                .filter(key => key.toLowerCase().startsWith(userInput));
            this.suggestions = matchingPhrases.map(key => this.phraseInitialsMapping[key]);
            this.showSuggestions = true;
        },
        selectSuggestion(suggestion) {
            this.userInput = suggestion;
            this.showSuggestions = false;
        },
        selectWord(word) {
            this.userInput = word + ' ';
            this.showWordWindow = false;
        },
        removeWord(index) {
            this.splitWords.splice(index, 1);
        },
        splitPhrase(suggestion) {
            const words = suggestion.split(" ");
            this.splitWords = words;
            this.showWordWindow = true;
            this.$nextTick(() => {
                this.toggleWordWindow(true);
            });
        },
        insertRemainingWords() {
            this.userInput = this.splitWords.join(' ');
            this.splitWords = [];
            this.showWordWindow = false;
            this.showSuggestions = false;
        },
        toggleWordWindow(show) {
            const wordWindow = document.querySelector('.word-window');
            if (show) {
                wordWindow.classList.add('active');
            } else {
                wordWindow.classList.remove('active');
            }
        },
        closeWordWindow() {
            this.showWordWindow = false;
        },
        closeWordWindowOutside(event) {
            const wordWindow = document.querySelector('.word-window');
            if (!wordWindow.contains(event.target)) {
                this.showWordWindow = false;
            }
        },
        handleKeyDown(event) {
            if (event.key === 'Escape') {
                this.showWordWindow = false;
            }
        },
        highlightMatch(suggestion) {
            const userInput = this.userInput.toLowerCase().split('');
            let highlightedSuggestion = '';

            suggestion.split(' ').forEach(word => {
                const initial = word.charAt(0).toLowerCase();
                if (userInput.includes(initial)) {
                    highlightedSuggestion += '<strong style="color: #BCB88A;">' + word.charAt(0) + '</strong>' + word.slice(1) + ' ';
                } else {
                    highlightedSuggestion += word + ' ';
                }
            });

            return highlightedSuggestion.trim();
        }
    },
    mounted() {
        this.initializeCamera();
        this.loadHandpose();
        document.body.addEventListener('click', this.closeWordWindowOutside);
        document.body.addEventListener('keydown', this.handleKeyDown);
    },
    beforeDestroy() {
        this.stopCamera();
        document.body.removeEventListener('click', this.closeWordWindowOutside);
        document.body.removeEventListener('keydown', this.handleKeyDown);
    }
};
</script>

<template>
    <header>
        <Navigation />
    </header>
    <main>
        <div class="container animate__animated animate__backInDown">

            <div class="main-video-container">
                <div class="title-and-toggle">
                    <h3 class="main-video__title">Sign recognition</h3>
                    <div class="toggle-switch">
                        <input type="checkbox" id="toggle-camera" :checked="isChecked" @change="toggleCamera">
                        <label for="toggle-camera">
                            <span class="on-text" v-if="isChecked">Live</span>
                            <span class="off-text" v-else>Idle</span>
                            <span class="material-symbols-outlined" v-if="isChecked">photo_camera</span>
                            <span class="material-symbols-outlined camera-off" v-else>no_photography</span>
                        </label>
                    </div>
                </div>
                <div class="video-canvas-container">
                    <video ref="video" class="main-video" id="camera-preview" autoplay @canplay="setCanvasSize"
                        @loadedmetadata="setCanvasSize"></video>
                    <canvas ref="canvas" id="hand-canvas" class="main-canvas"></canvas>
                    <img src="../assets/img/camera-banner.png" class="camera-off-image" v-if="!isChecked"
                        alt="Camera Off Image">
                    <div v-if="loading" class="overlay">
                        <div class="darksoul-layout">
                            <div class="darksoul-grid">
                                <div class="item1"></div>
                                <div class="item2"></div>
                                <div class="item3"></div>
                                <div class="item4"></div>
                            </div>
                            <div class="darksoul-loader-h">Loading the magic... <span class="emoji">🧙‍♂️</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="video-list-container">
                <div class="title-bar">
                    <h3 class="main-video__title">Recognized signs</h3>
                    <button class="clear-button" id="clearButton" @click="clearUserInput"
                        v-if="userInput.length > 0">&#10006;</button>
                    <div class="button-container">
                        <button class="read-button" @click="readContent" v-if="userInput.length > 0">
                            <span class="material-symbols-outlined read-btn">
                                volume_up
                            </span>
                        </button>
                    </div>
                </div>
                <div class="typing-area-container">
                    <div class="sign-tooltip" id="sign-tooltip" v-if="userInput.length <= 0">Start signing!
                    </div>
                    <div class="plchldr" v-if="userInput.length <= 0">
                        <h1 class="plchldr-primary">Real-time Sign Translation</h1>
                        <h1 class="header-secondary">Created with AI in mind</h1>
                        <p class="double-line">Improving sign language recognition for enhanced<br>connectivity through
                            intelligent technology.</p>
                        <p class="copyright">&copy; 2024 SalinSenyas. All rights reserved.</p>
                    </div>
                    <div class="autocomplete-textarea">
                        <textarea id="userInput" class="typing-area" v-model="userInput" @input="handleInput"></textarea>
                        <ul v-if="showSuggestions && suggestions.length" class="suggestions">
                            <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
                                <div class="suggestion-container">
                                    <span v-html="highlightMatch(suggestion)"></span>
                                    <button class="edit-btn" @click.stop="splitPhrase(suggestion)">
                                        <span class="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <h1 v-if="predictedLetter" class="predicted-letter">{{ predictedLetter }}</h1>
                </div>
            </div>

            <div class="word-window animate__animated animate__backInDown" v-show="showWordWindow"
                @click.self="closeWordWindowOutside">
                <div class="word-window-header">
                    <h3 class="word-window-title">Split Words?</h3>
                    <span class="material-symbols-outlined" style="cursor: pointer; color: red;"
                        @click.stop="closeWordWindow">close</span>
                </div>
                <div class="word-list">
                    <div v-for="(word, index) in splitWords" :key="index" class="word">
                        <span class="word-text" @click="selectWord(word)">{{ word }}</span>
                        <span class="close-button" @click="removeWord(index)">&times;</span>
                    </div>
                </div>
                <div class="word-window-footer">
                    <button class="getWordsButton" @click="insertRemainingWords">Done</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import Navigation from '../components/navigation.vue'
</script>

<style scoped>
@import url('../assets/css/signToText-style.css');
</style>