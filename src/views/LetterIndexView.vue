<script>
export default {
    name: 'letterIndex',
    components: {
        SalinModal
    },
    data() {
        return {
            modalToShow: null
        };
    },
    methods: {
        showModal(cardType) {
            this.modalToShow = cardType;
        },
        closeModal() {
            this.modalToShow = null;
        },
        getImageSource(letter) {
            if (letter === 'Jj' || letter === 'Zz') {
                return `${letter.toLowerCase()}.gif`;
            } else {
                return `${letter.toLowerCase()}.png`;
            }
        }
    }
};
</script>

<template>
    <header>
        <Navigation />
    </header>
    <main>
        <h1 class="letter-title">American Sign Language Alphabet</h1>
        <div class="cards">
            <div v-for="letter in letters" :key="letter" class="card animate__animated animate__zoomInDown"
                @click="showModal(letter)">
                <div class="image-container">
                    <img :src="`src/assets/img/signs/${getImageSource(letter)}`" alt="">
                </div>
                <div class="card-content">
                    <h2 class="cardh2">{{ letter }}</h2>
                </div>
            </div>
        </div>

        <SalinModal v-for="letter in letters" :key="letter" :showModal="modalToShow === letter" @close="closeModal">
            <template #header>
                <h3 class="modal-title">Image preview</h3>
            </template>
            <template #body>
                <img :src="`src/assets/img/signs/${getImageSource(letter)}`" alt="Image" class="modal-image">
            </template>
        </SalinModal>
    </main>
</template>

<script setup>
import Navigation from '../components/navigation.vue';
import SalinModal from '../components/customModal.vue';

const letters = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz'];
</script>

<style scoped>
@import url('../assets/css/letter-index-style.css');
@import url('../assets/css/modal-style.css');
</style>