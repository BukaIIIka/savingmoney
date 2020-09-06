<template>
    <section class="form">
        <div class="form-input" :class="{'error': emptyField}">
            <input id="name" type="text" v-model="goalParams.name" ref="requiredName" :class="{'filled': goalParams.name}">
            <label for="name">Название цели</label>
            <span v-if="emptyField" class="error-text">Укажите название цели</span>
        </div>
        <div class="form-input">
            <input id="amount" type="number" v-model="goalParams.amount" :class="{'filled': goalParams.amount}">
            <label for="amount">Сумма накоплений</label>
        </div>
        <div class="form-input">
            <input id="currentAmount" type="number" v-model="goalParams.currentAmount" :class="{'filled': goalParams.currentAmount > 0 }">
            <label for="currentAmount">Накопленная сумма</label>
        </div>
        <div class="form-input">
            <input id="date" v-model="goalParams.date" type="date" :class="{'filled': goalParams.date}">
            <label for="date">Дата выполнения цели</label>
        </div>
        <button @click="changeGoalParams()" class="button-primary btn-neumorphism">Сохранить</button>
    </section>
</template>

<script>
    export default {
        name: "createGoal",
        data: function () {
            return {
                goalParams: Object,
                emptyField: Boolean
            }
        },
        created() {
            this.emptyField = false;
            this.goalParams = this.$store.getters.getGoalById(this.$route.params.id);
            if (this.goalParams === undefined) {
                this.$router.push('/404')
            }
        },
        methods: {
            changeGoalParams: function () {
                if (!this.goalParams.name) {
                    this.emptyField = true;
                    this.$refs.requiredName.focus();
                } else {
                    this.$store.dispatch('changeGoalParamsAndSave', {
                        id: this.goalParams.id,
                        name: this.goalParams.name,
                        amount: +this.goalParams.amount,
                        currentAmount: +this.goalParams.currentAmount,
                        targetDate: new Date(this.goalParams.date),
                        isInfinityDate: !this.goalParams.date
                    });
                    this.$router.push(`/goal/${this.goalParams.id}`);
                }
            }
        },
    }
</script>

<style scoped>

</style>