import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app.js'
import user from './modules/user.js'
import permission from './modules/permission.js'
import task from './modules/task.js'
import common from './modules/common.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    task,
    common
  },
  getters
})
