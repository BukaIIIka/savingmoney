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
            <label for="amount">Желаемая сумма</label>
        </div>
        <div class="form-input">
            <date-picker v-model="newGoalParams.targetDate" valueType="format" format="YYYY-MM-DD"
                         @focus="dateFieldIsFocused = true" @blur="dateFieldIsFocused = false"
                         :inputAttr="{
                            id: 'date',
                            class: {'filled': newGoalParams.targetDate}
                        }">
            </date-picker>
            <label :class="{'filled': newGoalParams.targetDate, 'focused': dateFieldIsFocused }" for="date">Дата выполнения цели</label>
        </div>
        <button @click="createNewGoal()" class="btn-neumorphism btn-primary">Создать</button>
    </section>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import 'vue2-datepicker/locale/ru';

    export default {
        name: "createGoal",
        data: function () {
            return {
                newGoalParams: Object,
                goalListLenght: Number,
                emptyField: Boolean,
                dateFieldIsFocused: Boolean
            }
        },
        components: {
            DatePicker,
        },
        created() {
            this.emptyField = false;
            this.newGoalParams = {};
            this.goalListLenght = +localStorage.goalListLenght || this.$store.state.goalList.length;
            this.dateFieldIsFocused = false;
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
                        targetDate: new Date(this.newGoalParams.targetDate),
                        isInfinityDate: !this.newGoalParams.targetDate,
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
