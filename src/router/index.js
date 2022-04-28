import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [

    {
      path:'/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('../components/downloadpage/Index'),
      meta: {title: '作业系统'}
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',//表示重定向
    },
    {
      path: '/admin',//这个表示首页
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/admin/dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/table',
          component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
          meta: { title: '基础表格' }
        },
        {
          path: '/tabs',
          component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
          meta: { title: 'tab选项卡' }
        },
        {
          path: '/form',
          component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
          meta: { title: '基本表单' }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
          meta: { title: '403' }
        },
        {
          path: '/admin/course',
          component: () => import(/* webpackChunkName: "403" */ '../components/page/CourseManage.vue'),
          meta: { title: '课程管理' }
        },
        ,
        {
          path: '/admin/taskupload',
          component: () => import(/* webpackChunkName: "403" */ '../components/page/TaskUpload.vue'),
          meta: { title: '作业上传' }
        },
        {
          path: '/admin/tasktable',
          component: () => import(/* webpackChunkName: "403" */ '../components/page/TaskManage.vue'),
          meta: { title: '作业管理' }
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
