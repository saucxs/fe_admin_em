import fetch from 'api'

/**
 * 查找个人信息 根据userId
 * @param {}
 * author saucxs
 */
export function queryUserInfo (params) {
  return fetch({
    method: 'get',
    url: '/aiuser/select',
    params: params
  })
}

/**
 * 更新个人信息
 * @param {}
 * author saucxs
 */
export function updateUserInfo (params) {
  return fetch({
    method: 'post',
    url: '/aiuser/update',
    data: params
  })
}

/**
 * 修改密码
 * @param {}
 * author saucxs
 */
export function changePwd (params) {
  return fetch({
    method: 'get',
    url: '/authority/changePwd',
    params: params
  })
}

/**
 * 查询所有的用户
 * @param {}
 * author saucxs
 */
export function userSelectAll (params) {
  return fetch({
    method: 'get',
    url: '/aiuser/selectAll',
    params: params
  })
}

/**
 * 查询所有的用户,根据条件查询
 * @param {}
 * author saucxs
 */
export function userSelectByCondition (params) {
  return fetch({
    method: 'get',
    url: '/aiuser/selectByCondition',
    params: params
  })
}

/**
 * 查询所有角色，无分页
 * @param {}
 * author saucxs
 */
export function getAllRole (params) {
  return fetch({
    method: 'get',
    url: '/airole/selectByCondition',
    params: params
  })
}

/**
 * 添加用户
 * @param {}
 * author saucxs
 */
export function insertUser (data) {
  return fetch({
    method: 'post',
    url: '/aiuser/insert',
    data: data
  })
}

/**
 * 修改权限 根据用户id
 * @param {}
 * author saucxs
 */
export function updateUser (data) {
  return fetch({
    method: 'post',
    url: '/aiuser/update',
    data: data
  })
}

/**
 * 重置密码
 * @param {}
 * author saucxs
 */
export function resetPwd (params) {
  return fetch({
    method: 'get',
    url: '/authority/resetPwd',
    params: params
  })
}

/**
 * 删除用户
 * @param {}
 * author saucxs
 */
export function deleteUser (params) {
  return fetch({
    method: 'get',
    url: '/aiuser/delete',
    params: params
  })
}

/**
 * 查询所有团队
 * @param {} 工单相关参数
 */
export function getAllTeam () {
  return fetch({
    method: 'post',
    url: '/author/getAllTeam'
  })
}
