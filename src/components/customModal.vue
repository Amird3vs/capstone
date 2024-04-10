<template>
    <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
            <div class="modal-container animate__animated animate__jackInTheBox">
                <div class="modal-header">
                    <slot name="header">
                        <h3 class="modal-title"></h3>
                    </slot>
                    <span class="close-button" @click="closeModal">&times;</span>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <div class="image-container">
                            <img src="../assets/img/signs/Vv.png" alt="Image" class="modal-image">
                        </div>
                        <p class="modal-text"></p>
                        <div class="input-container">
                            <input id="modal-input" type="text" placeholder=" ">
                            <label for="modal-input"></label>
                        </div>
                    </slot>
                </div>
                <div class="modal-footer" v-if="$slots.footer">
                    <slot name="footer">
                        <button class="modal-button"></button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showModal: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
@import url('../assets/css/modal-style.css');
</style>