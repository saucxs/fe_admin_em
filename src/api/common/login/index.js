import fetch from 'api'

/**
 * 登陆
 * @param {}
 */
export function login (params) {
  return fetch({
    method: 'get',
    url: '/authority/login',
    params: params
  })
}

/**
 * 登出
 * @param {}
 */
export function logout (params) {
  return fetch({
    method: 'get',
    url: '/authority/logout',
    params: params
  })
}
