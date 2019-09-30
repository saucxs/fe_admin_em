/**
 * 权限判断，用户权限为admin，则不判断路由权限。若路由记录无权限配置，则默认为有权限
 * @param {*} roles 用户权限
 * @param {*} permissionRoles 路由权限
 */
// export function hasPermission (roles, permissionRoles) {
//   if (roles.indexOf('A') >= 0) return true
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

/**
 * 权限判断，用户权限为admin，则不判断路由权限。若路由记录无权限配置，则默认为有权限
 * @param {*} roles 用户权限
 * @param {*} routers 路由菜单
 * @param {*} permissionRoles 路由权限
 */
export function hasPermission (roles, routers, permissionRoles) {
  if (roles.indexOf('A') >= 0) return true
  if (!permissionRoles) return true
  return routers.some(router => permissionRoles === router)
}

export function formatDateTime (dateTime) {
  if (!dateTime) return ''
  let year = dateTime.getFullYear()
  let month = dateTime.getMonth() > 8 ? dateTime.getMonth() + 1 : `0${dateTime.getMonth() + 1}`
  let date = dateTime.getDate() > 9 ? dateTime.getDate() : `0${dateTime.getDate()}`
  let hour = dateTime.getHours() > 9 ? dateTime.getHours() : `0${dateTime.getHours()}`
  let minute = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : `0${dateTime.getMinutes()}`
  let second = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : `0${dateTime.getSeconds()}`

  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

export function formatDate (date, fmt) {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1,
        (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
