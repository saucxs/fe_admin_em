import Layout from 'view/common/layout/Layout.vue'
const _import = require('./_import_' + process.env.NODE_ENV)

const vueRouter = '/rule'

export default [
  {
    path: vueRouter,
    component: Layout,
    redirect: vueRouter + '/workform/index',
    name: '隐藏菜单',
    icon: 'taskm',
    // meta: { role: ['A', 'P', 'B', 'M'] },
    meta: '10000',
    hidden: true,
    children: [

    ]
  },
  {
    path: vueRouter + '/author',
    component: Layout,
    redirect: vueRouter + '/author/index',
    name: '权限管理',
    icon: 'authority',
    // meta: { role: ['A', 'P', 'B', 'M'] },
    meta: '10010',
    children: [
      // {path: 'index', component: _import('author/index'), meta: '10011', name: '员工管理'},
      // {path: 'teamManager', component: _import('author/TeamManager'), meta: '10016', name: '组管理'},
      {path: 'staffInfo', component: _import('common/author/StaffInfo'), meta: '10020', name: '个人信息'}
      // {path: 'staffRel', component: _import('author/StaffTeamRel'), hidden: true, name: '组关系管理'},
      // {path: 'newRel', component: _import('author/NewRel'), hidden: true, meta: '10014', name: '组添加成员'},
      // {path: 'author', component: _import('author/AuthorManager'), hidden: true, name: '赋权管理'},
      // {path: 'modAuthor/:authorId', component: _import('author/ModAuthor'), hidden: true, name: '权限修改'},

    ]
  }
]
