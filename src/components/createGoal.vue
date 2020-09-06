<template>
    <section class="form">
        <h2>Создание цели</h2>
        <div class="form-input" :class="{'error': emptyField}">
            <input id="name" type="text" v-model.trim="newGoalParams.name" ref="requiredName" :class="{'filled': newGoalParams.name}">
            <label for="name">Название цели</label>
            <span v-if="emptyField" class="error-text">Укажите название цели</span>
        </div>
        <div class="form-input">
            <input id="amount" type="number" v-model.number="newGoalParams.amount" :class="{'filled': newGoalParams.amount}">
            <label for="amount">Сумма накоплений</label>
        </div>
        <div class="form-input">
            <input id="date" v-model="newGoalParams.date" type="date" :class="{'filled': newGoalParams.date}">
            <label for="date">Дата выполнения цели</label>
        </div>
        <button @click="createNewGoal()" class="btn-neumorphism btn-primary">Создать</button>
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
                        isInfinityDate: !this.newGoalParams.date,
                        createDate: Date.now()
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