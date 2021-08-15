import Vue from 'vue'
import Vuex from 'vuex'
import glob from './glob'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    glob
  }
})
