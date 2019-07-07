import axios from 'axios'

export default {
  namespaced: true,
  state: {
    story: {}
  },
  getters: {

  },
  mutations: {
    update (state, story) {
      state.story = story
    }
  },
  actions: {
    async findById ({ commit }, id) {
      try {
        const response = await axios.get(`/stories/${id}`)
        const story = response.data

        commit('update', story)
      } catch (error) {
        throw error
      }
    },
    async addEvent ({ commit }, { storyId, stageId, event }) {
      try {
        const response = await axios.post(`/stories/${storyId}/stages/${stageId}/events`, { event })

        commit('update', response.data)
      } catch (error) {
        throw error
      }
    },
    async updateEvents ({ commit }, { storyId, stageId, events }) {
      try {
        const response = await axios.put(`/stories/${storyId}/stages/${stageId}/events`, { events })

        commit('update', response.data)
      } catch (error) {
        throw error
      }
    }
  }
}
