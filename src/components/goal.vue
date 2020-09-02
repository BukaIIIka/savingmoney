<template>
    <router-link :to="`/goal/${goalItem.id}`" class="goal-item btn-neumorphism">
        <div class="name">{{goalItem.name}}</div>
        <div class="amount">
            <template v-if="goalItem.amount <= 0">∞ {{ goalItem.currentAmount }}</template>
            <template v-else-if="goalItem.currentAmount < goalItem.amount">{{goalItem.amount - goalItem.currentAmount}}</template>
            <template v-else>✓</template>
        </div>
        <div v-if="!goalItem.isInfinityDate" class="date">{{date}}</div>
    </router-link>
</template>

<script>
    // import Goal from "@/scripts/goal";
    export default {
        name: "goal",
        props: {
            goalItem: Object
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
    }
</style>
