<template>
    <section class="form">
        <label :class="{'error': emptyField}">
            <span>Название цели</span>
            <input type="text" v-model="goalParams.name" ref="requiredName" placeholder="Новая машина">
            <span v-if="emptyField" class="error-text">Укажите название цели</span>
        </label>
        <label>Сумма накоплений <input type="number" v-model="goalParams.amount" placeholder="200"></label>
        <label>Накопленная сумма <input type="number" v-model="goalParams.currentAmount"></label>
        <label>Срок до накопления <input v-model="goalParams.date" type="datetime-local"></label>
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