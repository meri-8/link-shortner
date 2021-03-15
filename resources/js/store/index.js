import Vue from 'vue';
import Vuex from 'vuex';
import shortener from "./modules/shortener";

Vue.use(Vuex);

//=======vuex store start===========
const store = new Vuex.Store({
    state :{},
    mutations:{},
    actions:{},
    getters:{},
    modules:{
        shortener,
    },
});

//=======vuex store end===========
export default store;
