import Vue from 'vue'
import Vuex from 'vuex'
import glob from './glob'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    glob,
    auth
  }
})
