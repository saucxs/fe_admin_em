const Login = () => import('view/common/login')
const Layout = () => import('view/common/layout/Layout.vue')
const Home = () => import('view/common/home')

const vueRouter = '/rule'

export default [
  {
    path: vueRouter + '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: vueRouter + '/home',
    hidden: true,
    children: [{ path: vueRouter + '/home', component: Home, name: '首页' }]
  }
]
