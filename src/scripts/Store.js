export default  {
    state: {
        goalList: [],
    },
    mutations: {
        getGoalsListFromStorage (state) {
            if (localStorage.goalList) {
                state.goalList = JSON.parse(localStorage.goalList);
            }
        },
        addNewGoal (state, params) {
            state.goalList.push(params)
        },
        deleteGoalByID(state, params) {
            state.goalList.splice(params, 1);
        },
        setGoalParam(state, params) {
            state.goalList[params.key] = params.goalParams;
        },
        saveGoalList (state) {
            localStorage.goalList = JSON.stringify(state.goalList);
        },
        incrementGoalAmount (state, params) {
            state.goalList.find(goal => goal.id === +params.id).currentAmount += +params.amount;
        },
    },
    getters: {
        getGoalById: state => id => {
            return state.goalList.find(goal => goal.id === +id);
        },
        getGoalIndexById: state => id => {
            return state.goalList.findIndex(element => {
                return element.id === +id;
            })
        }
    },
    actions: {
        addNewGoalAndSave ({ commit }, params) {
            commit('addNewGoal', params);
            commit('saveGoalList');
        },
        deleteGoalAndSave ({ commit, getters }, params){
            commit('deleteGoalByID', getters.getGoalIndexById(params));
            commit('saveGoalList');
        },
        changeGoalParamsAndSave({ commit, getters }, params) {
            commit('setGoalParam', {
                'key': getters.getGoalIndexById(params.id),
                'goalParams': params
            });
            commit('saveGoalList');
        },
        incrementGoalAmountAndSave ({ commit }, params) {
            commit('incrementGoalAmount', params);
            commit('saveGoalList');
        },
    }
}