import constRouteMap from 'router/constRouteMap'
import asyncRouteMap from 'router/asyncRouteMap'
import { hasPermission } from 'util'

const permission = {
  namespaced: true,
  state: {
    routes: constRouteMap,
    addRoutes: []
  },
  mutations: {
    SET_ROUTERS: (state, routes) => {
      state.addRoutes = routes
      state.routes = constRouteMap.concat(routes)
    }
  },
  actions: {
    generateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRoutes = asyncRouteMap.filter(r => {
          if (roles.indexOf('A') >= 0) return true
          if (hasPermission(roles, r.meta.role)) {
            if (r.children && r.children.length > 0) {
              r.children = r.children.filter(child => {
                if (!child.meta) {
                  return true
                }
                hasPermission(roles, child.meta.role)
              })
            }
            return true
          }
          return false
        })
        commit('SET_ROUTERS', accessedRoutes)
        resolve()
      })
    }
  }
}

export default permission
