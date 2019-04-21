import Vuex from 'vuex';
import Vue from 'vue'

//导入数据
import state from './state.js'
import mutations from './mutations.js'

Vue.use(Vuex);

export default function createStroe() {
  return new Vuex.Store({
    state,
    mutations
  })
}
