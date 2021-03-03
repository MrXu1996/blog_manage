import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Register from '../views/Register'
import Login from '../views/Login'
import NotFound from '../views/404'

import Welcome from '../components/Welcome'
import Users from '../components/user/Users'
import Articles from '../components/article/Articles'
import Edit from '../components/article/Edit'
import Category from '../components/article/Category'
import Admin from '../components/Admin'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    }, {
      path: '/users',
      component: Users
    }, {
      path: '/articles',
      component: Articles
    }, {
      path: '/articles/edit',
      name: 'Edit',
      component: Edit
    }, {
      path: '/category',
      component: Category
    }, {
      path: '/admin',
      component: Admin
    }]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: '/404',
    component: NotFound
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const isLogin = window.sessionStorage.getItem('eleToken')
  if (!isLogin) return next('/login')
  next()
})

export default router