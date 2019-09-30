import fetch from 'api'

/**
 * 查询所有路由菜单
 * @param {} 相关参数
 */
export function getAllRouters () {
  return fetch({
    method: 'post',
    url: '/router/list'
  })
}

/**
 * 查询当前用户拥有的路由菜单
 * @param {} 相关参数
 */
export function getOwnedRouters (data) {
  return fetch({
    method: 'post',
    url: '/router/routerList',
    data: data
  })
}

/**
 * 查询当前用户拥有的路由菜单
 * @param {} 相关参数
 */
export function setRouters (param) {
  return fetch({
    method: 'post',
    url: '/router/setRouters',
    data: param
  })
}
