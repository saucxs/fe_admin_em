import fetch from 'api'

/**
 * 查询所有缓存
 * @param {}
 */
export function getCacheAll (data) {
  return fetch({
    method: 'post',
    url: '/redis/getCaches',
   data: data
  })
}

/**
 * 删除指定缓存
 * @param {}
 */
export function delKey (data) {
  return fetch({
    method: 'post',
    url: '/redis/del',
    data: data
  })
}
