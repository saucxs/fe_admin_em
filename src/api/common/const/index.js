import fetch from 'api'

/**
 * 查询静态变量值
 * @param {*} constType
 */
export function getConstConfig (data) {
  return fetch({
    method: 'post',
    url: '/const/getConstConfig',
    data: data
  })
}
