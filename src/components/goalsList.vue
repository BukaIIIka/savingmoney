<template>
    <div>
        <h3 v-if="goalList.length === 0">Список пока пуст. Создайте свою первую цель.</h3>
        <div class="goal-list">
            <template v-for="(goal, index) in goalList">
                <goal v-bind:key="index" :goal-item="goal"></goal>
            </template>
            <router-link :to="'/goal/create'" class="goal-item btn-neumorphism btn-primary">
                Создать цель
                <div class="plus">+</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import goal from "@/components/goal";

    export default {
        name: "goalsList",
        components: {
            goal,
        },
        data: function () {
            return {
                newGoalParams: Object
            }
        },
        created() {
            this.newGoalParams = {};
        },
        methods: {
        },
        computed: {
            goalList() {
                return this.$store.state.goalList;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .goal-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .goal-item {
        flex: 1 1 200px;
        margin: 15px;
        padding: 5px 10px;
        border-radius: 10px;
        line-height: 2em;
    }

    .plus {
        font-size: 2em;
        font-weight: 100;
    }
</style>
