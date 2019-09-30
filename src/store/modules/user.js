import Cookies from 'js-cookie'
import {
  login,
  logout
} from 'api/common/login'

// cookie 过期时间设置为20分钟
const expiryTime = new Date(new Date().getTime() + 20 * 60 * 1000)

export default {
  namespaced: true,
  state: {
    staffCode: Cookies.get('staffCode'),
    token: Cookies.get('accessToken'),
    userId: Cookies.get('userId'),
    userName: Cookies.get('userName'),
    roles: Cookies.getJSON('roles'),
    routers: Cookies.getJSON('routers')
  },
  mutations: {
    SET_USER_ID (state, userId) {
      state.userId = userId
    },
    SET_USER_NAME (state, userName) {
      state.userName = userName
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_STAFF_CODE (state, staffCode) {
      state.staffCode = staffCode
    },
    SET_ROLES (state, roles) {
      state.roles = roles
    },
    SET_ROUTERS (state, routers) {
      state.routers = routers
    }
  },
  actions: {
    login ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if (res.retValue !== 1) {
            resolve(res)
            return
          }
          const roles = res.data.roles
          const routers = res.data.routers
          Cookies.set('userId', res.data.userId, { expires: expiryTime })
          Cookies.set('userName', res.data.userName, { expires: expiryTime })
          Cookies.set('accessToken', res.data.token, { expires: expiryTime })
          Cookies.set('staffCode', userInfo.staffCode, { expires: expiryTime })
          Cookies.set('roles', roles, { expires: expiryTime })
          Cookies.set('routers', routers, { expires: expiryTime })
          commit('SET_USER_ID', res.data.userId)
          commit('SET_USER_NAME', res.data.userName)
          commit('SET_TOKEN', res.data.token)
          commit('SET_ROLES', roles)
          commit('SET_STAFF_CODE', userInfo.staffCode)
          commit('SET_ROUTERS', routers)
          resolve(res)
        }).catch(e => reject(e))
      })
    },

    // 退出登录
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        /* console.log(logout)
        commit('SET_USER_ID', '')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_STAFF_CODE', '')
        Cookies.remove('userId')
        Cookies.remove('accessToken')
        Cookies.remove('staffCode')
        Cookies.remove('roles')
        resolve('success') */
        logout().then(response => {
          commit('SET_USER_ID', '')
          commit('SET_USER_NAME', '')
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_STAFF_CODE', '')
          commit('SET_ROUTERS', [])
          Cookies.remove('userId')
          Cookies.remove('userName')
          Cookies.remove('accessToken')
          Cookies.remove('staffCode')
          Cookies.remove('roles')
          Cookies.remove('routers')
          resolve('success')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
