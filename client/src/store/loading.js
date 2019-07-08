export default {
  namespaced: true,
  state: {
    isActive: false
  },
  getters: {

  },
  mutations: {
    activate (state) {
      state.isActive = true
    },
    deactivate (state) {
      state.isActive = false
    }
  },
  actions: {
    activate ({ commit }) {
      commit('activate')
    },
    deactivate ({ commit }) {
      commit('deactivate')
    }
  }
}
