const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  plus ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  minus ({ commit }) {
    commit('DECREMENT_MAIN_COUNTER')
  }
}

const getters = {
  getMain (state) {
    return state.main
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
