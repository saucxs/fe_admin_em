export default {
  token: state => state.user.token,
  staffCode: state => state.user.staffCode,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  roles: state => state.user.roles,
  sidebar: state => state.app.sidebar,
  permission_routers: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  routers: state => state.user.routers,
  systemName: state => state.common.systemName
}
