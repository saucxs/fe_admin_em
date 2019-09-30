import fetch from 'api'

/**
 * 获取总览信息
 * @param {}
 */
export function overview () {
  return fetch({
    method: 'post',
    url: '/req/requirements/overview'
  })
}
