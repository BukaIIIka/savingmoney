import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import "./styles/global.scss";

import goalsList from "@/components/goalsList";
import goalPage from "@/components/goalPage";
import pageNotFound from "@/components/pageNotFound";
import createGoal from "@/components/createGoal";

import Store from "@/scripts/Store";
import changeGoalParams from "@/components/changeGoalParams";

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false

const routes = [
  { path: '/goal/create', component: createGoal },
  { path: '/goal/:id/change', component: changeGoalParams },
  { path: '/goal/:id', component: goalPage },
  { path: '', name: goalsList, component: goalsList},
  { path: '404', name: 404, component: pageNotFound, alias: '/404'},
  { path: '*', redirect: { name: 404 }},

]

const router = new VueRouter({
  mode: 'history',
  routes
})

const store = new Vuex.Store(Store)

Vue.directive('countdown-date', {
  bind: function (el, binding) {
    // let s = JSON.stringify
    let date = new Date(binding.value);
    let dateNow = new Date(Date.now());
    dateNow.setHours(0);
    let diffDate = date - dateNow;

    let text = 'date: '+ dateNow + ' = ' + date;
    if (diffDate > 0) {
      let days = Math.floor(diffDate / (24 * 3600 * 1000));
      text = "Осталось более " + days + ' дней';
    } else {
      text = "Время вышло";
    }
    el.innerHTML = text;
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')