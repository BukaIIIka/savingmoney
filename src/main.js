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

Vue.config.productionTip = false;

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
  base: '/savingmoney/',
  routes
})

const store = new Vuex.Store(Store)

Vue.directive('countdown-date', {
  bind: function (el, binding) {
    let date = new Date(binding.value);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    el.innerHTML = date.toLocaleDateString("ru-Ru", options);
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')