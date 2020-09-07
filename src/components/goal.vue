<template>
    <router-link :to="`/goal/${goalItem.id}`" class="goal-item btn-neumorphism">
        <div class="name">{{goalItem.name}}</div>
        <div class="amount">
            <template v-if="goalItem.amount <= 0">∞ {{ goalItem.currentAmount }}</template>
            <template v-else-if="goalItem.currentAmount < goalItem.amount">{{goalItem.amount - goalItem.currentAmount}}</template>
            <template v-else>✓</template>
        </div>
        <progress-bar v-if="goalItem.amount" :max="goalItem.amount" :value="goalItem.currentAmount"></progress-bar>
        <div v-if="!goalItem.isInfinityDate" class="date" v-countdown-date:date="goalItem.targetDate"></div>
    </router-link>
</template>

<script>
    import progressBar from "@/components/progressBar";

    export default {

        name: "goal",
        props: {
            goalItem: Object
        },
        components: {
            progressBar
        },
        computed: {
            date: function () {
                return new Date(this.goalItem.targetDate).toDateString()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goal-item {
        .name {
            font-size: 16px;
            font-weight: 600;
        }

        .amount {
            font-size: 18px;
            font-weight: 100;
        }

        .date {
            font-size: 12px;
            font-weight: 100;
        }

        progress {
            width: 100%;
        }
    }
</style>
