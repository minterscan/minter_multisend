import Vue from 'vue'
import Vuex from 'vuex'
import uiStore from '@/store/ui'
import dataStore from '@/store/data'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ui: uiStore,
    data: dataStore
  }
})

export default store
