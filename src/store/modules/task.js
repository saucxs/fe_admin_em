export default {
  state: {
    taskId: ''
  },
  mutations: {
    SET_TASK_ID (state, taskId) {
      state.taskId = taskId
    }
  },
  actions: {
    setTaskId ({commit}, taskId) {
      commit('SET_TASK_ID', taskId)
    }
  }
}
