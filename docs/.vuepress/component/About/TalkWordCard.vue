<template>
    <div class="talk-container">
        <div class="talk-word"> {{ msg }} </div>
    </div>
</template>

<script setup>
defineProps({
    msg: {
        type: String,
        default: 'Hello'
    }
});
</script>

<style scoped>
.vp-home-box {
    padding: 0px !important;
}

.talk-container {
    text-align: center;
}

.talk-word {
    margin: 40px;
    font-style: oblique;
    font-size: 45px;
    font-weight: bolder;
    color: rgb(113, 161, 239);
    /* 反射效果 */
    -webkit-box-reflect: below 0.4rem -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(127, 219, 107, 0.51)));
}
</style>