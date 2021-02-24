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
            <date-picker v-model="goalParams.targetDate" valueType="format" format="YYYY-MM-DD"
                         @focus="dateFieldIsFocused = true" @blur="dateFieldIsFocused = false"
                         :inputAttr="{
                            id: 'date',
                            class: {'filled': goalParams.targetDate}
                        }">
            </date-picker>
            <label :class="{'filled': goalParams.targetDate, 'focused': dateFieldIsFocused }" for="date">Дата выполнения цели</label>
        </div>
        <button @click="changeGoalParams()" class="btn-primary btn-neumorphism">Сохранить</button>
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
                goalParams: Object,
                emptyField: Boolean,
                dateFieldIsFocused: Boolean
            }
        },
        components: {
            DatePicker,
        },
        created() {
            this.emptyField = false;
            this.goalParams = this.$store.getters.getGoalById(this.$route.params.id);
            if (this.goalParams === undefined) {
                this.$router.push('/404')
            }
            this.dateFieldIsFocused = false;
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
                        targetDate: new Date(this.goalParams.targetDate),
                        isInfinityDate: !this.goalParams.targetDate
                    });
                    this.$router.push(`/goal/${this.goalParams.id}`);
                }
            }
        },
    }
</script>

<style scoped>

</style>
