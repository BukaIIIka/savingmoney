<template>
    <section class="form">
        <h2>Создание цели</h2>
        <label :class="{'error': emptyField}">
            <span>Название цели</span>
            <input type="text" v-model.trim="newGoalParams.name" ref="requiredName" placeholder="Новая машина">
            <span v-if="emptyField" class="error-text">Укажите название цели</span>
        </label>
        <label>Сумма накоплений <input type="number" v-model.number="newGoalParams.amount" placeholder="200"></label>
        <label>Срок до накопления <input v-model="newGoalParams.date" type="datetime-local"></label>
        <button @click="createNewGoal()" class="button-primary btn-neumorphism">Создать</button>
    </section>
</template>

<script>
    export default {
        name: "createGoal",
        data: function () {
            return {
                newGoalParams: Object,
                goalListLenght: Number,
                emptyField: Boolean
            }
        },
        created() {
            this.emptyField = false;
            this.newGoalParams = {};
            this.goalListLenght = +localStorage.goalListLenght || this.$store.state.goalList.length;
        },
        methods: {
            createNewGoal: function () {
                if (!this.newGoalParams.name) {
                    this.emptyField = true;
                    this.$refs.requiredName.focus();
                } else {
                    this.$store.dispatch('addNewGoalAndSave', {
                        id: +this.goalListLenght,
                        name: this.newGoalParams.name,
                        amount: +this.newGoalParams.amount,
                        currentAmount: 0,
                        targetDate: new Date(this.newGoalParams.date),
                        isInfinityDate: !this.newGoalParams.date
                    });
                    localStorage.goalListLenght = ++this.goalListLenght;
                    this.$router.push('/');
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>