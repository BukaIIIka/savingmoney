<template>
    <div class="progress">
        <div class="progress-value" :style="{
            width: widthProgress + '%'
        }"></div>
    </div>
</template>

<script>
    export default {
        name: "progressBar",
        props: {
            max: Number,
            value: Number
        },
        computed: {
            widthProgress: function () {
                return Math.floor(this.value / this.max * 1000)/10
            }
        }
    }
</script>

<style lang="scss" scoped>
    .progress {
        position: relative;
        height: 10px;
        background-color: rgba(199, 199, 199, .3);
        border-radius: 10px;
        overflow: hidden;

        .progress-value {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: #a2ccb5;
            transition: .3s;
        }
    }
</style>