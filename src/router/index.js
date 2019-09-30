import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import constRoutes from './constRouteMap'
import { hasPermission } from 'util'

Vue.use(VueRouter)

// 路由白名单
const whiteList = ['/rule/login']
const router = new VueRouter({
  mode: 'hash',
  routes: constRoutes
})

const baseUrl = '/rule'

// 对全局路由做拦截，跳转之前校验权限
router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 判断是否有token
    if (to.path === baseUrl + '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.addRoutes.length === 0) { // 判断当前用户是否完成了路由的判断
        const datas = {}
        datas['roles'] = store.getters.roles
        datas['routers'] = store.getters.routers
        store.dispatch('permission/generateRoutes', datas).then(() => { // 生成可访问的路由表
          router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
          if (store.getters.addRoutes.length === 0) {
            next()
          }
          next({path: to.path}) // hack方法 确保addRoutes已完成
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, store.getters.routers, to.meta.role)) {
          next()
        } else {
          next({ path: '/401', query: { noGoBack: true } })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({path: baseUrl + '/login'}) // 否则全部重定向到登录页
    }
  }
})

export default router
